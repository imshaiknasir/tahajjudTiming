// Storage keys
const CITY_STORAGE_KEY = 'tahajjud-selected-city';

// Check if we're running on the client side
const isClient = typeof window !== 'undefined';

// Function to safely access localStorage
const getLocalStorage = () => {
  if (isClient) {
    return window.localStorage;
  }
  return null;
};

// Function to save selected city to localStorage
export const saveSelectedCity = (cityId: string): void => {
  const localStorage = getLocalStorage();
  if (localStorage) {
    localStorage.setItem(CITY_STORAGE_KEY, cityId);
  }
};

// Function to get selected city from localStorage
export const getSelectedCity = (): string | null => {
  const localStorage = getLocalStorage();
  if (localStorage) {
    return localStorage.getItem(CITY_STORAGE_KEY);
  }
  return null;
};

// Function to clear selected city from localStorage
export const clearSelectedCity = (): void => {
  const localStorage = getLocalStorage();
  if (localStorage) {
    localStorage.removeItem(CITY_STORAGE_KEY);
  }
}; 