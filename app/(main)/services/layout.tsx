import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Services',
    description: 'Explore Interworld\'s comprehensive range of professional services including strategic consulting, research & development, monitoring & evaluation, and capacity building.',
    openGraph: {
        title: 'Our Services | Interworld',
        description: 'Explore Interworld\'s comprehensive services designed to bridge the gap between understanding and execution.',
    },
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
