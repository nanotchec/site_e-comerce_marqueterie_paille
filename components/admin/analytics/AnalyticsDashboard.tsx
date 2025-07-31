'use client';

import React from 'react';
import StatsCard from './StatsCard';
import AudienceChart from './AudienceChart';
import TopPagesTable from './TopPagesTable';
import { Users, Eye, FileText, TrendingUp } from 'lucide-react';

// Données d'exemple
const mockStats = {
  totalUsers: '1,254',
  newUsers: '987',
  pageviews: '10,432',
  avgSessionDuration: '2m 15s',
};

const mockChartData = [
  { name: '01/07', Visiteurs: 120 },
  { name: '02/07', Visiteurs: 150 },
  { name: '03/07', Visiteurs: 130 },
  { name: '04/07', Visiteurs: 180 },
  { name: '05/07', Visiteurs: 210 },
  { name: '06/07', Visiteurs: 190 },
  { name: '07/07', Visiteurs: 250 },
];

const mockTopPages = [
  { path: '/', views: '3,456' },
  { path: '/boutique/tableaux', views: '1,234' },
  { path: '/realisations', views: '987' },
  { path: '/contact', views: '456' },
  { path: '/boutique/tableaux/le-port', views: '234' },
];

export default function AnalyticsDashboard() {
  // Plus tard, nous remplacerons ces données par un appel à l'API de Google Analytics.
  const loading = false;
  const error = null;

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  if (error) {
    return <div className="text-red-500">Erreur: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Visiteurs uniques"
          value={mockStats.totalUsers}
          icon={<Users className="w-6 h-6 text-gray-400" />}
          change="+5.2%"
          changeType="increase"
        />
        <StatsCard
          title="Pages vues"
          value={mockStats.pageviews}
          icon={<Eye className="w-6 h-6 text-gray-400" />}
          change="-1.8%"
          changeType="decrease"
        />
        <StatsCard
          title="Nouveaux visiteurs"
          value={mockStats.newUsers}
          icon={<TrendingUp className="w-6 h-6 text-gray-400" />}
          change="+12%"
          changeType="increase"
        />
        <StatsCard
          title="Durée moy. session"
          value={mockStats.avgSessionDuration}
          icon={<FileText className="w-6 h-6 text-gray-400" />}
          change="+2.3%"
          changeType="increase"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AudienceChart data={mockChartData} />
        </div>
        <div>
          <TopPagesTable data={mockTopPages} />
        </div>
      </div>
    </div>
  );
} 