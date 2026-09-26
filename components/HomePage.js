'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowDownUp, Search } from 'lucide-react';
import { getWorkouts } from '@/lib/api';
import { Hero } from '@/components/Hero';
import { PageFrame } from '@/components/PageFrame';
import { WorkoutCard, WorkoutCardSkeleton } from '@/components/WorkoutCard';

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('duration');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    getWorkouts()
      .then((data) => { if (active) setWorkouts(data); })
      .catch(() => { if (active) setError('We could not load the library. Please refresh and try again.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [loadAttempt]);

  const visibleWorkouts = useMemo(() => {
    const filtered = workouts.filter((workout) => {
      const haystack = `${workout.name} ${workout.muscleGroups.join(' ')} ${workout.equipment}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
    return filtered.sort((a, b) => {
      if (sort === 'calories') return b.caloriesBurned - a.caloriesBurned;
      if (sort === 'rating') return b.rating - a.rating;
      return a.duration - b.duration;
    });
  }, [query, sort, workouts]);

  return (
    <PageFrame>
      <Hero />
      <main className="library-section" id="library">
        <div className="section-heading">
          <div><p className="eyebrow">THE WORKOUT INDEX / 12 MOVES</p><h2>THE LIBRARY</h2><p>Twelve lifts covering every major muscle group.</p></div>
          <div className="library-tools">
            <label className="search-field"><Search size={15} aria-hidden="true" /><input aria-label="Search workouts" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search library" /></label>
            <label className="sort-field"><ArrowDownUp size={14} aria-hidden="true" /><span>Sort by</span><select aria-label="Sort workouts by" value={sort} onChange={(event) => setSort(event.target.value)}><option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option></select></label>
          </div>
        </div>
        {loading && <div className="workout-grid" aria-label="Loading workouts">{Array.from({ length: 6 }).map((_, index) => <WorkoutCardSkeleton key={index} />)}</div>}
        {!loading && error && <div className="inline-error"><p>{error}</p><button className="button button-ghost" onClick={() => setLoadAttempt((attempt) => attempt + 1)}>Try again</button></div>}
        {!loading && !error && visibleWorkouts.length === 0 && <div className="inline-error"><p>No workouts match that search.</p></div>}
        {!loading && !error && visibleWorkouts.length > 0 && <div className="workout-grid">{visibleWorkouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}</div>}
      </main>
    </PageFrame>
  );
}
