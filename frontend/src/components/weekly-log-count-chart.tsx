'use client';

import dayjs, { Dayjs } from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);
import { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from 'recharts';


interface DataPoint {
  date: string;
  count: number;
}

export const WeeklyLogCountChart = () => {

  const [data, setData] = useState<Array<DataPoint>>([]);
  const [currentDay, setCurrentDay] = useState(dayjs().startOf('week'));

  const handleForwardClicked = async () => {
    setCurrentDay(currentDay.add(7, 'day'));
  };

  const handleBackwardClicked = () => {
    setCurrentDay(currentDay.subtract(7, 'day'));
  };

  useEffect(() => {
    getData(dayjs().startOf('week'), dayjs().endOf('week')).then(setData);
  }, []);

  useEffect(() => {
    getData(currentDay.startOf('week'), currentDay.endOf('week')).then(setData);
  }, [currentDay]);



  return (
    <div className="w-full flex flex-wrap p-5">
      <div className="w-full flex justify-end align-top">
        <span className="text-white">{ currentDay.format('MMMM') }</span>
      </div>
      <div className="flex flex-wrap gap-5 w-full justify-center mb-5">
        <button 
          onClick={handleBackwardClicked}>
          <img src="/images/back_button_chart.svg" alt="left" />
        </button>
        Week { currentDay.week() }
        <button>
          <img 
            onClick={handleForwardClicked}
            src="/images/forward_button_chart.svg" alt="left" />
        </button>
      </div>
      {data.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <Line type="linear" dataKey="count" stroke="#17F9DA" strokeWidth={5} />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

async function getData(from: Dayjs, to: Dayjs) {
  try {
    const response = await fetch(`http://localhost/api/log-book-contacts/count-per-day?from=${from.toISOString()}&to=${to.toISOString()}`, {
      method: 'GET',
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
};
