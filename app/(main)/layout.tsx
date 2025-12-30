import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F5F7F8]">
        {children}
      </main>
      <Footer />
    </>
  );
}

