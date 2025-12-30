'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Sprout, TrendingUp, Award, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
    const projects = [
        {
            title: "Supertech",
            category: "Fuel Optimisation & Green Energy",
            desc: "An Italian engineered combustion optimization technology. It reduces fuel consumption by up to 12% and gas emissions by up to 80%.",
            color: "from-blue-600 to-cyan-600",
            icon: <Zap />,
            link: "/products/supertech"
        },
        {
            title: "Organic Fertilizers",
            category: "Sustainable Agriculture",
            desc: "Promoting bio-manufactured organic fertilizers to restore soil health, increase yields, and reduce chemical dependency.",
            color: "from-emerald-600 to-green-600",
            icon: <Sprout />,
            link: "/products/fertilizers"
        },
        {
            title: "Calcifeed",
            category: "Circular Economy & Livestock",
            desc: "Advancing nutritious livestock feed solutions using Black Soldier Fly larvae, reducing reliance on expensive imports.",
            color: "from-orange-500 to-amber-600",
            icon: <TrendingUp />,
            link: "/products/fertilizers"
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-soft-grey">
                <div className="max-content">
                    <div className="max-w-4xl animate-reveal">
                        <span className="text-royal-green font-bold uppercase tracking-[0.2em] text-xs lg:text-sm mb-6 block underline underline-offset-8">Ongoing Initiatives</span>
                        <h1 className="mb-6 lg:mb-8 font-serif">Transforming Bold Ideas into Market Realities</h1>
                        <p className="text-lg lg:text-body-large text-charcoal-black/80 max-w-2xl leading-relaxed">
                            Interworld promotes awareness, builds markets, and develops practical pathways for sustainable innovations that solve real-world problems.
                        </p>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="section-padding">
                <div className="max-content">
                    <div className="grid gap-20 lg:gap-32">
                        {projects.map((p, i) => (
                            <div key={i} className="grid lg:grid-cols-2 gap-10 lg:gap-20 animate-reveal" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                                <div className={`${i % 2 === 1 ? 'lg:order-last' : ''}`}>
                                    <div className={`aspect-video rounded-[2rem] lg:rounded-[3rem] bg-gradient-to-br ${p.color} p-8 lg:p-12 flex items-center justify-center relative overflow-hidden group shadow-2xl`}>
                                        <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0"></div>
                                        <div className="text-white scale-[2] lg:scale-[3] opacity-20 transition-transform group-hover:scale-[2.5] lg:group-hover:scale-[4] duration-700">
                                            {p.icon}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="text-xs font-bold text-[#007F5F] uppercase tracking-[0.2em] mb-4 lg:mb-6">{p.category}</div>
                                    <h2 className="text-3xl lg:text-4xl font-bold text-[#111111] mb-6">{p.title}</h2>
                                    <p className="text-lg lg:text-xl text-[#747474] mb-8 lg:mb-12 leading-relaxed">
                                        {p.desc}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link href={p.link} className="w-full sm:w-auto">
                                            <Button size="lg" className="w-full rounded-full px-10 h-14 lg:h-16 font-bold">Explore Product</Button>
                                        </Link>
                                        <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-10 h-14 lg:h-16 font-bold border-2">Technical Specs</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Impact Section */}
            <section className="section-padding bg-[#111111] text-white overflow-hidden">
                <div className="max-content">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="animate-reveal">
                            <h2 className="text-white mb-8">Broader Impact</h2>
                            <p className="text-lg lg:text-xl text-gray-400 mb-12 flex gap-4 leading-relaxed lg:leading-[1.8]">
                                < Award className="h-8 w-8 text-[#007F5F] shrink-0" />
                                Beyond specific products, Interworld advocates for policy shifts and systemic changes that support green business and sustainable development.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-royal-green/30 transition-colors">
                                    <h4 className="text-[#007F5F] font-bold mb-3 uppercase tracking-widest text-xs">Policy Advocacy</h4>
                                    <p className="text-sm text-white/60 leading-relaxed">Working with regulators to support inclusive green growth.</p>
                                </div>
                                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-royal-green/30 transition-colors">
                                    <h4 className="text-[#007F5F] font-bold mb-3 uppercase tracking-widest text-xs">Market Development</h4>
                                    <p className="text-sm text-white/60 leading-relaxed">Creating value chains for eco-friendly technologies.</p>
                                </div>
                            </div>
                        </div>
                        <div className="animate-slide-reveal mt-12 lg:mt-0">
                            <div className="relative aspect-square sm:aspect-video lg:aspect-square">
                                <div className="absolute inset-0 premium-gradient rounded-[3rem] lg:rounded-full opacity-20 blur-3xl animate-pulse"></div>
                                <div className="relative z-10 flex flex-col justify-center h-full p-10 lg:p-12 text-center border border-white/10 rounded-[2.5rem] lg:rounded-[4rem] bg-white/5 backdrop-blur-sm">
                                    <Shield className="h-12 w-12 lg:h-16 lg:w-16 text-[#007F5F] mx-auto mb-8" />
                                    <h3 className="text-white text-2xl lg:text-3xl mb-4">Driving Resilience</h3>
                                    <p className="text-white/60 text-sm lg:text-base leading-relaxed">Our projects are designed to build resilience in communities, ensuring they can thrive in a changing climate and economy.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
