import dayjs, { Dayjs } from 'dayjs';

import { WeeklyLogCountChart } from '../components/weekly-log-count-chart';
import { ChartControl } from '../components/chart-control';

export default async function HomePage() {
  const style = {
    backgroundColor: '#000030',
  };


  return (
    <div style={style} className="w-2/3">

      <div className="flex pt-10 pb-10 pl-5 pr-5 border-b border-gray-400">
        <h1 className="text-4xl font-bold tracking-tight">Number of Contacts Per Day</h1>
      </div>

      <div className="w-full flex flex-wrap p-5">
        <WeeklyLogCountChart />
      </div>

    </div>
  );
}




export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
