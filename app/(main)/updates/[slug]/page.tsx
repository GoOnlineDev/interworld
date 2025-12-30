'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2, Tag, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { use } from 'react';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function UpdateDetailPage({ params }: PageProps) {
    const { slug } = use(params);
    const update = useQuery(api.updates.getBySlug, { slug });

    // Handle loading
    if (update === undefined) {
        return (
            <div className="bg-white h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-royal-green" />
            </div>
        );
    }

    // Handle not found
    if (update === null) {
        notFound();
    }

    return (
        <div className="bg-white pb-24 lg:pb-32">
            {/* Hero Header */}
            <section className="pt-28 pb-12 lg:pt-40 lg:pb-24 bg-soft-grey border-b border-gray-100">
                <div className="max-content">
                    <Link href="/updates" className="text-elegant-grey hover:text-royal-green flex items-center gap-2 mb-6 lg:mb-12 transition-colors group text-xs lg:text-sm font-bold uppercase tracking-widest">
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Newsroom
                    </Link>
                    <div className="max-w-4xl animate-reveal">
                        <div className="flex flex-wrap items-center gap-3 lg:gap-4 mb-4 lg:mb-8">
                            <span className="px-3 py-1 lg:px-4 lg:py-1.5 bg-royal-green text-white rounded-lg text-[10px] lg:text-xs font-bold uppercase tracking-widest">
                                {update.category}
                            </span>
                            <div className="flex items-center gap-2 text-[10px] lg:text-sm text-elegant-grey font-bold uppercase tracking-widest">
                                <Calendar className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-royal-green" /> {new Date(update._creationTime).toLocaleDateString()}
                            </div>
                        </div>
                        <h1 className="mb-4 lg:mb-8 font-serif leading-tight text-2xl lg:text-5xl">
                            {update.title}
                        </h1>
                        <p className="text-base lg:text-body-large text-elegant-grey max-w-2xl leading-relaxed italic">
                            {update.excerpt}
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            <div className="max-content -mt-12 lg:-mt-20 relative z-20 animate-slide-reveal">
                <div className="relative aspect-video rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl border border-white/20">
                    <Image
                        src={update.image}
                        alt={update.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Content Body */}
            <section className="section-padding">
                <div className="max-content">
                    <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
                        {/* Article Text */}
                        <div className="lg:col-span-2 space-y-8 lg:space-y-12 animate-reveal text-base lg:text-lg text-elegant-grey leading-[1.8]">
                            <p className="font-bold text-charcoal-black text-lg lg:text-xl">
                                In a significant milestone for innovation in East Africa, Interworld has reached a new height in its mission to transform developmental insights into lasting impact.
                            </p>
                            <p className="whitespace-pre-line">
                                {update.content}
                            </p>
                            <p>
                                This development is expected to catalyze a ripple effect across multiple sectors including sustainable agriculture, circular economy, and industrial efficiency. Our team is committed to ensuring that these advancements are accessible and scalable for all partners.
                            </p>
                            <p>
                                Stay tuned for more updates as we continue to push the boundaries of what's possible through research and collaboration.
                            </p>

                            <div className="pt-10 lg:pt-12 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-soft-grey rounded-full flex items-center justify-center text-royal-green shadow-sm">
                                        <User className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-charcoal-black">By Interworld Press</p>
                                        <p className="text-[10px] lg:text-xs font-bold text-elegant-grey uppercase tracking-widest">Impact Communications Division</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 w-full sm:w-auto">
                                    <Button variant="outline" size="sm" className="w-full sm:w-auto rounded-full border-gray-200 font-bold uppercase tracking-widest text-[10px]">
                                        <Share2 className="h-4 w-4 mr-2" /> Share Article
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="animate-slide-reveal mt-12 lg:mt-0">
                            <div className="lg:sticky lg:top-32 space-y-8 lg:space-y-12">
                                <div className="p-8 lg:p-10 bg-soft-grey rounded-[2.5rem] border border-gray-100">
                                    <h4 className="mb-6 lg:mb-8 flex items-center gap-2 text-charcoal-black font-bold uppercase tracking-widest text-xs">
                                        <Tag className="h-4 w-4 text-royal-green" /> Related Topics
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {["Sustainability", "Innovation", "East Africa", "Regional Development", "Impact"].map((tag, i) => (
                                            <span key={i} className="px-4 py-2 bg-white rounded-full text-[10px] lg:text-xs font-bold text-charcoal-black border border-gray-200 hover:border-royal-green transition-colors cursor-pointer capitalize">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-10 lg:p-12 bg-charcoal-black text-white rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl relative overflow-hidden">
                                    <h3 className="text-white text-2xl lg:text-3xl mb-4 lg:mb-6">Drive the Change</h3>
                                    <p className="text-white/60 text-sm mb-10 leading-relaxed">
                                        Learn more about how Interworld can partner with your organization to create measurable impact.
                                    </p>
                                    <Link href="/contact" className="block">
                                        <Button className="w-full h-16 bg-royal-green hover:bg-royal-green/90 rounded-full font-bold shadow-xl text-white">
                                            Partner With Us
                                        </Button>
                                    </Link>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-royal-green/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
