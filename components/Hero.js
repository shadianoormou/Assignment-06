import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="hero page-shell">
      <div className="hero-copy">
        <p className="eyebrow">WORKOUT LIBRARY</p>
        <h1>TRAIN WITH INTENT.<br /><span>LOG EVERY SET.</span></h1>
        <p className="hero-text">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p>
        <Link className="button button-primary" href="#library">Browse workouts <ArrowDownRight size={17} /></Link>
      </div>
      <div className="hero-art"><Image src="/assets/banner.png" alt="Illustrated athlete training on a machine" width={334} height={334} priority /></div>
      <div className="hero-note">01 <span>FOCUS<br />FORWARD</span></div>
    </section>
  );
}
