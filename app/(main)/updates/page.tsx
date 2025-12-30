'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function UpdatesPage() {
    const updates = useQuery(api.updates.getAll);
    const publishedUpdates = updates?.filter(u => u.isPublished) || [];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-soft-grey">
                <div className="max-content">
                    <div className="max-w-4xl animate-reveal">
                        <span className="text-royal-green font-bold uppercase tracking-[0.2em] text-[10px] lg:text-sm mb-6 block underline underline-offset-8">Updates & Newsroom</span>
                        <h1 className="mb-6 lg:mb-8 font-serif leading-tight">Latest Insights & Innovations</h1>
                        <p className="text-lg lg:text-body-large text-elegant-grey max-w-2xl leading-relaxed">
                            Stay informed with the latest news, events, announcements, and thought leadership from Interworld.
                        </p>
                    </div>
                </div>
            </section>

            {/* Updates Grid */}
            <section className="section-padding">
                <div className="max-content">
                    {!updates ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-royal-green" />
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                            {publishedUpdates.map((update, i) => (
                                <Link
                                    href={`/updates/${update.slug}`}
                                    key={i}
                                    className="group flex flex-col sm:flex-row gap-6 lg:gap-8 animate-reveal"
                                    style={{ animationDelay: `${(i + 1) * 150}ms` }}
                                >
                                    <div className="aspect-[4/3] sm:w-48 lg:w-64 rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg border border-gray-100 shrink-0 relative">
                                        <Image
                                            src={update.image}
                                            alt={update.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-royal-green uppercase tracking-widest shadow-sm">
                                            {update.category}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="flex items-center gap-2 text-[10px] lg:text-xs text-elegant-grey mb-3 lg:mb-4 font-bold uppercase tracking-widest">
                                            <Calendar className="h-4 w-4 text-royal-green" /> {new Date(update.date).toLocaleDateString()}
                                        </div>
                                        <h3 className="text-xl lg:text-2xl mb-3 lg:mb-4 group-hover:text-royal-green transition-colors leading-tight">{update.title}</h3>
                                        <p className="text-sm text-elegant-grey mb-6 line-clamp-2 leading-relaxed">{update.excerpt}</p>
                                        <div className="text-royal-green font-bold flex items-center gap-2 group-hover:gap-4 transition-all text-xs lg:text-sm">
                                            Read More <ChevronRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {updates && publishedUpdates.length === 0 && (
                        <div className="text-center py-20 opacity-50 italic text-elegant-grey">
                            No updates available at the moment. Please check back later.
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="section-padding bg-charcoal-black text-white">
                <div className="max-content text-center">
                    <div className="animate-reveal">
                        <h2 className="text-white text-3xl lg:text-4xl mb-6 lg:mb-8">Stay Ahead of the Curve</h2>
                        <p className="text-white/60 text-base lg:text-lg mb-10 lg:mb-12 max-w-xl mx-auto">Subscribe to our newsletter to receive monthly insights on innovation, sustainability, and regional impact directly in your inbox.</p>
                        <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white outline-none focus:border-royal-green transition-all text-sm lg:text-base h-14"
                            />
                            <Button className="w-full sm:w-auto rounded-full px-10 bg-royal-green hover:bg-royal-green/90 font-bold h-14">Subscribe</Button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
