import { PUBLICATIONS } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Download, BookOpen, Share2, Printer } from 'lucide-react';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function PublicationDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const pub = PUBLICATIONS.find(p => p.slug === slug);

    if (!pub) {
        notFound();
    }

    return (
        <div className="bg-white">
            {/* Header / Intro */}
            <section className="pt-40 pb-20 bg-soft-grey border-b border-gray-100">
                <div className="max-content">
                    <Link href="/publications" className="text-elegant-grey hover:text-royal-green flex items-center gap-2 mb-10 transition-colors group">
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Publications
                    </Link>
                    <div className="two-column-grid gap-20 items-center">
                        <div className="animate-reveal">
                            <span className="px-4 py-2 bg-royal-green/10 text-royal-green rounded-lg text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                                {pub.category}
                            </span>
                            <h1 className="mb-8 font-serif leading-tight">
                                {pub.title}
                            </h1>
                            <p className="text-body-large text-elegant-grey leading-relaxed">
                                {pub.summary}
                            </p>
                            <div className="mt-12 flex flex-wrap gap-4">
                                <Link href="/contact">
                                    <Button size="lg" className="bg-charcoal-black hover:bg-royal-green text-white rounded-full px-10 h-16 font-bold shadow-xl">
                                        Download Full PDF <Download className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" className="rounded-full px-10 h-16 border-gray-200">
                                    Read Abstract
                                </Button>
                            </div>
                        </div>
                        <div className="animate-slide-reveal flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-gray-100">
                                <Image
                                    src={pub.cover}
                                    alt={pub.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="section-padding">
                <div className="max-content">
                    <div className="grid lg:grid-cols-3 gap-20">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12 animate-reveal">
                            <div>
                                <h3 className="mb-6">About this Publication</h3>
                                <p className="text-elegant-grey leading-relaxed text-lg">
                                    {pub.fullDetails || "Detailed insights and data-driven analysis are at the core of this publication. We explore the complex intersection of policy, innovation, and sustainable development to provide a path forward for stakeholders in the region."}
                                </p>
                            </div>

                            <div className="p-10 bg-soft-grey rounded-3xl border border-gray-100">
                                <h4 className="mb-6">Highlights & Key Takeaways</h4>
                                <ul className="grid sm:grid-cols-2 gap-6">
                                    {[
                                        "Strategic policy recommendations",
                                        "Evidence-based data analysis",
                                        "Regional impact metrics",
                                        "Future-proofing strategies"
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-elegant-grey items-center">
                                            <div className="w-2 h-2 rounded-full bg-royal-green" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Metadata Sidebar */}
                        <div className="animate-slide-reveal">
                            <div className="sticky top-32 space-y-8">
                                <div className="p-8 border border-gray-100 rounded-3xl">
                                    <h4 className="mb-6 text-sm uppercase tracking-widest font-bold">Details</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between py-3 border-b border-gray-50 text-sm">
                                            <span className="text-elegant-grey">Published</span>
                                            <span className="font-bold">Dec 2024</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-50 text-sm">
                                            <span className="text-elegant-grey">Language</span>
                                            <span className="font-bold">English</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-50 text-sm">
                                            <span className="text-elegant-grey">Format</span>
                                            <span className="font-bold">PDF, Print</span>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex gap-4">
                                        <Button variant="ghost" size="sm" className="text-elegant-grey hover:text-royal-green">
                                            <Share2 className="h-4 w-4 mr-2" /> Share
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-elegant-grey hover:text-royal-green">
                                            <Printer className="h-4 w-4 mr-2" /> Print
                                        </Button>
                                    </div>
                                </div>

                                <div className="p-10 bg-charcoal-black text-white rounded-3xl text-center">
                                    <BookOpen className="h-10 w-10 text-royal-green mx-auto mb-6" />
                                    <h4 className="text-white mb-4">Request Printed Copy</h4>
                                    <p className="text-white/40 text-xs mb-8">Limited physical copies are available for educational and governmental institutions.</p>
                                    <Link href="/contact" className="block">
                                        <Button variant="outline" className="w-full h-14 border-white/20 text-white hover:bg-white hover:text-charcoal-black rounded-full font-bold">
                                            Request Copy
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
