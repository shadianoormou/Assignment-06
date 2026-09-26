import { Footer, Header } from '@/components/Header';

export function PageFrame({ children }) {
  return <><Header />{children}<Footer /></>;
}
