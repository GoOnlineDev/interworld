'use client';

import { Button } from '@/components/ui/button';
import {
    Zap,
    Sprout,
    TrendingUp,
    ChevronRight,
    Loader2
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const iconMap = {
    Zap: <Zap className="h-full w-full p-4 lg:p-6" />,
    Sprout: <Sprout className="h-full w-full p-4 lg:p-6" />,
    TrendingUp: <TrendingUp className="h-full w-full p-4 lg:p-6" />
};

export default function ProjectsPage() {
    const projects = useQuery(api.projects.getAll);
    const publishedProjects = projects?.filter(p => p.isPublished) || [];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-soft-grey relative overflow-hidden">
                <div className="max-content relative z-10">
                    <div className="max-w-4xl animate-reveal">
                        <span className="text-royal-green font-bold uppercase tracking-[0.2em] text-xs lg:text-sm mb-6 block underline underline-offset-8">Projects</span>
                        <h1 className="mb-6 lg:mb-8 font-serif">Transforming Bold Ideas into Market Realities</h1>
                        <p className="text-lg lg:text-body-large text-charcoal-black/80 max-w-2xl leading-relaxed">
                            Interworld promotes awareness, builds markets, and develops practical pathways for sustainable innovations that solve real-world problems.
                        </p>
                    </div>
                </div>
            </section>

            {/* Project Grid */}
            <section className="section-padding">
                <div className="max-content">
                    {!projects ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-royal-green" />
                        </div>
                    ) : publishedProjects.length === 0 ? (
                        <div className="text-center py-20 text-elegant-grey">
                            No projects to display at the moment.
                        </div>
                    ) : (
                        <div className="space-y-20 lg:space-y-32">
                            {publishedProjects.map((project, i) => (
                                <div key={i} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center group animate-reveal" style={{ animationDelay: `${(i + 1) * 200}ms` }}>
                                    <div className={`${i % 2 === 1 ? 'lg:order-last' : ''} relative`}>
                                        <div className="relative aspect-video lg:aspect-[16/10] rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                        </div>
                                        {/* Icon Badge */}
                                        <div className={`absolute -bottom-6 lg:-bottom-10 ${i % 2 === 1 ? '-left-4 lg:-left-10' : '-right-4 lg:-right-10'} w-16 h-16 lg:w-24 lg:h-24 ${project.color || 'bg-royal-green'} text-white rounded-[1.5rem] lg:rounded-[2rem] flex items-center justify-center shadow-xl shadow-black/10 transition-transform group-hover:rotate-12 duration-500`}>
                                            {iconMap[project.iconName as keyof typeof iconMap] || <Zap className="h-full w-full p-4 lg:p-6" />}
                                        </div>
                                    </div>

                                    <div className="pt-8 lg:pt-0">
                                        <h2 className="text-3xl lg:text-4xl mb-6 lg:mb-8 leading-tight font-serif">{project.title}</h2>
                                        <p className="text-lg lg:text-body-large text-elegant-grey leading-relaxed mb-8 lg:mb-10">
                                            {project.shortDesc}
                                        </p>
                                        <Link href={`/projects/${project.slug}`}>
                                            <Button size="lg" className="w-full sm:w-auto rounded-full px-10 h-14 lg:h-16 bg-charcoal-black hover:bg-royal-green shadow-xl shadow-black/10 transition-all font-bold">
                                                Explore Initiative <ChevronRight className="h-4 w-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className="section-padding bg-charcoal-black text-white">
                <div className="max-content text-center">
                    <div className="animate-reveal">
                        <h2 className="text-white mb-8">Join us in accelerating the adoption of sustainable technologies across Uganda.</h2>
                        <p className="text-white/60 mb-12 text-lg">Partner with Interworld to drive innovation and impact in the region.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-6">
                            <Link href="/contact" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full bg-royal-green hover:bg-royal-green/90 rounded-full px-12 h-14 lg:h-16 font-bold shadow-2xl shadow-royal-green/20">
                                    Work With Us
                                </Button>
                            </Link>
                            <Link href="/contact" className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white hover:text-charcoal-black rounded-full px-12 h-14 lg:h-16 font-bold">
                                    Technical Inquiries
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
