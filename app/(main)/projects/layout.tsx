import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Discover Interworld\'s sustainable innovation projects including Supertech fuel optimization, organic fertilizers, and Calcifeed livestock solutions.',
    openGraph: {
        title: 'Projects | Interworld',
        description: 'Transforming bold ideas into market realities through sustainable innovation projects.',
    },
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
