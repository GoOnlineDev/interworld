import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Publications',
    description: 'Explore Interworld\'s collection of research publications, books, reports, and academic papers that bridge insight and real-world impact.',
    openGraph: {
        title: 'Publications | Interworld',
        description: 'Knowledge products that inspire action - research, reports, and books from Interworld.',
    },
};

export default function PublicationsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
