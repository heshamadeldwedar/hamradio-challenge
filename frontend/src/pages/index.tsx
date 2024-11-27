import { LineChart } from '../components/line-chart';
import { Dayjs } from 'dayjs';

export default async function HomePage() {
  const style = {
    backgroundColor: '#000030',
  };


  return (
    <div style={style} className="w-2/3">

      <div className="flex pt-10 pb-10 pl-5 pr-5 border-b border-gray-400">
        <h1 className="text-4xl font-bold tracking-tight">Number of Contacts Per Day</h1>
      </div>

      <div className="w-full">
        <LineChart callback={getData} data={data} />

      </div>

    </div>
  );
}


const getData = async (from: Dayjs, to: Dayjs) => {
  const response = await fetch(`backend?from=${from.toISOString()}&to=${to.toISOString()}`, {
    method: 'GET',
  });
  console.log('the value of ', response);
  return response.json();

};


export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
