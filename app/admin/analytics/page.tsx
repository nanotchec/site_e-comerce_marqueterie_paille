import AnalyticsDashboard from '@/components/admin/analytics/AnalyticsDashboard';

export const metadata = {
  title: 'Statistiques - Administration',
};

export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Statistiques</h1>
      <AnalyticsDashboard />
    </div>
  );
} 