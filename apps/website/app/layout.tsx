import { inter } from './fonts';

import './style.css';
import { Menu } from '../components/Menu';
import { Footer } from '../components/Footer';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export const metadata = {
  title: 'Welcome to website',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="flex flex-col h-screen">
          <Menu />
          <div className="container mx-auto p-6">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
