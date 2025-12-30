'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Users,
    Search,
    Lightbulb,
    BookOpen,
    CheckCircle2,
    Award,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
    const approach = [
        {
            id: "01",
            title: "Research & Evidence",
            desc: "We start with understanding; grounded in rigorous research and data.",
            icon: <Search />
        },
        {
            id: "02",
            title: "Creativity & Innovation",
            desc: "We design bold, adaptive solutions that respond directly to real-world needs.",
            icon: <Lightbulb />
        },
        {
            id: "03",
            title: "Documentation & Knowledge",
            desc: "We produce books, reports, and publications that shape conversations and guide action.",
            icon: <BookOpen />
        },
        {
            id: "04",
            title: "Collaboration & Co-Creation",
            desc: "We partner across governments, businesses, academia, civil society, and communities.",
            icon: <Users />
        }
    ];

    return (
        <div className="bg-white">
            {/* Hero / Header Section */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-soft-grey">
                <div className="max-content">
                    <div className="max-w-4xl animate-reveal">
                        <span className="text-royal-green font-bold uppercase tracking-[0.2em] text-xs lg:text-sm mb-6 block underline underline-offset-8">About Us</span>
                        <h1 className="mb-6 lg:mb-8 font-serif">Who We Are</h1>
                        <p className="text-lg lg:text-body-large text-charcoal-black/80 max-w-2xl leading-relaxed">
                            Interworld is a home of bold ideas, visionary thinking, and practical innovation. We are more than an organisation; we are a movement committed to creating sustainable, measurable, and transformative impact.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content / Introduction */}
            <section className="section-padding">
                <div className="max-content">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                        <div className="animate-reveal">
                            <div className="space-y-6 lg:space-y-8 text-base lg:text-body-reg text-elegant-grey leading-relaxed">
                                <p>
                                    We listen deeply, learn continuously, and work collaboratively with communities, institutions, and industries.
                                </p>
                                <p>
                                    Knowledge is at the heart of our identity. Every insight we generate is designed to inform action, strengthen systems, and inspire change.
                                </p>
                            </div>

                            {/* Mission & Vision Cards */}
                            <div className="mt-12 lg:mt-16 grid gap-6 lg:gap-8">
                                <div className="p-8 lg:p-10 bg-soft-grey rounded-3xl border-l-4 border-royal-green shadow-sm">
                                    <h3 className="text-2xl lg:text-3xl mb-4">Our Mission</h3>
                                    <p className="text-elegant-grey text-sm lg:text-base leading-relaxed">
                                        Our mission is to empower communities, organisations, and industries by designing innovative, practical, and research-driven solutions that create real and lasting impact. We use evidence-based insights to guide sustainable development, strengthen systems, and foster resilience across social, economic, and environmental spheres.
                                    </p>
                                </div>
                                <div className="p-8 lg:p-10 bg-charcoal-black text-white rounded-3xl shadow-xl">
                                    <h3 className="text-2xl lg:text-3xl text-white mb-4">Our Vision</h3>
                                    <p className="text-white/80 text-sm lg:text-base leading-relaxed">
                                        We envision a world where knowledge, innovation, and collaboration unite to create sustainable, resilient, and thriving communities. A world where ideas move beyond imagination and become powerful tools for transformation.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="animate-slide-reveal lg:sticky lg:top-32 mt-12 lg:mt-0">
                            <div className="relative aspect-[4/5] sm:aspect-video lg:aspect-[4/5] rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                                    alt="Team Collaboration"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-black/60 to-transparent" />
                                <div className="absolute bottom-8 left-8 lg:bottom-10 lg:left-10 text-white right-8 lg:right-10">
                                    <p className="text-base lg:text-lg font-serif italic mb-2">"Vision into action."</p>
                                    <div className="w-10 lg:w-12 h-1 bg-royal-green" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Approach */}
            <section className="section-padding bg-charcoal-black text-white">
                <div className="max-content">
                    <div className="text-center max-w-3xl mx-auto mb-20 animate-reveal">
                        <h2 className="text-white mb-6">Our Approach</h2>
                        <p className="text-white/60">We follow a systematic and collaborative process to ensure our solutions are sustainable, evidence-based, and impactful.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {approach.map((item, i) => (
                            <div key={i} className="animate-reveal p-10 bg-white/5 rounded-3xl border border-white/10 group hover:border-royal-green/50 transition-all" style={{ animationDelay: `${(i + 1) * 150}ms` }}>
                                <div className="text-2xl font-bold text-royal-green/30 mb-8 group-hover:text-royal-green transition-colors">{item.id}</div>
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-royal-green mb-8 group-hover:bg-royal-green group-hover:text-white transition-all">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                                <p className="text-white/60 leading-relaxed text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Interworld */}
            <section className="section-padding">
                <div className="max-content">
                    <div className="two-column-grid gap-20 items-center">
                        <div className="animate-slide-reveal lg:order-last">
                            <div className="relative p-12 bg-soft-grey rounded-[3rem] border border-gray-100">
                                <h3 className="mb-8">Why Interworld</h3>
                                <div className="space-y-6">
                                    {[
                                        "Transformational partnership approach.",
                                        "Rigorous global standards in research.",
                                        "African-rooted innovation with global scale.",
                                        "Dedicated focus on long-term sustainability.",
                                        "Bridging the gap between theory and practice."
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 items-start">
                                            <CheckCircle2 className="h-6 w-6 text-royal-green shrink-0 mt-1" />
                                            <span className="text-elegant-grey font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="animate-reveal">
                            <h2 className="mb-8">Commitment to Change</h2>
                            <p className="text-body-large text-elegant-grey leading-relaxed mb-12">
                                Interworld is a transformational partner. We combine research, creativity, and execution to turn ideas into impact. We are storytellers, researchers, innovators, and strategic thinkers. Our work strengthens systems, empowers communities, and builds legacies of resilience and sustainability.
                            </p>
                            <div className="p-10 border-2 border-dashed border-royal-green/20 rounded-3xl bg-royal-green/5">
                                <h4 className="text-royal-green font-bold mb-4 uppercase tracking-[0.2em] text-xs">Join Us</h4>
                                <p className="text-charcoal-black font-semibold text-lg mb-8 leading-relaxed">
                                    Be part of a movement dedicated to shaping the future through knowledge, innovation, and purposeful collaboration.
                                </p>
                                <Link href="/contact">
                                    <Button className="rounded-full px-10 bg-royal-green hover:bg-royal-green/90 h-14">
                                        Partner With Us <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
