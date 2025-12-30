'use client';

import { Button } from '@/components/ui/button';
import {
    ChevronRight,
    ArrowRight,
    BookOpen,
    ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Users,
    Search,
    BarChart4,
    FileText,
    GraduationCap,
    PenTool,
    ShieldCheck,
    Award,
    Lightbulb,
    Zap,
    Briefcase,
    Globe,
    Sprout,
    TrendingUp
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const iconMap = {
    Users: <Users className="h-6 w-6" />,
    Search: <Search className="h-6 w-6" />,
    BarChart4: <BarChart4 className="h-6 w-6" />,
    FileText: <FileText className="h-6 w-6" />,
    GraduationCap: <GraduationCap className="h-6 w-6" />,
    PenTool: <PenTool className="h-6 w-6" />,
    BookOpen: <BookOpen className="h-6 w-6" />,
    ShieldCheck: <ShieldCheck className="h-6 w-6" />,
    Award: <Award className="h-6 w-6" />,
    Lightbulb: <Lightbulb className="h-6 w-6" />,
    Zap: <Zap className="h-6 w-6" />,
    Briefcase: <Briefcase className="h-6 w-6" />,
    Globe: <Globe className="h-6 w-6" />,
    Sprout: <Sprout className="h-6 w-6" />,
    TrendingUp: <TrendingUp className="h-6 w-6" />,
};

// Pillars usually remain static as core identity
const PILLARS = [
    {
        title: "Innovation",
        desc: "Pioneering new solutions.",
        icon: "Lightbulb"
    },
    {
        title: "Excellence",
        desc: "Delivering world-class quality.",
        icon: "Award"
    },
    {
        title: "Integrity",
        desc: "Upholding highest standards.",
        icon: "ShieldCheck"
    },
    {
        title: "Collaboration",
        desc: "Working together for impact.",
        icon: "Users"
    }
];

const HERO_SLIDES = [
    {
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80",
        title: "Transforming Vision into Lasting Impact",
        desc: "We are a purpose-driven institution turning bold ideas into practical solutions that strengthen communities, empower industries, and shape a sustainable future.",
        badge: "Our Mission"
    },
    {
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80",
        title: "Innovating for a Greener Tomorrow",
        desc: "Bridging the gap between scientific insight and practical action to restore soil health and promote sustainable agriculture across the region.",
        badge: "Sustainability"
    },
    {
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
        title: "Knowledge Powered by Collaboration",
        desc: "We partner with visionary institutions worldwide to co-create solutions that scale, endure, and transform the landscapes of innovation.",
        badge: "Research & Development"
    },
    {
        image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80",
        title: "Empowering Local Communities",
        desc: "Strengthening systems and fostering resilience through evidence-based insights that directly respond to real-world needs.",
        badge: "Social Impact"
    }
];

export default function HomePage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Fetch data from Convex
    const services = useQuery(api.services.getAll);
    const projects = useQuery(api.projects.getAll);
    const publications = useQuery(api.publications.getAll);
    const partners = useQuery(api.partners.getAll);

    // Filter for published items and take slices
    const featuredServices = services?.filter(s => s.isPublished).slice(0, 8) || [];
    const featuredProjects = projects?.filter(p => p.isPublished).slice(0, 3) || [];
    const recentPublications = publications?.filter(p => p.isPublished).slice(0, 3) || [];
    const displayedPartners = partners?.filter(p => p.isPublished) || [];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

    return (
        <div className="bg-white">
            {/* Hero Section with Carousel */}
            <section className="relative h-screen flex items-center overflow-hidden bg-charcoal-black">
                {/* Carousel Slides */}
                {HERO_SLIDES.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        {/* Background Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-black/90 via-charcoal-black/40 to-transparent z-20" />
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className={`object-cover transition-transform duration-[10000ms] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'}`}
                            priority={index === 0}
                        />

                        <div className="max-content relative z-30 h-full flex flex-col justify-center">
                            <div className={`max-w-4xl transition-all duration-1000 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                                <span className="bg-royal-green backdrop-blur-md border border-white/20 text-white font-bold uppercase tracking-[0.3em] text-[10px] sm:text-xs px-5 py-2 lg:px-6 lg:py-2.5 rounded-full mb-6 lg:mb-8 inline-block shadow-xl">
                                    {slide.badge}
                                </span>
                                <h1 className="!text-white mb-6 lg:mb-8 leading-[1.1] drop-shadow-2xl">
                                    {slide.title}
                                </h1>
                                <p className="text-white/90 text-lg lg:text-body-large mb-8 lg:mb-12 max-w-2xl leading-relaxed drop-shadow-lg">
                                    {slide.desc}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                                    <Link href="/projects" className="w-full sm:w-auto">
                                        <Button size="lg" className="w-full bg-royal-green hover:bg-royal-green/90 text-white rounded-full px-10 h-14 lg:h-16 text-base lg:text-lg font-semibold tracking-wide shadow-xl shadow-royal-green/20">
                                            Explore Our Work
                                        </Button>
                                    </Link>
                                    <Link href="/contact" className="w-full sm:w-auto">
                                        <Button size="lg" variant="outline" className="w-full border-2 border-white text-white hover:bg-white hover:text-charcoal-black rounded-full px-10 h-14 lg:h-16 text-base lg:text-lg font-semibold transition-all">
                                            Partner With Us
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="absolute bottom-6 left-6 right-6 z-40 flex items-center justify-between lg:bottom-12 lg:right-12 lg:left-auto lg:justify-end gap-4">
                    <div className="flex gap-4">
                        <button
                            onClick={prevSlide}
                            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/20 text-white hover:bg-white hover:text-charcoal-black transition-all flex items-center justify-center backdrop-blur-sm"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/20 text-white hover:bg-white hover:text-charcoal-black transition-all flex items-center justify-center backdrop-blur-sm"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
                        </button>
                    </div>
                    <div className="h-1 w-24 lg:w-32 bg-white/20 rounded-full relative overflow-hidden">
                        <div
                            key={`progress-${currentSlide}`}
                            className="absolute inset-y-0 left-0 bg-royal-green animate-[progress_6s_linear]"
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                <style jsx>{`
                    @keyframes progress {
                        from { transform: translateX(-100%); }
                        to { transform: translateX(0%); }
                    }
                `}</style>
            </section>

            {/* Who We Are Summary */}
            <section className="section-padding bg-soft-grey">
                <div className="max-content">
                    <div className="two-column-grid gap-20 items-center">
                        <div className="animate-reveal">
                            <span className="text-royal-green font-bold uppercase tracking-[0.2em] text-sm mb-6 block">Who We Are</span>
                            <p className="text-body-large text-charcoal-black font-medium leading-relaxed italic">
                                “Interworld is a bold, visionary African institution dedicated to transforming knowledge into action and ideas into lasting impact. We combine research, innovation, creativity, and collaboration to design solutions that solve real problems, strengthen systems, and inspire sustainable progress.”
                            </p>
                        </div>
                        <div className="animate-slide-reveal">
                            <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80"
                                    alt="Research and Collaboration"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Identity Pillars */}
            <section className="section-padding border-b border-gray-100">
                <div className="max-content">
                    <h2 className="text-center mb-20 animate-reveal">Our Identity Pillars</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {PILLARS.map((pillar, i) => (
                            <div key={i} className="animate-reveal text-center group" style={{ animationDelay: `${(i + 1) * 150}ms` }}>
                                <div className="w-20 h-20 bg-soft-grey rounded-2xl flex items-center justify-center text-royal-green mx-auto mb-8 transition-all group-hover:bg-royal-green group-hover:text-white group-hover:-translate-y-2 shadow-sm">
                                    {iconMap[pillar.icon as keyof typeof iconMap] || <Lightbulb />}
                                </div>
                                <h3 className="text-2xl mb-4">{pillar.title}</h3>
                                <p className="text-elegant-grey leading-relaxed">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Do - Snapshot */}
            <section className="section-padding bg-charcoal-black text-white">
                <div className="max-content">
                    <div className="flex justify-between items-end mb-20 animate-reveal">
                        <div>
                            <span className="text-royal-green font-bold uppercase tracking-[0.2em] text-sm mb-6 block">What We Do</span>
                            <h2 className="text-white">A Snapshot of Our Expertise</h2>
                        </div>
                        <Link href="/services" className="text-royal-green flex items-center gap-2 font-bold hover:gap-4 transition-all mb-4">
                            View All Services <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredServices.map((service, i) => (
                            <Link
                                href={`/services/${service.slug}`}
                                key={i}
                                className="animate-reveal bg-white/5 border border-white/10 p-8 rounded-xl hover:bg-white/10 transition-all cursor-pointer group"
                                style={{ animationDelay: `${(i + 1) * 100}ms` }}
                            >
                                <div className="text-royal-green mb-6 group-hover:scale-110 transition-transform">
                                    {iconMap[service.iconName as keyof typeof iconMap] || <BarChart4 />}
                                </div>
                                <h4 className="text-lg font-semibold leading-tight">{service.title}</h4>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Projects Slider */}
            <section className="section-padding bg-soft-grey overflow-hidden">
                <div className="max-content">
                    <h2 className="mb-20 animate-reveal">Featured Projects</h2>
                    <div className="grid lg:grid-cols-3 gap-10">
                        {featuredProjects.map((project, i) => (
                            <div key={i} className="animate-reveal bg-white rounded-[2rem] overflow-hidden shadow-lg group hover:-translate-y-2 transition-all duration-500" style={{ animationDelay: `${(i + 1) * 200}ms` }}>
                                <div className="h-64 relative overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                </div>
                                <div className="p-10">
                                    <h3 className="text-2xl mb-4">{project.title}</h3>
                                    <p className="text-elegant-grey mb-8 line-clamp-2">{project.shortDesc}</p>
                                    <Link href={`/projects/${project.slug}`}>
                                        <Button variant="ghost" className="p-0 text-royal-green font-bold flex items-center gap-2 hover:gap-4 transition-all">
                                            Learn More <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    {featuredProjects.length === 0 && (
                        <div className="text-center text-gray-500 py-10">No projects to display yet.</div>
                    )}
                    <div className="mt-16 text-center animate-reveal">
                        <Link href="/projects">
                            <Button variant="outline" className="rounded-full px-12 h-14 border-charcoal-black hover:bg-charcoal-black hover:text-white transition-all text-lg font-semibold">
                                View All Projects
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Publications Snapshot */}
            <section className="section-padding">
                <div className="max-content">
                    <div className="flex justify-between items-end mb-20 animate-reveal">
                        <div>
                            <span className="text-royal-green font-bold uppercase tracking-[0.2em] text-sm mb-6 block">Publications</span>
                            <h2>Knowledge Products</h2>
                        </div>
                        <Link href="/publications" className="text-royal-green flex items-center gap-2 font-bold hover:gap-4 transition-all mb-4">
                            View More <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {recentPublications.map((pub, i) => (
                            <Link
                                href={`/publications/${pub.slug}`}
                                key={i}
                                className="animate-reveal group cursor-pointer"
                                style={{ animationDelay: `${(i + 1) * 150}ms` }}
                            >
                                <div className="aspect-[3/4] bg-soft-grey rounded-2xl mb-8 border border-gray-100 group-hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                                    <Image
                                        src={pub.cover}
                                        alt={pub.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                    <div className="absolute top-6 left-6 px-4 py-2 bg-white rounded-lg text-[10px] font-bold text-royal-green uppercase tracking-widest shadow-sm">
                                        {pub.category}
                                    </div>
                                </div>
                                <h4 className="text-xl mb-3 group-hover:text-royal-green transition-colors">{pub.title}</h4>
                                <p className="text-elegant-grey text-sm mb-6 line-clamp-2">{pub.summary}</p>
                                <div className="text-royal-green font-bold flex items-center gap-2 group-hover:gap-4 transition-all uppercase text-xs tracking-widest">
                                    Learn More <ChevronRight className="h-4 w-4" />
                                </div>
                            </Link>
                        ))}
                    </div>
                    {recentPublications.length === 0 && (
                        <div className="text-center text-gray-500 py-10">No publications to display yet.</div>
                    )}
                </div>
            </section>

            {/* Partners Strip */}
            <section className="py-20 border-y border-gray-100">
                <div className="max-content">
                    <h4 className="text-center text-elegant-grey uppercase tracking-[0.3em] text-xs mb-12">Our Trusted Partners</h4>
                    <div className="flex flex-wrap justify-center items-center gap-16 lg:gap-24">
                        {displayedPartners.map((partner, i) => (
                            <div key={i} className="opacity-50 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 cursor-default">
                                {partner.logo ? (
                                    <div className="relative h-12 w-32">
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                ) : (
                                    <span className="text-xl font-bold">{partner.name}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="section-padding bg-royal-green text-white relative overflow-hidden">
                <div className="max-content relative z-10 text-center">
                    <h2 className="text-white mb-8 animate-reveal">Join Us in Transforming the Future</h2>
                    <p className="text-white/90 text-body-large mb-12 max-w-3xl mx-auto leading-relaxed animate-reveal delay-100">
                        Work with us to create a world where ideas are applied with purpose and knowledge drives meaningful action.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="bg-white text-royal-green hover:bg-white/90 rounded-full px-12 h-16 text-lg font-bold shadow-2xl animate-reveal delay-200">
                            Become a Partner
                        </Button>
                    </Link>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48 blur-3xl" />
            </section>
        </div>
    );
}
