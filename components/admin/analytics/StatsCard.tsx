import React from 'react';

type StatsCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  changeType: 'increase' | 'decrease';
};

export default function StatsCard({ title, value, icon, change, changeType }: StatsCardProps) {
  const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="bg-gray-100 rounded-full p-2">
            {icon}
        </div>
      </div>
      <p className={`text-sm mt-2 ${changeColor}`}>
        {change} vs période précédente
      </p>
    </div>
  );
} 