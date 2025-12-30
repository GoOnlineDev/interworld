import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Updates & Newsroom',
    description: 'Stay informed with the latest news, events, announcements, and thought leadership from Interworld.',
    openGraph: {
        title: 'Updates | Interworld',
        description: 'Latest insights and innovations from Interworld.',
    },
};

export default function UpdatesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
