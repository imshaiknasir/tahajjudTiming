export interface City {
  id: string;
  name: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface PrayerTimes {
  fajr: string;
  maghrib: string;
  tahajjudStart: string;
  tahajjudEnd: string;
}

export interface ApiResponse {
  code: number;
  status: string;
  data: {
    timings: {
      Fajr: string;
      Maghrib: string;
      [key: string]: string;
    };
    date: {
      readable: string;
      timestamp: string;
      gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
        };
        month: {
          number: number;
          en: string;
        };
        year: string;
      };
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
          ar: string;
        };
        month: {
          number: number;
          en: string;
          ar: string;
        };
        year: string;
      };
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: {
        id: number;
        name: string;
        params: {
          Fajr: number;
          Isha: number;
        };
        location: {
          latitude: number;
          longitude: number;
        };
      };
      latitudeAdjustmentMethod: string;
      midnightMode: string;
      school: string;
      offset: {
        [key: string]: number;
      };
    };
  };
} 