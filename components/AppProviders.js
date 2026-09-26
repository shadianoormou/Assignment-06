'use client';

import { WorkoutProvider } from '@/context/WorkoutContext';
import { ToastProvider } from '@/context/ToastContext';

export function AppProviders({ children }) {
  return (
    <WorkoutProvider>
      <ToastProvider>{children}</ToastProvider>
    </WorkoutProvider>
  );
}
