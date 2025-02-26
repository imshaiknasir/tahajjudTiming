'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CitySelector } from '@/components/CitySelector';
import { PrayerTimesDisplay } from '@/components/PrayerTimesDisplay';
import { fetchPrayerTimes } from '@/lib/prayer-utils';
import { indianCities } from '@/lib/cities';
import { PrayerTimes } from '@/lib/types';

export default function Home() {
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const selectedCity = selectedCityId 
    ? indianCities.find(city => city.id === selectedCityId) 
    : null;

  const fetchTimes = async () => {
    if (!selectedCity) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const times = await fetchPrayerTimes(selectedCity.latitude, selectedCity.longitude);
      setPrayerTimes(times);
    } catch (err) {
      setError('Failed to fetch prayer times. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCity && isMounted) {
      fetchTimes();
    }
  }, [selectedCity, isMounted]);

  const handleCitySelect = (cityId: string) => {
    setSelectedCityId(cityId);
  };

  const handleRefresh = () => {
    fetchTimes();
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/90">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 px-6 border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MoonStarIcon className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 text-crisp">
              Tahajjud Time
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-muted-foreground hover:text-foreground text-crisp"
              onClick={() => {
                document.documentElement.classList.toggle('dark');
              }}
            >
              <SunMoonIcon className="h-4 w-4 mr-1" />
              Theme
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 bg-gradient-to-b from-background to-background/90 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-primary/10 rounded-full animate-float opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-primary/10 rounded-full animate-float opacity-20" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="w-full max-w-md mx-auto z-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 text-crisp">
              Tahajjud Prayer Time
            </h1>
            {selectedCityId && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleRefresh}
                disabled={isLoading}
                className="rounded-full hover:bg-primary/10"
              >
                <RefreshIcon className="h-5 w-5" />
                <span className="sr-only">Refresh</span>
              </Button>
            )}
          </div>
          
          <CitySelector onCitySelect={handleCitySelect} />
          
          {error && (
            <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 shadow-sm text-center">
              <div className="flex items-center justify-center">
                <AlertIcon className="h-4 w-4 mr-2" />
                <p>{error}</p>
              </div>
            </div>
          )}
          
          <PrayerTimesDisplay 
            prayerTimes={prayerTimes} 
            isLoading={isLoading} 
            cityName={selectedCity?.name || null}
          />
          
          <div className="mt-8 text-center text-sm text-muted-foreground bg-secondary/10 p-4 rounded-lg border border-secondary/20 shadow-sm">
            <p className="leading-relaxed text-crisp">
              Tahajjud prayer is a voluntary night prayer performed after Isha prayer and before Fajr.
              The most virtuous time for Tahajjud is during the last third of the night.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="py-4 px-6 border-t border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <MoonStarIcon className="h-5 w-5 text-primary/70" />
              <span className="text-sm font-medium text-foreground/70 text-crisp">Tahajjud Time Calculator</span>
            </div>
            <div className="text-xs text-muted-foreground text-crisp">
              Prayer times are calculated based on geographical coordinates and may vary slightly.
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm font-bold text-crisp">
              Made with <span className="text-red-500">❤️</span> by Nasir
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function RefreshIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function MoonStarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      <path d="M19 3v4" />
      <path d="M21 5h-4" />
    </svg>
  );
}

function SunMoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 8a2 2 0 1 0 4 0 4 4 0 0 1-4 0" />
      <path d="M12 16a2 2 0 1 1-4 0 4 4 0 0 0 4 0" />
    </svg>
  );
}
