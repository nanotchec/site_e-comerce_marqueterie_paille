'use client';

import { useState, useEffect } from 'react';

interface Settings {
  siteTitle: string;
  ogImageUrl: string;
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<Settings>({ siteTitle: '', ogImageUrl: '' });
    const [robotsTxt, setRobotsTxt] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSavingSettings, setIsSavingSettings] = useState(false);
    const [isSavingRobots, setIsSavingRobots] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('/api/admin/settings');
                if (!response.ok) throw new Error('Failed to fetch settings');
                const data = await response.json();
                setSettings({ siteTitle: data.siteTitle, ogImageUrl: data.ogImageUrl });
                setRobotsTxt(data.robotsTxt);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);
    
    const handleSettingsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingSettings(true);
        try {
            await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });
            // Optionally show a success message
        } catch (error) {
            console.error('Failed to save settings', error);
        } finally {
            setIsSavingSettings(false);
        }
    };

    const handleRobotsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingRobots(true);
        try {
             await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ robotsTxt }),
            });
            // Optionally show a success message
        } catch (error) {
            console.error('Failed to save robots.txt', error);
        } finally {
            setIsSavingRobots(false);
        }
    };
    
    if (loading) {
        return <p>Chargement...</p>;
    }

  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Paramètres Généraux</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Modifiez le titre principal du site et l'image par défaut pour le partage sur les réseaux sociaux.
          </p>
        </div>

        <form onSubmit={handleSettingsSubmit} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="site-title" className="block text-sm font-medium leading-6 text-gray-900">
                  Titre du site
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="site-title"
                    id="site-title"
                    value={settings.siteTitle}
                    onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="og-image-url" className="block text-sm font-medium leading-6 text-gray-900">
                  URL de l'image Open Graph (OG)
                </label>
                 <div className="mt-2">
                  <input
                    type="text"
                    name="og-image-url"
                    id="og-image-url"
                    value={settings.ogImageUrl}
                    onChange={(e) => setSettings({ ...settings, ogImageUrl: e.target.value })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    placeholder="/images/og-default.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button
              type="submit"
              disabled={isSavingSettings}
              className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 disabled:bg-primary-300"
            >
              {isSavingSettings ? 'Enregistrement...' : 'Enregistrer les paramètres'}
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Robots.txt</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Modifiez le contenu du fichier `robots.txt` pour contrôler l'indexation par les moteurs de recherche.
          </p>
        </div>

        <form onSubmit={handleRobotsSubmit} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
             <textarea
                rows={10}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 font-mono"
                value={robotsTxt}
                onChange={(e) => setRobotsTxt(e.target.value)}
             />
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button
              type="submit"
              disabled={isSavingRobots}
              className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 disabled:bg-primary-300"
            >
               {isSavingRobots ? 'Enregistrement...' : 'Enregistrer robots.txt'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 