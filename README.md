# Tahajjud Prayer Time Calculator

A web application that calculates the optimal time for Tahajjud prayer based on user location in India.

## Features

- **Location Selection**: Choose your city from a list of major Indian cities
- **Automatic Calculation**: Automatically calculates Tahajjud prayer time based on the last third of the night
- **Persistent Settings**: Remembers your selected city using browser storage
- **Real-time Updates**: Refresh button to update prayer times for the current date
- **Responsive Design**: Works on mobile, tablet, and desktop devices

## How It Works

The application calculates Tahajjud prayer time using the following logic:

1. Fetches Maghrib (sunset) and Fajr (dawn) prayer times for the selected location
2. Calculates the total night duration between Maghrib and Fajr
3. Divides the night into thirds
4. Identifies the last third of the night as the optimal time for Tahajjud prayer

## Technologies Used

- **Next.js**: React framework for building the application
- **TypeScript**: For type-safe code
- **Tailwind CSS**: For styling
- **shadcn/ui**: For UI components
- **date-fns**: For date manipulation
- **Aladhan API**: For fetching accurate prayer times

## Getting Started

### Prerequisites

- Node.js 18.17 or later

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/tahajjud-timing.git
cd tahajjud-timing
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This application can be easily deployed to Vercel:

```bash
npm install -g vercel
vercel
```

## License

MIT
