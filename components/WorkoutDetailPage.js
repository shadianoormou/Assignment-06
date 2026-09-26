'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, Bookmark, Check, Plus } from 'lucide-react';
import { getWorkout } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import { useWorkouts } from '@/context/WorkoutContext';
import { PageFrame } from '@/components/PageFrame';

export default function WorkoutDetailPage({ id }) {
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { plan, saved, addToPlan, saveForLater } = useWorkouts();
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;
    getWorkout(id).then((data) => { if (active) setWorkout(data); }).catch(() => { if (active) setError(true); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (loading) return <PageFrame><main className="detail-state"><span className="loader" /><p>Loading workout…</p></main></PageFrame>;
  if (error || !workout) return <PageFrame><main className="detail-state"><p className="eyebrow">WORKOUT NOT FOUND</p><h1>THAT LIFT ISN&apos;T IN THE LIBRARY.</h1><Link className="button button-primary" href="/">Back to library</Link></main></PageFrame>;

  const alreadyPlanned = plan.some((item) => item.id === workout.id);
  const alreadySaved = saved.some((item) => item.id === workout.id);
  const planFull = plan.length >= 5 && !alreadyPlanned;

  function handlePlan() {
    if (planFull) return showToast('Today\'s plan is capped at five lifts', 'error');
    if (alreadyPlanned) return showToast('Already in today\'s plan');
    addToPlan(workout);
    showToast('Added to today\'s plan');
  }

  function handleSave() {
    if (alreadySaved) return showToast('Already saved for later');
    saveForLater(workout);
    showToast('Saved for later');
  }

  return (
    <PageFrame>
      <main className="detail-page">
        <Link className="back-link" href="/"><ArrowLeft size={15} /> Back to library</Link>
        <div className="detail-layout">
          <div className="detail-visual"><img src={workout.image} alt={workout.name} /><span className="detail-index">LIFT / {String(workout.id).padStart(2, '0')}</span></div>
          <div className="detail-copy">
            <p className="eyebrow">{workout.difficulty.toUpperCase()} / {workout.muscleGroups.join(' + ').toUpperCase()}</p>
            <h1>{workout.name}</h1>
            <p className="detail-description">{workout.description}</p>
            <div className="tag-list detail-tags">{workout.muscleGroups.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
            <div className="spec-grid">
              {[['Equipment', workout.equipment], ['Difficulty', workout.difficulty], ['Sets', workout.sets], ['Reps', workout.reps], ['Duration', `${workout.duration} min`], ['Calories', `${workout.caloriesBurned} kcal`], ['Rating', workout.rating]].map(([label, value]) => <div className="spec" key={label}><span>{label}</span><strong>{value}</strong></div>)}
            </div>
            <div className="instructions"><h2>Instructions</h2><ol>{workout.instructions.map((instruction, index) => <li key={instruction}><span>{String(index + 1).padStart(2, '0')}</span><p>{instruction}</p></li>)}</ol></div>
            <div className="detail-actions"><button className="button button-primary" onClick={handlePlan} disabled={alreadyPlanned}><Plus size={17} /> {alreadyPlanned ? "In today's plan" : planFull ? 'Plan is full' : "Add to today's plan"}</button><button className="button button-ghost" onClick={handleSave} disabled={alreadySaved}><Bookmark size={16} fill={alreadySaved ? 'currentColor' : 'none'} /> {alreadySaved ? 'Saved' : 'Save for later'}</button></div>
            {alreadyPlanned && <p className="action-note"><Check size={13} /> This lift is already on your plan.</p>}
          </div>
        </div>
      </main>
    </PageFrame>
  );
}
