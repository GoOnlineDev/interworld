import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn about Interworld, a bold African institution dedicated to transforming knowledge into action and ideas into lasting impact through research, innovation, and collaboration.',
    openGraph: {
        title: 'About Us | Interworld',
        description: 'Learn about Interworld, a bold African institution dedicated to transforming knowledge into action and ideas into lasting impact.',
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
