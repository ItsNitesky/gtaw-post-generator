import { Metadata } from 'next';

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