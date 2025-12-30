'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Globe, ArrowRight } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-soft-grey">
                <div className="max-content">
                    <div className="max-w-4xl animate-reveal">
                        <span className="text-royal-green font-bold uppercase tracking-[0.2em] text-xs lg:text-sm mb-6 block underline underline-offset-8">Contact Us</span>
                        <h1 className="mb-6 lg:mb-8 font-serif leading-tight">Let’s build a future defined by innovation, knowledge, and purposeful action.</h1>
                        <p className="text-lg lg:text-body-large text-charcoal-black/80 max-w-2xl leading-relaxed">
                            Have a bold idea or want to partner with us? Reach out and let's turn vision into lasting impact.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section-padding">
                <div className="max-content">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                        <div className="animate-reveal">
                            <h2 className="mb-8 lg:mb-12">Contact Information</h2>
                            <div className="space-y-8 lg:space-y-10">
                                {[
                                    { icon: <Mail />, title: "Email Us", detail: "info@interworld.org", desc: "For general inquiries and partnerships." },
                                    { icon: <Phone />, title: "Call Us", detail: "+256 (0) 123 456 789", desc: "Mon-Fri from 8am to 5pm." },
                                    { icon: <MapPin />, title: "Visit Us", detail: "Kampala, Uganda", desc: "Headquarters and Innovation Hub." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 lg:gap-8 group">
                                        <div className="w-14 h-14 lg:w-16 lg:h-16 shrink-0 rounded-2xl bg-soft-grey flex items-center justify-center text-royal-green group-hover:bg-royal-green group-hover:text-white transition-all shadow-sm">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg lg:text-xl mb-1">{item.title}</h3>
                                            <p className="text-royal-green font-bold text-base lg:text-lg">{item.detail}</p>
                                            <p className="text-xs lg:text-sm text-elegant-grey mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 lg:mt-20 p-8 lg:p-12 bg-charcoal-black rounded-[2.5rem] lg:rounded-[3rem] text-white overflow-hidden relative shadow-2xl">
                                <div className="relative z-10">
                                    <h3 className="text-white text-2xl lg:text-3xl mb-4">Global Reach</h3>
                                    <p className="text-white/60 text-sm lg:text-base mb-10 leading-relaxed">
                                        While headquartered in Uganda, Interworld partners with visionary institutions worldwide to scale sustainable innovations.
                                    </p>
                                    <div className="flex items-center gap-2 font-bold hover:gap-4 transition-all cursor-pointer text-royal-green text-sm lg:text-base">
                                        Explore Partnership Opportunities <ArrowRight className="h-5 w-5" />
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 w-64 h-64 bg-royal-green/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                            </div>
                        </div>

                        <div className="animate-slide-reveal mt-12 lg:mt-0">
                            <Card className="p-8 lg:p-16 rounded-[2.5rem] lg:rounded-[4rem] shadow-2xl border border-gray-100 bg-white">
                                <CardContent className="p-0">
                                    <h2 className="text-3xl lg:text-4xl mb-8 lg:mb-10 leading-tight">Send a Message</h2>
                                    <form className="space-y-6 lg:space-y-8">
                                        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                                            <div className="space-y-2 lg:space-y-3">
                                                <label className="text-[10px] lg:text-xs font-bold text-charcoal-black uppercase tracking-widest">Full Name</label>
                                                <input type="text" className="w-full px-6 lg:px-8 py-4 lg:py-5 rounded-2xl bg-soft-grey border border-transparent focus:border-royal-green focus:bg-white outline-none transition-all text-sm lg:text-base" placeholder="John Doe" />
                                            </div>
                                            <div className="space-y-2 lg:space-y-3">
                                                <label className="text-[10px] lg:text-xs font-bold text-charcoal-black uppercase tracking-widest">Email Address</label>
                                                <input type="email" className="w-full px-6 lg:px-8 py-4 lg:py-5 rounded-2xl bg-soft-grey border border-transparent focus:border-royal-green focus:bg-white outline-none transition-all text-sm lg:text-base" placeholder="john@example.com" />
                                            </div>
                                        </div>
                                        <div className="space-y-2 lg:space-y-3">
                                            <label className="text-[10px] lg:text-xs font-bold text-charcoal-black uppercase tracking-widest">Subject</label>
                                            <input type="text" className="w-full px-6 lg:px-8 py-4 lg:py-5 rounded-2xl bg-soft-grey border border-transparent focus:border-royal-green focus:bg-white outline-none transition-all text-sm lg:text-base" placeholder="How can we help?" />
                                        </div>
                                        <div className="space-y-2 lg:space-y-3">
                                            <label className="text-[10px] lg:text-xs font-bold text-charcoal-black uppercase tracking-widest">Message</label>
                                            <textarea rows={5} className="w-full px-6 lg:px-8 py-4 lg:py-5 rounded-2xl bg-soft-grey border border-transparent focus:border-royal-green focus:bg-white outline-none transition-all resize-none text-sm lg:text-base" placeholder="Tell us about your project..."></textarea>
                                        </div>
                                        <Button className="w-full h-16 lg:h-20 rounded-2xl text-base lg:text-lg font-bold bg-charcoal-black hover:bg-royal-green shadow-2xl shadow-black/10 transition-all">
                                            Send Message
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
