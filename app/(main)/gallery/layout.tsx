import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gallery',
    description: 'Explore Interworld\'s visual journey through projects, events, and team collaborations across the region.',
    openGraph: {
        title: 'Gallery | Interworld',
        description: 'Our impact in pictures - moments from field work, workshops, and collaborations.',
    },
};

export default function GalleryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
