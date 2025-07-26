# 🕌 Madrasa - Islamic Prayer Times App

A modern, responsive web application that helps Muslims track daily prayer times with beautiful UI and real-time location-based calculations.

![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss)

## ✨ Features

### 🕰️ Prayer Time Management

- **Real-time Prayer Times**: Display accurate prayer times for all 5 daily prayers (Fajr, Dhuhr, Asr, Maghrib, Isha)
- **Location-based Calculations**: Automatic prayer time calculation based on user's geographic location
- **Current Prayer Indicator**: Highlights the current active prayer with time remaining until next prayer
- **Prayer Progress Visualization**: Beautiful animated arc showing daily prayer progress

### Smart Location Detection

- **GPS Location**: Automatic location detection using browser geolocation API
- **IP-based Fallback**: Falls back to IP-based location when GPS is unavailable
- **Location Caching**: Persistent storage of user location preferences
- **Privacy-focused**: Location data stored locally on device

### Modern UI/UX

- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Dynamic Theming**: Color gradients that change based on current prayer time
- **Prayer-specific Icons**: Beautiful phosphor icons for each prayer
- **Accessibility First**: Screen reader support and proper ARIA labels
- **Loading States**: Smooth skeleton loading animations

### Performance & Reliability

- **State Management**: Efficient state management with Zustand
- **Data Caching**: Smart caching to minimize API calls
- **Error Handling**: Graceful error handling with user-friendly messages

## 🛠️ Tech Stack

### Frontend Framework

- **[Next.js 15.4.4](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety

### Styling & UI

- **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Phosphor Icons](https://phosphoricons.com/)** - Prayer-specific iconography
- **[Motion](https://motion.dev/)** - Smooth animations

### State Management & Data

- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[TanStack Query](https://tanstack.com/query/latest)** - Server state management
- **[Axios](https://axios-http.com/)** - HTTP client
- **[date-fns](https://date-fns.org/)** - Date manipulation

### Code Quality & Development

- **[Biome](https://biomejs.dev/)** - Fast linter and formatter
- **[Ultracite](https://github.com/daisukelab/ultracite)** - Advanced code quality enforcement
- **[Lint-staged](https://github.com/okonet/lint-staged)** - Pre-commit linting

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **pnpm** (recommended) or npm/yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/aumirza/madrasa.git
   cd madrasa
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run linter

## 📱 Features in Detail

### Prayer Time Display

The app displays all five daily prayers with:

- Current prayer highlighted with distinctive styling
- Time remaining until next prayer
- Beautiful prayer-specific gradients and icons
- 12-hour time format for better readability

### Location Services

- **Primary**: Browser geolocation API for precise coordinates
- **Fallback**: IP-based location via ipapi.co service
- **Caching**: Location stored in localStorage for faster subsequent loads
- **Privacy**: No server-side location storage

### Prayer Calculations

- Uses [Aladhan API](https://aladhan.com/prayer-times-api) for accurate calculations
- Supports multiple calculation methods
- Automatic timezone detection
- Handles edge cases like midnight transitions

### Responsive Design

- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interface
- PWA capabilities for app-like experience

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── PrayerCard.tsx    # Main prayer display
│   ├── PrayerTimeItem.tsx # Individual prayer item
│   ├── ProgressArc.tsx   # Prayer progress visualization
│   └── ...
├── hooks/                # Custom React hooks
│   ├── usePrayerTime.tsx # Prayer time logic
│   ├── useLocation.tsx   # Location detection
│   └── ...
├── lib/                  # Utility libraries
│   ├── api.ts           # API endpoints
│   ├── axios.ts         # HTTP client setup
│   └── utils.ts         # Helper functions
├── store/                # Zustand stores
│   ├── PrayerTimeStore.ts # Prayer data state
│   └── UserLocationStore.ts # Location state
├── types/                # TypeScript definitions
├── utils/                # Utility functions
│   ├── prayer.ts        # Prayer calculations
│   └── time.ts          # Time formatting
└── constants/            # App constants
    ├── api.ts           # API configuration
    └── prayer.ts        # Prayer-related constants
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=<Your_mapbox_key>
```

### Customization

- **Prayer calculation methods**: Modify API parameters in `src/lib/api.ts`
- **UI themes**: Update gradients in `src/constants/prayer.ts`
- **Icons**: Replace icons in `src/constants/prayer.ts`

## 🌐 API Integration

The app uses the [Aladhan Prayer Times API](https://aladhan.com/prayer-times-api):

- **Endpoint**: `https://api.aladhan.com/v1/timings/{date}`
- **Parameters**: Latitude, longitude, timezone
- **Response**: Prayer times with metadata

Location detection uses [ipapi.co](https://ipapi.co/):

- **Endpoint**: `https://ipapi.co/json/`
- **Response**: IP-based geolocation data

## 🧪 Testing

The project follows strict code quality standards:

- **Type Safety**: Full TypeScript coverage
- **Linting**: Biome for fast, comprehensive linting
- **Formatting**: Automated code formatting
- **Accessibility**: ARIA labels and semantic HTML

## 📦 Deployment

### Production Build

```bash
pnpm build
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aumirza/madrasa)

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- Netlify
- Railway
- Docker
- Self-hosted

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Quality

- Follow the existing TypeScript patterns
- Use the provided linting configuration
- Ensure accessibility compliance
- Add proper error handling

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Aladhan API](https://aladhan.com/) for accurate prayer time calculations
- [Phosphor Icons](https://phosphoricons.com/) for beautiful Islamic iconography
- [ipapi.co](https://ipapi.co/) for IP-based location services

---

**Made with ❤️ by Ahmadullah Mirza**
