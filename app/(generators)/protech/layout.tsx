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
  return children;
} 