'use client';

import { Button } from '@/components/ui/button';
import {
    Download,
    Filter,
    BookOpen,
    FileText,
    GraduationCap,
    ChevronRight,
    ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const categories = [
    "All",
    "Books",
    "Reports",
    "Policy Briefs",
    "Journals",
    "Academic Papers",
    "Knowledge Products"
];

const iconMap = {
    FileText: <FileText />,
    BookOpen: <BookOpen />,
    ScrollText: <FileText />, // Fallback
    GraduationCap: <GraduationCap />,
    BarChart: <FileText /> // Fallback
};

export default function PublicationsPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const publications = useQuery(api.publications.getAll);
    const publishedPubs = publications?.filter(p => p.isPublished) || [];

    const filteredPubs = activeCategory === "All"
        ? publishedPubs
        : publishedPubs.filter(p => p.category === activeCategory);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-soft-grey border-b border-gray-100">
                <div className="max-content">
                    <div className="max-w-4xl animate-reveal">
                        <span className="text-royal-green font-bold uppercase tracking-[0.2em] text-xs lg:text-sm mb-6 block underline underline-offset-8">Publications</span>
                        <h1 className="mb-6 lg:mb-8 font-serif">Knowledge that Inspires Action</h1>
                        <p className="text-lg lg:text-body-large text-charcoal-black/80 max-w-2xl leading-relaxed">
                            Explore our collection of research, reports, and books that bridge the gap between insight and real-world impact.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="sticky top-[72px] lg:top-[88px] z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 lg:py-6 overflow-x-auto scroller-hide">
                <div className="max-content flex items-center gap-6 min-w-max lg:min-w-0">
                    <div className="flex items-center gap-2 text-charcoal-black font-bold text-xs uppercase tracking-widest">
                        <Filter className="h-4 w-4" /> Filters
                    </div>
                    <div className="flex items-center gap-3">
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs lg:text-sm font-bold transition-all ${activeCategory === cat ? 'bg-royal-green text-white shadow-lg shadow-royal-green/20' : 'bg-soft-grey text-elegant-grey hover:bg-gray-200'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Publications Grid */}
            <section className="section-padding">
                <div className="max-content">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {filteredPubs.map((pub, i) => (
                            <Link
                                href={`/publications/${pub.slug}`}
                                key={i}
                                className="animate-reveal group cursor-pointer"
                                style={{ animationDelay: `${(i + 1) * 100}ms` }}
                            >
                                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 mb-6 lg:mb-8 bg-soft-grey border border-gray-100">
                                    <Image
                                        src={pub.cover}
                                        alt={pub.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 lg:top-6 lg:left-6 px-3 py-1.5 lg:px-4 lg:py-2 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] lg:text-xs font-bold text-royal-green shadow-sm">
                                        {pub.category}
                                    </div>
                                </div>

                                <div className="px-1 lg:px-2">
                                    <h3 className="text-lg lg:text-xl mb-4 leading-tight group-hover:text-royal-green transition-colors">{pub.title}</h3>
                                    <p className="text-sm text-elegant-grey leading-relaxed mb-6 lg:mb-8 line-clamp-3">
                                        {pub.summary}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <Button variant="ghost" className="p-0 text-charcoal-black font-bold flex items-center gap-2 hover:gap-4 transition-all text-sm">
                                            Read More <ChevronRight className="h-4 w-4 text-royal-green" />
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {filteredPubs.length === 0 && (
                        <div className="text-center py-20 opacity-50">
                            <BookOpen className="h-16 w-16 mx-auto mb-6" />
                            <p className="text-lg">No publications found in this category yet.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Featured Insight Section */}
            <section className="section-padding bg-charcoal-black text-white">
                <div className="max-content">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="animate-reveal">
                            <span className="text-royal-green font-bold uppercase tracking-[0.2em] text-[10px] lg:text-xs mb-6 block">Featured Publication</span>
                            <h2 className="text-white text-3xl lg:text-4xl mb-6 lg:mb-8">Interworld Annual Report 2024</h2>
                            <p className="text-white/60 text-base lg:text-lg leading-relaxed mb-10">
                                Our latest annual report details the year's progress, impact metrics, and our strategic vision for the 2025 development cycle.
                            </p>
                            <Link href="/contact">
                                <Button size="lg" className="w-full sm:w-auto bg-royal-green hover:bg-royal-green/90 rounded-full px-10 h-14 lg:h-16 font-bold">
                                    Download Full Report <Download className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                        <div className="animate-slide-reveal mt-12 lg:mt-0">
                            <div className="relative aspect-video rounded-[2rem] lg:rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                                <Image
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
                                    alt="Annual Report Preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
