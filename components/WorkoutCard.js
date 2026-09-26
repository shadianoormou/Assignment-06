import Link from 'next/link';
import { ArrowUpRight, Clock3, Flame, Star } from 'lucide-react';

export function WorkoutCard({ workout }) {
  return (
    <Link className="workout-card" href={`/workout/${workout.id}`}>
      <div className="card-image-wrap">
        <img src={workout.image} alt={workout.name} className="card-image" loading="lazy" />
        <span className="card-arrow"><ArrowUpRight size={17} /></span>
      </div>
      <div className="card-body">
        <div className="tag-list">{workout.muscleGroups.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        <h3>{workout.name}</h3>
        <p className="equipment">{workout.equipment}</p>
        <div className="stats-row">
          <span><Clock3 size={13} /> {workout.duration} min</span>
          <span><Flame size={13} /> {workout.caloriesBurned} kcal</span>
          <span><Star size={13} fill="currentColor" /> {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}

export function WorkoutCardSkeleton() {
  return <div className="workout-card skeleton-card"><div className="skeleton skeleton-image" /><div className="card-body"><div className="skeleton skeleton-line short" /><div className="skeleton skeleton-line" /><div className="skeleton skeleton-line tiny" /></div></div>;
}
