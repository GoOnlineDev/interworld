import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ',
    description: 'Find answers to frequently asked questions about Interworld\'s methodology, services, and how we drive sustainable impact across East Africa.',
    openGraph: {
        title: 'FAQ | Interworld',
        description: 'Answers to common questions about Interworld\'s approach and services.',
    },
};

export default function FAQLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
