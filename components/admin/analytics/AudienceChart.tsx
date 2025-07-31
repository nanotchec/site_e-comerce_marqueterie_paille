'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type AudienceChartProps = {
  data: { name: string; Visiteurs: number }[];
};

export default function AudienceChart({ data }: AudienceChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow h-full">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution de l'audience</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="Visiteurs" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
} 