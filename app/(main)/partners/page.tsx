'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function PartnersPage() {
    const partners = useQuery(api.partners.getAll);
    const publishedPartners = partners?.filter(p => p.isPublished) || [];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-soft-grey">
                <div className="max-content">
                    <div className="max-w-4xl animate-reveal">
                        <span className="text-royal-green font-bold uppercase tracking-[0.2em] text-xs lg:text-sm mb-6 block underline underline-offset-8">Partnerships</span>
                        <h1 className="mb-6 lg:mb-8 font-serif">Our Partners</h1>
                        <p className="text-lg lg:text-body-large text-charcoal-black/80 max-w-2xl leading-relaxed">
                            Interworld partners with development agencies, private sector companies, and government institutions committed to turning knowledge into transformation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Partners Grid */}
            <section className="section-padding">
                <div className="max-content">
                    {!partners ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-royal-green" />
                        </div>
                    ) : publishedPartners.length === 0 ? (
                        <div className="text-center py-20 text-elegant-grey">
                            <p>No partners listed at the moment.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12 items-center">
                            {publishedPartners.map((partner, i) => (
                                <div
                                    key={i}
                                    className="aspect-[3/2] relative grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 group"
                                >
                                    <Image
                                        src={partner.logo || '/logo.png'}
                                        alt={partner.name}
                                        fill
                                        className="object-contain"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm">
                                        <span className="font-bold text-charcoal-black text-center px-4">{partner.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding">
                <div className="max-content">
                    <div className="p-10 lg:p-16 bg-soft-grey rounded-[2rem] lg:rounded-[3rem] border border-gray-100 text-center">
                        <h3 className="text-2xl lg:text-3xl mb-6 font-serif">Become a Partner</h3>
                        <p className="text-elegant-grey text-sm lg:text-base mb-10 max-w-xl mx-auto leading-relaxed">Join a growing ecosystem dedicated to shaping the future through knowledge and innovation.</p>
                        <Link href="/contact">
                            <Button className="w-full sm:w-auto rounded-full px-10 bg-royal-green h-14 lg:h-16 font-bold">Get in Touch <ArrowRight className="h-4 w-4 ml-2" /></Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
