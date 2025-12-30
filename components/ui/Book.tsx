'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageProps {
    title?: string;
    content: React.ReactNode;
    pageNumber: number;
}

const BookPage = ({ title, content, pageNumber }: PageProps) => {
    return (
        <div className="page-content bg-white border-l border-gray-100">
            <div className="flex flex-col h-full">
                {title && (
                    <h2 className="text-3xl font-serif font-bold text-[#111111] mb-6 border-b-2 border-[#007F5F] pb-2">
                        {title}
                    </h2>
                )}
                <div className="flex-1 text-gray-700 leading-relaxed text-lg">
                    {content}
                </div>
                <div className="mt-8 text-sm text-gray-400 font-medium text-center">
                    — {pageNumber} —
                </div>
            </div>
        </div>
    );
};

export default function Book({ pages }: { pages: { title?: string; content: React.ReactNode }[] }) {
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = pages.length;
    const totalSpreads = Math.ceil(totalPages / 2);

    const nextPage = () => {
        if (currentPage < totalSpreads - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 py-12">
            <div className="book-container">
                <div className="book shadow-2xl rounded-sm overflow-hidden bg-gray-50">
                    {/* Left Page (Static for current spread or animated) */}
                    <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-white">
                        {/* This is a simplified version; real animation would be more complex */}
                    </div>

                    {pages.map((page, index) => {
                        const spreadIndex = Math.floor(index / 2);
                        const isLeft = index % 2 === 0;
                        const isVisible = spreadIndex === currentPage;

                        if (!isVisible) return null;

                        return (
                            <div
                                key={index}
                                className={`absolute top-0 h-full w-1/2 bg-white ${isLeft ? 'left-0' : 'left-1/2'}`}
                            >
                                <BookPage
                                    title={page.title}
                                    content={page.content}
                                    pageNumber={index + 1}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className="rounded-full h-12 w-12 p-0"
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <span className="text-sm font-medium text-gray-600">
                    Spread {currentPage + 1} of {totalSpreads}
                </span>
                <Button
                    variant="outline"
                    onClick={nextPage}
                    disabled={currentPage === totalSpreads - 1}
                    className="rounded-full h-12 w-12 p-0"
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>
        </div>
    );
}
