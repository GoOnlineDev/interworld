'use client';

import { useState } from 'react';
import { FAQS } from '@/lib/data';
import { Plus, Minus, Search, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const filteredFaqs = FAQS.map(category => ({
        ...category,
        items: category.items.filter(item =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(category => category.items.length > 0);

    const toggleFaq = (index: string) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-soft-grey">
                <div className="max-content">
                    <div className="max-w-4xl animate-reveal">
                        <span className="text-royal-green font-bold uppercase tracking-[0.2em] text-xs lg:text-sm mb-6 block underline underline-offset-8">Support Center</span>
                        <h1 className="mb-6 lg:mb-8 font-serif">Frequently Asked Questions</h1>
                        <p className="text-lg lg:text-body-large text-charcoal-black/80 max-w-2xl leading-relaxed">
                            Find answers to common questions about our methodology, services, and how we drive sustainable impact across East Africa.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mt-12 relative animate-slide-reveal">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-elegant-grey" />
                        <input
                            type="text"
                            placeholder="Search questions or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-16 pl-16 pr-8 bg-white rounded-full border border-gray-200 outline-none focus:border-royal-green focus:ring-4 focus:ring-royal-green/5 transition-all shadow-sm font-medium"
                        />
                    </div>
                </div>
            </section>

            {/* FAQ List */}
            <section className="section-padding">
                <div className="max-content max-w-4xl">
                    {filteredFaqs.length > 0 ? (
                        <div className="space-y-16">
                            {filteredFaqs.map((category, catIdx) => (
                                <div key={catIdx} className="animate-reveal">
                                    <h2 className="text-2xl font-serif mb-8 text-charcoal-black">{category.category}</h2>
                                    <div className="space-y-4">
                                        {category.items.map((item, itemIdx) => {
                                            const id = `${catIdx}-${itemIdx}`;
                                            const isOpen = openIndex === id;
                                            return (
                                                <div
                                                    key={itemIdx}
                                                    className={`group border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-soft-grey ring-1 ring-royal-green/10' : 'bg-white hover:border-royal-green/20'}`}
                                                >
                                                    <button
                                                        onClick={() => toggleFaq(id)}
                                                        className="w-full flex items-center justify-between p-6 lg:p-8 text-left"
                                                    >
                                                        <span className={`text-lg lg:text-xl font-bold transition-colors ${isOpen ? 'text-royal-green' : 'text-charcoal-black group-hover:text-royal-green'}`}>
                                                            {item.question}
                                                        </span>
                                                        <div className={`shrink-0 ml-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-royal-green text-white rotate-180' : 'bg-soft-grey text-elegant-grey group-hover:bg-royal-green/10 group-hover:text-royal-green'}`}>
                                                            {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                                                        </div>
                                                    </button>
                                                    <div
                                                        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                                                    >
                                                        <div className="px-6 pb-8 lg:px-8 lg:pb-10">
                                                            <div className="pt-4 border-t border-gray-200/50">
                                                                <p className="text-elegant-grey leading-relaxed text-lg">
                                                                    {item.answer}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 animate-reveal">
                            <div className="w-20 h-20 bg-soft-grey rounded-full flex items-center justify-center mx-auto mb-6 text-elegant-grey">
                                <Search className="h-8 w-8" />
                            </div>
                            <h3 className="mb-4">No results found</h3>
                            <p className="text-elegant-grey">We couldn't find any questions matching "{searchQuery}". Try a different keyword.</p>
                            <Button
                                variant="outline"
                                className="mt-8 rounded-full"
                                onClick={() => setSearchQuery('')}
                            >
                                Clear Search
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-charcoal-black py-24 relative overflow-hidden">
                <div className="max-content relative z-10 text-center">
                    <h2 className="text-white mb-6">Still have questions?</h2>
                    <p className="text-white/60 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
                        Can't find the answer you're looking for? Reach out to our team and we'll be happy to help you with your inquiry.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/contact">
                            <Button className="h-16 px-10 bg-royal-green hover:bg-royal-green/90 rounded-full font-bold shadow-xl">
                                <MessageCircle className="h-5 w-5 mr-3" /> Contact Support Team
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-green/10 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-royal-green/5 rounded-full blur-[100px] -ml-64 -mb-64" />
            </section>
        </div>
    );
}
