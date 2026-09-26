'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'fitlog-workout-state';
const WorkoutContext = createContext(null);

export function WorkoutProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPlan(Array.isArray(parsed.plan) ? parsed.plan : []);
        setSaved(Array.isArray(parsed.saved) ? parsed.saved : []);
      }
    } catch (error) {
      console.warn('FitLog storage could not be restored', error);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved }));
  }, [hydrated, plan, saved]);

  const value = useMemo(() => ({
    plan,
    saved,
    hydrated,
    addToPlan: (workout) => setPlan((current) => current.some((item) => item.id === workout.id) || current.length >= 5 ? current : [...current, workout]),
    removeFromPlan: (id) => setPlan((current) => current.filter((item) => item.id !== id)),
    markDone: (id) => setPlan((current) => current.map((item) => item.id === id ? { ...item, done: true } : item)),
    saveForLater: (workout) => setSaved((current) => current.some((item) => item.id === workout.id) ? current : [...current, workout]),
    removeSaved: (id) => setSaved((current) => current.filter((item) => item.id !== id)),
  }), [hydrated, plan, saved]);

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
}

export function useWorkouts() {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error('useWorkouts must be used inside WorkoutProvider');
  return context;
}
