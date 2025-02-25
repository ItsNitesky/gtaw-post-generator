import { unstable_noStore as noStore } from 'next/cache';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'ProTech Security Report Generators',
};

export default function ProtechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  noStore();
  return children;
} 