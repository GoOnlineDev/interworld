'use client';

import { Button } from '@/components/ui/button';
import {
    Users,
    Search,
    BarChart4,
    FileText,
    GraduationCap,
    PenTool,
    BookOpen,
    ShieldCheck,
    Award,
    ChevronRight,
    ArrowRight,
    Lightbulb,
    Zap,
    Briefcase,
    Globe,
    Sprout,
    TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const iconMap = {
    Users: <Users />,
    Search: <Search />,
    BarChart4: <BarChart4 />,
    FileText: <FileText />,
    GraduationCap: <GraduationCap />,
    PenTool: <PenTool />,
    BookOpen: <BookOpen />,
    ShieldCheck: <ShieldCheck />,
    Award: <Award />,
    Lightbulb: <Lightbulb />,
    Zap: <Zap />,
    Briefcase: <Briefcase />,
    Globe: <Globe />,
    Sprout: <Sprout />,
    TrendingUp: <TrendingUp />,
};

export default function ServicesPage() {
    const services = useQuery(api.services.getAll);
    const publishedServices = services?.filter(s => s.isPublished) || [];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-soft-grey">
                <div className="max-content">
                    <div className="max-w-4xl animate-reveal">
                        <span className="text-royal-green font-bold uppercase tracking-[0.2em] text-xs lg:text-sm mb-6 block underline underline-offset-8">Our Services</span>
                        <h1 className="mb-6 lg:mb-8 font-serif">What We Do</h1>
                        <p className="text-lg lg:text-body-large text-charcoal-black/80 max-w-2xl leading-relaxed">
                            We provide a comprehensive range of professional services designed to bridge the gap between understanding and execution.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding">
                <div className="max-content">
                    {publishedServices.length === 0 ? (
                        <div className="text-center py-20 text-elegant-grey">Loading services...</div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                            {publishedServices.map((service, i) => (
                                <Link
                                    href={`/services/${service.slug}`}
                                    key={i}
                                    className="animate-reveal group p-8 lg:p-12 bg-soft-grey rounded-[2rem] border border-gray-100 hover:bg-white hover:border-royal-green/30 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                                    style={{ animationDelay: `${(i + 1) * 100}ms` }}
                                >
                                    <div className="w-14 h-14 lg:w-16 lg:h-16 shrink-0 bg-white rounded-2xl flex items-center justify-center text-royal-green mb-8 lg:mb-10 group-hover:bg-royal-green group-hover:text-white transition-all shadow-sm">
                                        {iconMap[service.iconName as keyof typeof iconMap] || <BarChart4 />}
                                    </div>
                                    <h3 className="text-xl lg:text-2xl mb-4 lg:mb-6 group-hover:text-royal-green transition-colors">{service.title}</h3>
                                    <p className="text-sm lg:text-base text-elegant-grey leading-relaxed mb-8 flex-grow">
                                        {service.shortDesc}
                                    </p>
                                    {service.focus && service.focus.length > 0 && (
                                        <div className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-gray-200">
                                            <h5 className="text-royal-green font-bold text-[10px] lg:text-xs uppercase tracking-[0.1em] mb-4">Core Focus Areas:</h5>
                                            <div className="flex flex-wrap gap-2">
                                                {service.focus.slice(0, 3).map((item, j) => (
                                                    <span key={j} className="px-3 py-1 bg-white rounded-full text-[10px] lg:text-[11px] font-bold text-charcoal-black border border-gray-200">{item}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className="mt-8 lg:mt-10">
                                        <Button variant="ghost" className="p-0 text-charcoal-black font-bold flex items-center gap-2 group-hover:gap-4 transition-all text-sm lg:text-base">
                                            Learn More <ChevronRight className="h-4 w-4 text-royal-green" />
                                        </Button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className="section-padding bg-soft-grey">
                <div className="max-content">
                    <div className="p-10 lg:p-24 bg-charcoal-black rounded-[2.5rem] lg:rounded-[4rem] text-white overflow-hidden relative shadow-2xl">
                        <div className="relative z-10 max-w-2xl animate-reveal">
                            <h2 className="text-white text-3xl lg:text-4xl mb-6 lg:mb-8 leading-tight">Ready to navigate your challenges with clarity?</h2>
                            <p className="text-white/60 mb-10 lg:mb-12 text-base lg:text-lg leading-relaxed">
                                Our team of experts is ready to help you navigate complex development challenges through strategy, evidence, and innovation.
                            </p>
                            <Link href="/contact">
                                <Button size="lg" className="w-full sm:w-auto bg-royal-green hover:bg-royal-green/90 rounded-full px-10 h-14 lg:h-16 font-bold">
                                    Get Started Today <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
