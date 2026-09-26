import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found page-shell">
      <p className="eyebrow">404 / OFF THE MAP</p>
      <h1>THIS REP DOESN&apos;T EXIST.</h1>
      <p>The page you&apos;re looking for is not in the FitLog library.</p>
      <Link className="button button-primary" href="/">Back to the library</Link>
    </main>
  );
}
