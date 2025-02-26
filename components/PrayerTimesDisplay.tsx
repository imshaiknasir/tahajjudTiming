'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PrayerTimes } from '@/lib/types';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

interface PrayerTimesDisplayProps {
  prayerTimes: PrayerTimes | null;
  isLoading: boolean;
  cityName: string | null;
}

export function PrayerTimesDisplay({ prayerTimes, isLoading, cityName }: PrayerTimesDisplayProps) {
  // Use state to handle client-side date formatting
  const [formattedDate, setFormattedDate] = useState<string>('');
  
  // Format the date on the client side only
  useEffect(() => {
    setFormattedDate(format(new Date(), 'EEEE, MMMM d, yyyy'));
  }, []);

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto mt-6 border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-primary">Loading Prayer Times</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-t-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  if (!prayerTimes) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-6 overflow-hidden border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 pointer-events-none" />
      
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 text-crisp">
          Tahajjud Time
        </CardTitle>
        {formattedDate && (
          <p className="text-center text-muted-foreground font-medium mt-1 text-crisp">
            {formattedDate}
          </p>
        )}
        {cityName && (
          <p className="text-center font-semibold text-lg mt-1 text-foreground/90 text-crisp">
            {cityName}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="relative z-10 pt-2">
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/10 shadow-sm">
            <h3 className="text-lg font-semibold text-center mb-4 text-primary text-crisp">Tahajjud Time</h3>
            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-1 text-crisp">Starts</p>
                <p className="text-2xl font-bold text-foreground text-crisp">{prayerTimes.tahajjudStart}</p>
              </div>
              <div className="h-10 w-px bg-gradient-to-b from-transparent via-border to-transparent mx-2"></div>
              <div className="text-center flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-1 text-crisp">Ends</p>
                <p className="text-2xl font-bold text-foreground text-crisp">{prayerTimes.tahajjudEnd}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-secondary/30 to-secondary/10 p-4 rounded-xl border border-secondary/20 shadow-sm">
              <div className="flex items-center justify-center mb-1">
                <MoonIcon className="h-4 w-4 text-primary/70 mr-1" />
                <p className="text-sm font-medium text-primary/70 text-crisp">Maghrib</p>
              </div>
              <p className="text-xl font-semibold text-center text-crisp">{prayerTimes.maghrib}</p>
            </div>
            <div className="bg-gradient-to-br from-secondary/30 to-secondary/10 p-4 rounded-xl border border-secondary/20 shadow-sm">
              <div className="flex items-center justify-center mb-1">
                <SunriseIcon className="h-4 w-4 text-primary/70 mr-1" />
                <p className="text-sm font-medium text-primary/70 text-crisp">Fajr</p>
              </div>
              <p className="text-xl font-semibold text-center text-crisp">{prayerTimes.fajr}</p>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground text-center mt-4 bg-secondary/20 p-3 rounded-lg border border-secondary/10">
            <p className="italic text-crisp">
              The best time for Tahajjud prayer is during the last third of the night.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
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
    </svg>
  );
}

function SunriseIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 2v8" />
      <path d="m4.93 10.93 1.41 1.41" />
      <path d="M2 18h2" />
      <path d="M20 18h2" />
      <path d="m19.07 10.93-1.41 1.41" />
      <path d="M22 22H2" />
      <path d="m8 6 4-4 4 4" />
      <path d="M16 18a4 4 0 0 0-8 0" />
    </svg>
  );
} 