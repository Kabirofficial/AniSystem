import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Suspense, lazy } from 'react';
import { Skeleton } from './components/Skeleton';

// Lazy Load Pages
const Landing = lazy(() => import('./pages/Landing').then(module => ({ default: module.Landing })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const Search = lazy(() => import('./pages/Search').then(module => ({ default: module.Search })));
const CalendarPage = lazy(() => import('./pages/CalendarPage').then(module => ({ default: module.CalendarPage })));
const Support = lazy(() => import('./pages/Support').then(module => ({ default: module.Support })));
const Details = lazy(() => import('./pages/Details').then(module => ({ default: module.Details })));

const LoadingFallback = () => (
  <div className="p-8 space-y-4">
    <Skeleton className="h-12 w-1/3" />
    <Skeleton className="h-64 w-full rounded-xl" />
  </div>
);

const NotFound = () => (
  <div className="h-[70vh] flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-4xl font-bold text-white mb-4">404</h1>
    <p className="text-text-muted">Page not found</p>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* App Routes with Sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/support" element={<Support />} />
          <Route path="/media/:type/:id" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
