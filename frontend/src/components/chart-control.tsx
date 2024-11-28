'use client'
import dayjs, { Dayjs } from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);
import { useState } from 'react';

interface ChartControlProps {
  onDateChange: (from: Dayjs, to: Dayjs) => void;
};

export const ChartControl = () => {
  const [currentDay, setCurrentDay] = useState(dayjs().startOf('week'));

  const handleForwardClicked = async () => {
    setCurrentDay(currentDay.add(7, 'day'));
  };

  const handleBackwardClicked = () => {
    setCurrentDay(currentDay.subtract(7, 'day'));
  };

  return (
    <div className="gradiant-color font-bold text-lg w-full">




    </div>
  );
};
