import WorkoutDetailPage from '@/components/WorkoutDetailPage';

export default function WorkoutDetailRoute({ params }) {
  return <WorkoutDetailPage id={params.id} />;
}
