'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Check, Dumbbell, Flame, Timer } from 'lucide-react';
import { PageFrame } from '@/components/PageFrame';
import { PlanWorkoutCard } from '@/components/PlanWorkoutCard';
import { useToast } from '@/context/ToastContext';
import { useWorkouts } from '@/context/WorkoutContext';

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState('plan');
  const { plan, saved, hydrated, markDone, removeFromPlan, removeSaved } = useWorkouts();
  const { showToast } = useToast();
  const currentList = activeTab === 'plan' ? plan : saved;
  const totals = currentList.reduce((summary, workout) => ({ exercises: summary.exercises + 1, minutes: summary.minutes + workout.duration, calories: summary.calories + workout.caloriesBurned }), { exercises: 0, minutes: 0, calories: 0 });

  function handleDone(id) { markDone(id); showToast('Workout marked as done'); }
  function handleRemove(id) { if (activeTab === 'plan') removeFromPlan(id); else removeSaved(id); showToast(activeTab === 'plan' ? "Removed from today's plan" : 'Removed from saved list'); }

  return (
    <PageFrame>
      <main className="plan-page">
        <div className="plan-heading"><div><p className="eyebrow">YOUR TRAINING LOG / TODAY</p><h1>MY PLAN</h1><p>Cap of five lifts for today. Finish them, then load more.</p></div><Link className="button button-primary" href="/#library">Add a workout <ArrowRight size={16} /></Link></div>
        <div className="metrics-grid"><div className="metric-card"><Dumbbell size={18} /><strong>{totals.exercises}</strong><span>Exercises</span></div><div className="metric-card"><Timer size={18} /><strong>{totals.minutes}</strong><span>Minutes</span></div><div className="metric-card"><Flame size={18} /><strong>{totals.calories}</strong><span>Calories</span></div></div>
        <div className="plan-tabs" role="tablist"><button aria-selected={activeTab === 'plan'} className={activeTab === 'plan' ? 'active' : ''} onClick={() => setActiveTab('plan')} role="tab">Today&apos;s plan <span>{plan.length}</span></button><button aria-selected={activeTab === 'saved'} className={activeTab === 'saved' ? 'active' : ''} onClick={() => setActiveTab('saved')} role="tab">Saved <span>{saved.length}</span></button></div>
        {!hydrated && <div className="plan-loading"><span className="loader" /><p>Loading workouts…</p></div>}
        {hydrated && currentList.length === 0 && <div className="empty-plan"><div className="empty-icon"><Check size={23} /></div><p className="eyebrow">THE LOG IS CLEAR</p><h2>NOTHING HERE YET</h2><p>Browse the library and add a lift to get today moving.</p><Link className="button button-primary" href="/#library">Go to workouts <ArrowRight size={15} /></Link></div>}
        {hydrated && currentList.length > 0 && <div className="plan-list">{currentList.map((workout) => <PlanWorkoutCard key={workout.id} workout={workout} saved={activeTab === 'saved'} onDone={handleDone} onRemove={handleRemove} />)}</div>}
      </main>
    </PageFrame>
  );
}
