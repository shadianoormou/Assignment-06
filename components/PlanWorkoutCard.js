import Link from 'next/link';
import { Check, Clock3, Flame, Star, X } from 'lucide-react';

export function PlanWorkoutCard({ workout, saved, onDone, onRemove }) {
  return (
    <article className={`plan-card ${workout.done ? 'is-done' : ''}`}>
      <img src={workout.image} alt="" className="plan-thumb" />
      <div className="plan-card-copy">
        <div className="tag-list">{workout.muscleGroups.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        <h3>{workout.name}</h3>
        <p>{workout.equipment}</p>
        <div className="stats-row"><span><Clock3 size={13} /> {workout.duration} min</span><span><Flame size={13} /> {workout.caloriesBurned} kcal</span><span><Star size={13} fill="currentColor" /> {workout.rating}</span></div>
      </div>
      <div className="plan-card-actions">
        <Link className="button button-ghost small-button" href={`/workout/${workout.id}`}>View details</Link>
        {!saved && <button className="button button-ghost small-button done-button" onClick={() => onDone(workout.id)} disabled={workout.done}><Check size={14} /> {workout.done ? 'Done' : 'Mark as done'}</button>}
        <button className="icon-button" aria-label={`Remove ${workout.name}`} onClick={() => onRemove(workout.id)}><X size={17} /></button>
      </div>
    </article>
  );
}
