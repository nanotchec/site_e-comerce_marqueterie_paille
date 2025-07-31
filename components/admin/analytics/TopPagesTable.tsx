import React from 'react';

type TopPagesTableProps = {
  data: { path: string; views: string }[];
};

export default function TopPagesTable({ data }: TopPagesTableProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Pages les plus vues</h3>
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500">
            <th className="pb-2 font-normal">Page</th>
            <th className="pb-2 font-normal text-right">Vues</th>
          </tr>
        </thead>
        <tbody>
          {data.map((page, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="py-2 text-sm text-gray-800 truncate" title={page.path}>{page.path}</td>
              <td className="py-2 text-sm text-gray-800 font-medium text-right">{page.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 