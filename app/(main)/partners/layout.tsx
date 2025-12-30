import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Partners',
    description: 'Interworld partners with development agencies, private sector companies, and government institutions to drive sustainable transformation.',
    openGraph: {
        title: 'Partners | Interworld',
        description: 'Join a growing ecosystem dedicated to shaping the future through knowledge and innovation.',
    },
};

export default function PartnersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
