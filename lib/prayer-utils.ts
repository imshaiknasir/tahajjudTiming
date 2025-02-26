import axios from 'axios';
import { format, subMinutes } from 'date-fns';
import { ApiResponse, PrayerTimes } from './types';

// Function to convert time string (HH:MM) to Date object
export const timeStringToDate = (timeStr: string, baseDate: Date = new Date()): Date => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

// Function to format Date object to time string (HH:MM)
export const formatTimeString = (date: Date): string => {
  // Use a format that doesn't depend on locale
  return format(date, 'h:mm a');
};

// Calculate the last third of the night
export const calculateTahajjudTime = (fajrTime: string, maghribTime: string): { start: string; end: string } => {
  const today = new Date();
  const fajrDate = timeStringToDate(fajrTime, today);
  let maghribDate = timeStringToDate(maghribTime, today);
  
  // If maghrib is after fajr on the same day, it means maghrib is from previous day
  if (maghribDate > fajrDate) {
    maghribDate = new Date(maghribDate.getTime() - 24 * 60 * 60 * 1000);
  }
  
  // Calculate total night duration in minutes
  const nightDurationMs = fajrDate.getTime() - maghribDate.getTime();
  const nightDurationMinutes = nightDurationMs / (1000 * 60);
  
  // Calculate one-third of the night in minutes
  const oneThirdNightMinutes = nightDurationMinutes / 3;
  
  // Calculate the start of the last third of the night
  const tahajjudStartDate = subMinutes(fajrDate, oneThirdNightMinutes);
  
  return {
    start: formatTimeString(tahajjudStartDate),
    end: formatTimeString(fajrDate)
  };
};

// Fetch prayer times from API
export const fetchPrayerTimes = async (latitude: number, longitude: number): Promise<PrayerTimes> => {
  try {
    // Use a consistent date format for the API request
    const today = new Date();
    const formattedDate = format(today, 'dd-MM-yyyy');
    
    const url = `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${latitude}&longitude=${longitude}&method=2`;
    
    const response = await axios.get<ApiResponse>(url);
    
    const fajrTime = response.data.data.timings.Fajr;
    const maghribTime = response.data.data.timings.Maghrib;
    
    const tahajjudTimes = calculateTahajjudTime(fajrTime, maghribTime);
    
    return {
      fajr: formatTimeString(timeStringToDate(fajrTime)),
      maghrib: formatTimeString(timeStringToDate(maghribTime)),
      tahajjudStart: tahajjudTimes.start,
      tahajjudEnd: tahajjudTimes.end
    };
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    throw new Error('Failed to fetch prayer times');
  }
}; 