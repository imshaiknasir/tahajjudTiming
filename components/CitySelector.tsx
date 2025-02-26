'use client';

import { useState, useEffect } from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { indianCities } from '@/lib/cities';
import { saveSelectedCity, getSelectedCity } from '@/lib/storage';

interface CitySelectorProps {
  onCitySelect: (cityId: string) => void;
}

export function CitySelector({ onCitySelect }: CitySelectorProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    // Set mounted state to true after component mounts
    setIsMounted(true);
    
    // Load saved city from localStorage on component mount
    const savedCity = getSelectedCity();
    if (savedCity) {
      setSelectedCity(savedCity);
      onCitySelect(savedCity);
    }
  }, [onCitySelect]);

  const handleCityChange = (cityId: string) => {
    setSelectedCity(cityId);
    saveSelectedCity(cityId);
    onCitySelect(cityId);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 pointer-events-none" />
      
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-center text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 text-crisp">
          Select Your City
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-10 pt-2">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-md blur opacity-75"></div>
            <Select 
              value={selectedCity || ''} 
              onValueChange={handleCityChange}
              disabled={!isMounted}
            >
              <SelectTrigger className="relative bg-background border-primary/20 h-11 text-foreground/90 font-medium text-crisp">
                <SelectValue placeholder="Select a city in India" />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-sm border-primary/20">
                <div className="max-h-[300px] overflow-y-auto">
                  {indianCities.map((city) => (
                    <SelectItem 
                      key={city.id} 
                      value={city.id}
                      className="focus:bg-primary/10 focus:text-foreground text-crisp"
                    >
                      {city.name}, {city.state}
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-center text-xs text-muted-foreground text-crisp">
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
              className="h-3 w-3 mr-1"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>Choose your location for accurate prayer times</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 