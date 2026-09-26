import './globals.css';
import { AppProviders } from '@/components/AppProviders';

export const metadata = {
  title: 'FitLog — Train with intent',
  description: 'A focused workout library and daily training plan.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
