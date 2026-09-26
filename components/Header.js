'use client';

import Link from 'next/link';
import { Dumbbell } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useWorkouts } from '@/context/WorkoutContext';

export function Header() {
  const pathname = usePathname();
  const { plan, saved } = useWorkouts();

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="FitLog home">
        <span className="brand-mark"><Dumbbell size={17} strokeWidth={2.5} /></span>
        <span>FITLOG</span>
      </Link>
      <nav className="main-nav" aria-label="Primary navigation">
        <Link className={pathname === '/' ? 'active' : ''} href="/">Workout</Link>
        <Link className={pathname === '/my-plan' ? 'active' : ''} href="/my-plan">My Plan</Link>
      </nav>
      <Link className="status-badges" href="/my-plan" aria-label="Open today's plan and saved workouts">
        <span className="status-badge status-plan"><strong>{plan.length}</strong> Plan</span>
        <span className="status-badge status-saved"><strong>{saved.length}</strong> Saved</span>
      </Link>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand"><span className="brand-mark"><Dumbbell size={17} /></span> FITLOG</div>
      <p className="text-ink/60">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
    </footer>
  );
}
