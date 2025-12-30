import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ConvexClientProvider from '@/components/providers/ConvexClientProvider';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexClientProvider>
      <Header />
      <main className="min-h-screen bg-[#F5F7F8]">
        {children}
      </main>
      <Footer />
    </ConvexClientProvider>
  );
}

