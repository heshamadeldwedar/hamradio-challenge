'use client';

import dayjs, { Dayjs } from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);
import { useState } from 'react';


interface LineChartProps {
  callback: Function;
}

export const LineChart = (props: LineChartProps) => {

  const [currentDay, setCurrentDay] = useState(dayjs().startOf('week'));

  const handleForwardClicked = () => {
    setCurrentDay(currentDay.add(7, 'day'));
    props.callback(currentDay, currentDay.add(7, 'day'));
  };

  const handleBackwardClicked = () => {
    setCurrentDay(currentDay.subtract(7, 'day'));
    props.callback(currentDay, currentDay.add(7, 'day'));
  };


  return (
      <div className="w-100 flex p-5 w-full">

        <div className="gradiant-color font-bold text-lg w-full">

          <div className="flex gap-5 w-full justify-center">
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

        </div>


      </div>
  );
};