import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with Interworld. Partner with us to create sustainable impact through innovation, research, and strategic collaboration.',
    openGraph: {
        title: 'Contact Us | Interworld',
        description: 'Let\'s build a future defined by innovation. Reach out and partner with Interworld.',
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
