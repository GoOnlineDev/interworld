import { SERVICES } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, Globe, Target } from 'lucide-react';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const service = SERVICES.find(s => s.slug === slug);

    if (!service) {
        notFound();
    }

    return (
        <div className="bg-white">
            {/* Header Section */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-soft-grey border-b border-gray-100">
                <div className="max-content">
                    <Link href="/services" className="text-elegant-grey hover:text-royal-green flex items-center gap-2 mb-8 lg:mb-10 transition-colors group text-sm font-bold uppercase tracking-widest">
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Services
                    </Link>
                    <div className="max-w-4xl animate-reveal">
                        <span className="text-royal-green font-bold uppercase tracking-widest text-[10px] lg:text-xs mb-6 block">Service Expertise</span>
                        <h1 className="mb-6 lg:mb-8 font-serif leading-tight">{service.title}</h1>
                        <p className="text-lg lg:text-body-large text-elegant-grey max-w-2xl leading-relaxed">
                            {service.shortDesc}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="section-padding">
                <div className="max-content">
                    <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
                        {/* Main Detail */}
                        <div className="lg:col-span-2 space-y-12 lg:space-y-16 animate-reveal">
                            <div>
                                <h2 className="text-2xl lg:text-3xl mb-6 lg:mb-8 font-serif">How We Deliver Value</h2>
                                <p className="text-base lg:text-lg text-elegant-grey leading-relaxed">
                                    {service.fullDesc}
                                </p>
                            </div>

                            {service.focus && (
                                <div className="p-8 lg:p-12 bg-charcoal-black text-white rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h3 className="text-white text-xl lg:text-2xl mb-8 lg:mb-10 flex items-center gap-3 font-bold uppercase tracking-widest">
                                            <Target className="h-6 w-6 lg:h-8 lg:h-8 text-royal-green" /> Core Focus Areas
                                        </h3>
                                        <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                                            {service.focus.map((item, i) => (
                                                <div key={i} className="flex gap-4 items-center p-4 bg-white/5 rounded-xl border border-white/10">
                                                    <CheckCircle2 className="h-5 w-5 text-royal-green" />
                                                    <span className="font-bold text-white/90 text-sm lg:text-base">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-royal-green/10 rounded-full blur-3xl -mr-32 -mt-32" />
                                </div>
                            )}

                            <div>
                                <h3 className="text-xl lg:text-2xl mb-6 font-serif">Our Methodology</h3>
                                <p className="text-base lg:text-lg text-elegant-grey leading-relaxed">
                                    We employ a multi-disciplinary approach that integrates technical expertise with deep contextual understanding. Whether it's institutional governance or climate resilience, our methodology is always evidence-based, collaborative, and designed for long-term sustainability.
                                </p>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="animate-slide-reveal mt-12 lg:mt-0">
                            <div className="lg:sticky lg:top-32 space-y-8 lg:space-y-12">
                                <div className="p-8 lg:p-10 bg-soft-grey rounded-[2.5rem] border border-gray-100">
                                    <h4 className="mb-6 lg:mb-8 text-charcoal-black font-bold uppercase tracking-widest text-xs">Global Standards</h4>
                                    <div className="space-y-6">
                                        <div className="flex gap-4 items-start">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-royal-green shadow-sm shrink-0">
                                                <Globe className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">International Best Practice</p>
                                                <p className="text-xs text-elegant-grey mt-1">Aligned with UN and AU development frameworks.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-start">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-royal-green shadow-sm shrink-0">
                                                <MapPin className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">Contextual Accuracy</p>
                                                <p className="text-xs text-elegant-grey mt-1">Deep roots in African socio-economic realities.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-10 lg:p-12 bg-royal-green text-white rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl text-center relative overflow-hidden">
                                    <h3 className="text-white text-2xl lg:text-3xl mb-6 relative z-10">Need Expert Advice?</h3>
                                    <p className="text-white/80 text-sm mb-10 leading-relaxed relative z-10">
                                        Schedule a consultation with our senior advisory team to discuss your specific needs.
                                    </p>
                                    <Link href="/contact" className="block relative z-10">
                                        <Button className="w-full h-16 bg-white text-royal-green hover:bg-white/90 rounded-full font-bold shadow-xl">
                                            Book a Consultation
                                        </Button>
                                    </Link>
                                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -ml-16 -mt-16" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
