"use client";

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Save,
    Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Id } from '@/convex/_generated/dataModel';

interface FAQFormProps {
    initialData?: {
        _id?: Id<"faqs">;
        question: string;
        answer: string;
        category: string;
        isPublished: boolean;
    };
    isEdit?: boolean;
}

const CATEGORIES = [
    "General",
    "Services",
    "Partnership",
    "Impact",
    "Support"
];

export default function FAQForm({ initialData, isEdit = false }: FAQFormProps) {
    const router = useRouter();
    const createFAQ = useMutation(api.faqs.create);
    const updateFAQ = useMutation(api.faqs.update);
    const removeFAQ = useMutation(api.faqs.remove);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        question: initialData?.question || '',
        answer: initialData?.answer || '',
        category: initialData?.category || 'General',
        isPublished: initialData?.isPublished || false,
    });

    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (isEdit && initialData?._id) {
                await updateFAQ({
                    id: initialData._id,
                    ...formData,
                });
            } else {
                await createFAQ(formData);
            }
            router.push('/admin/faqs');
        } catch (error) {
            console.error('Failed to save FAQ:', error);
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!initialData?._id) return;
        setIsSubmitting(true);
        try {
            await removeFAQ({ id: initialData._id });
            router.push('/admin/faqs');
        } catch (error) {
            console.error('Failed to delete:', error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/faqs"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-charcoal-black">
                            {isEdit ? 'Edit FAQ' : 'New FAQ'}
                        </h1>
                        <p className="text-sm text-elegant-grey">
                            {isEdit ? 'Edit frequently asked question' : 'Create new FAQ'}
                        </p>
                    </div>
                </div>

                {isEdit && (
                    <div className="relative">
                        {!deleteConfirm ? (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setDeleteConfirm(true)}
                                className="text-red-600 hover:bg-red-50 border-red-200"
                            >
                                <Trash2 className="h-4 w-4 mr-2" /> Delete FAQ
                            </Button>
                        ) : (
                            <div className="flex gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={handleDelete}
                                    disabled={isSubmitting}
                                >
                                    Confirm Delete
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setDeleteConfirm(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
                    <h2 className="text-lg font-bold text-charcoal-black mb-6">Question & Answer</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-charcoal-black mb-2">
                                Question *
                            </label>
                            <input
                                type="text"
                                value={formData.question}
                                onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-royal-green focus:ring-2 focus:ring-royal-green/10 outline-none transition-all"
                                placeholder="What is..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-charcoal-black mb-2">
                                Category *
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-royal-green focus:ring-2 focus:ring-royal-green/10 outline-none transition-all"
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-charcoal-black mb-2">
                                Answer *
                            </label>
                            <textarea
                                value={formData.answer}
                                onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-royal-green focus:ring-2 focus:ring-royal-green/10 outline-none transition-all resize-none"
                                placeholder="Enter the detailed answer..."
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
                    <h2 className="text-lg font-bold text-charcoal-black mb-6">Publishing</h2>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.isPublished}
                            onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                            className="w-5 h-5 rounded border-gray-300 text-royal-green focus:ring-royal-green"
                        />
                        <div>
                            <div className="font-semibold text-charcoal-black">Visible on website</div>
                        </div>
                    </label>
                </div>

                <div className="flex items-center justify-end gap-4">
                    <Link href="/admin/faqs">
                        <Button type="button" variant="outline" className="rounded-xl h-12 px-6">
                            Cancel
                        </Button>
                    </Link>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-royal-green hover:bg-royal-green/90 rounded-xl h-12 px-8 shadow-lg shadow-royal-green/20"
                    >
                        {isSubmitting ? 'Saving...' : (
                            <>
                                <Save className="h-5 w-5 mr-2" /> {isEdit ? 'Update FAQ' : 'Create FAQ'}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
