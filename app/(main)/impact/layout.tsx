import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Impact & Initiatives',
    description: 'Discover Interworld\'s ongoing initiatives transforming bold ideas into market realities through sustainable innovations.',
    openGraph: {
        title: 'Impact | Interworld',
        description: 'Transforming bold ideas into market realities.',
    },
};

export default function ImpactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
