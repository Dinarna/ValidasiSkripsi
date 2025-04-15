import React from 'react'


import { ReactNode } from 'react';

interface StatisticCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
}

const StatisticsCard:React.FC<StatisticCardProps> = ({title, value, icon}) => {
  return (
    <div className="grow shrink basis-0 p-6 bg-white rounded-lg shadow border border-zinc-100 flex-col justify-start items-start gap-4 flex cursor-pointer hover:scale-105 hover:shadow-md hover:transition-all">
      <div className="self-stretch justify-start items-start gap-2 inline-flex">
        <h4 className="grow shrink basis-1 text-zinc-500  font-bold leading-[23px]">{title}</h4>      
        {icon}
      </div>
      <div className="self-stretch justify-start items-end inline-flex">
        <div className="justify-start items-end gap-2 flex">
          <p className="font-primary text-4xl font-bold leading-[46px]">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default StatisticsCard