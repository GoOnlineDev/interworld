'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Maximize2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const categories = ['All', 'Projects', 'Events', 'Team'];

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedImage, setSelectedImage] = useState<any | null>(null);

    const galleryItems = useQuery(api.gallery.getAll);
    const publishedGallery = galleryItems?.filter(item => item.isPublished) || [];

    const filteredItems = publishedGallery.filter(item =>
        activeCategory === 'All' || item.category === activeCategory
    );

    return (
        <div className="bg-white min-h-screen pb-32">
            {/* Hero Section */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-soft-grey">
                <div className="max-content">
                    <div className="max-w-4xl animate-reveal">
                        <span className="text-royal-green font-bold uppercase tracking-[0.2em] text-xs lg:text-sm mb-6 block underline underline-offset-8">Visual Journey</span>
                        <h1 className="mb-6 lg:mb-8 font-serif">Our Impact in Pictures</h1>
                        <p className="text-lg lg:text-body-large text-charcoal-black/80 max-w-2xl leading-relaxed">
                            A curated collection of moments from our field work, community workshops, and team collaborations across the region.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3 mt-12 animate-slide-reveal">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={activeCategory === category ? 'default' : 'outline'}
                                onClick={() => setActiveCategory(category)}
                                className={`rounded-full h-12 px-8 font-bold transition-all ${activeCategory === category
                                    ? 'bg-royal-green text-white shadow-lg shadow-royal-green/20'
                                    : 'border-gray-200 text-elegant-grey hover:border-royal-green hover:text-royal-green'
                                    }`}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="section-padding">
                <div className="max-content">
                    {!galleryItems ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-royal-green" />
                        </div>
                    ) : (
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8 animate-reveal">
                            {filteredItems.map((item, i) => (
                                <div
                                    key={item._id}
                                    className="break-inside-avoid group relative rounded-[2rem] overflow-hidden bg-soft-grey cursor-zoom-in group shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
                                    onClick={() => setSelectedImage(item)}
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-royal-green mb-2 block p-1.5 bg-white/10 backdrop-blur-md rounded w-fit">
                                                    {item.category}
                                                </span>
                                                <h4 className="text-white mb-2">{item.title}</h4>
                                                <p className="text-white/70 text-sm leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <Maximize2 className="h-5 w-5" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {galleryItems && filteredItems.length === 0 && (
                        <div className="text-center py-32 animate-reveal">
                            <p className="text-elegant-grey text-lg">No items found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] bg-charcoal-black/95 backdrop-blur-xl flex items-center justify-center p-6 lg:p-12 transition-all animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-8 right-8 w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors z-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className="h-6 w-6" />
                    </button>

                    <div
                        className="relative w-full max-w-6xl max-h-full aspect-[16/9] animate-in zoom-in-95 duration-500"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage.image}
                            alt={selectedImage.title}
                            fill
                            className="object-contain"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-center pointer-events-none">
                            <div className="inline-block bg-black/40 backdrop-blur-sm p-4 rounded-xl pointer-events-auto">
                                <span className="text-royal-green font-bold uppercase tracking-widest text-xs mb-4 block">
                                    {selectedImage.category}
                                </span>
                                <h2 className="text-white mb-4 text-3xl lg:text-4xl">{selectedImage.title}</h2>
                                <p className="text-white/80 max-w-2xl mx-auto text-lg">
                                    {selectedImage.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
