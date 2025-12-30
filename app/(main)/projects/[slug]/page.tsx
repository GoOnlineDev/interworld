import { PROJECTS } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const project = PROJECTS.find(p => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] lg:h-[70vh] flex items-end pb-12 lg:pb-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-black via-charcoal-black/40 to-transparent z-10" />
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="max-content relative z-20 w-full">
                    <Link href="/projects" className="text-white/60 hover:text-white flex items-center gap-2 mb-6 lg:mb-8 transition-colors group text-sm font-bold uppercase tracking-widest">
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Projects
                    </Link>
                    <div className="max-w-4xl animate-reveal">
                        <h1 className="!text-white mb-6 lg:mb-8 underline underline-offset-[12px] decoration-royal-green/50 leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-white/80 text-lg lg:text-body-large max-w-2xl leading-relaxed">
                            {project.shortDesc}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="section-padding">
                <div className="max-content">
                    <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
                        {/* Main Text */}
                        <div className="lg:col-span-2 space-y-12 lg:space-y-16 animate-reveal">
                            <div>
                                <h2 className="text-2xl lg:text-3xl mb-6 lg:mb-8 font-serif leading-tight">Overcoming Challenges through Innovation</h2>
                                <p className="text-base lg:text-lg text-elegant-grey leading-relaxed whitespace-pre-line">
                                    {project.fullDesc}
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                                <div className="p-8 lg:p-10 bg-soft-grey rounded-[2rem] border border-gray-100">
                                    <h4 className="mb-6 text-charcoal-black font-bold uppercase tracking-widest text-xs">Key Objectives</h4>
                                    <ul className="space-y-4">
                                        {["Systemic Transformation", "Sustainable Scalability", "Community Empowerment"].map((item, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-elegant-grey font-medium">
                                                <CheckCircle2 className="h-4 w-4 text-royal-green shrink-0 mt-0.5" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-8 lg:p-10 bg-royal-green/5 rounded-[2rem] border border-royal-green/10">
                                    <h4 className="mb-6 text-royal-green font-bold uppercase tracking-widest text-xs">Future Outlook</h4>
                                    <p className="text-sm lg:text-base text-elegant-grey leading-relaxed">
                                        We are committed to scaling this initiative across the African continent, bringing sustainable technology to every industry.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Stats & CTA */}
                        <div className="animate-slide-reveal mt-12 lg:mt-0">
                            <div className="lg:sticky lg:top-32 space-y-8 lg:space-y-12">
                                <div className="bg-charcoal-black text-white p-10 lg:p-12 rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl relative overflow-hidden">
                                    <h3 className="text-white text-xl lg:text-2xl mb-8 lg:mb-10 font-bold uppercase tracking-widest">Impact Metrics</h3>
                                    <div className="space-y-6 lg:space-y-8 relative z-10">
                                        {project.stats.map((stat, i) => (
                                            <div key={i} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                                                <div className="text-3xl lg:text-4xl font-serif text-royal-green mb-1">{stat.value}</div>
                                                <div className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-white/40">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-royal-green/10 rounded-full blur-3xl -mr-16 -mt-16" />
                                </div>

                                <div className="p-10 lg:p-12 bg-soft-grey rounded-[2.5rem] lg:rounded-[3rem] border border-gray-100 text-center">
                                    <h4 className="text-lg lg:text-xl mb-4 font-serif">Interested in this initiative?</h4>
                                    <p className="text-sm text-elegant-grey mb-8">Let's talk about how we can partner to scale this impact.</p>
                                    <Link href="/contact" className="block">
                                        <Button className="w-full h-14 lg:h-16 bg-royal-green hover:bg-royal-green/90 rounded-full font-bold shadow-xl">
                                            Contact Us <ArrowRight className="h-4 w-4 ml-2" />
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
