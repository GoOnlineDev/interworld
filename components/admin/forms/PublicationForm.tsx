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
import FileUpload from '@/components/admin/FileUpload';

const CATEGORIES = [
    "Books",
    "Reports",
    "Policy Briefs",
    "Journals",
    "Academic Papers",
    "Knowledge Products"
];

const ICONS = [
    "FileText",
    "BookOpen",
    "ScrollText",
    "GraduationCap",
    "BarChart"
];

interface PublicationFormProps {
    initialData?: {
        _id?: Id<"publications">;
        title: string;
        slug: string;
        category: string;
        summary: string;
        fullDetails: string;
        cover: string;
        pdfUrl?: string;
        iconName: string;
        language?: string;
        isPublished: boolean;
        publishedAt?: number;
    };
    isEdit?: boolean;
}

export default function PublicationForm({ initialData, isEdit = false }: PublicationFormProps) {
    const router = useRouter();
    const createPublication = useMutation(api.publications.create);
    const updatePublication = useMutation(api.publications.update);
    const removePublication = useMutation(api.publications.remove);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        category: initialData?.category || 'Reports',
        summary: initialData?.summary || '',
        fullDetails: initialData?.fullDetails || '',
        cover: initialData?.cover || '',
        pdfUrl: initialData?.pdfUrl || '',
        iconName: initialData?.iconName || 'FileText',
        language: initialData?.language || 'English',
        isPublished: initialData?.isPublished || false,
    });

    const [deleteConfirm, setDeleteConfirm] = useState(false);

    // Generate slug from title if creating new
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        if (!isEdit) {
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setFormData(prev => ({ ...prev, title, slug }));
        } else {
            setFormData(prev => ({ ...prev, title }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (isEdit && initialData?._id) {
                await updatePublication({
                    id: initialData._id,
                    ...formData,
                });
            } else {
                await createPublication({
                    ...formData,
                    publishedAt: Date.now(),
                });
            }
            router.push('/admin/publications');
        } catch (error) {
            console.error('Failed to save publication:', error);
            alert("Failed to save. Please check your connection and try again.");
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!initialData?._id) return;
        setIsSubmitting(true);
        try {
            await removePublication({ id: initialData._id });
            router.push('/admin/publications');
        } catch (error) {
            console.error('Failed to delete:', error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/publications"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-charcoal-black">
                            {isEdit ? 'Edit Publication' : 'New Publication'}
                        </h1>
                        <p className="text-sm text-elegant-grey">
                            {isEdit ? `Editing "${initialData?.title}"` : 'Create a new publication'}
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
                                <Trash2 className="h-4 w-4 mr-2" /> Delete Publication
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
                {/* Basic Info */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
                    <h2 className="text-lg font-bold text-charcoal-black mb-6">Basic Information</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-charcoal-black mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={handleTitleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-royal-green focus:ring-2 focus:ring-royal-green/10 outline-none transition-all"
                                placeholder="Enter publication title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-charcoal-black mb-2">
                                Slug
                            </label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-royal-green focus:ring-2 focus:ring-royal-green/10 outline-none transition-all font-mono text-sm"
                                placeholder="auto-generated-from-title"
                            />
                            <p className="text-xs text-elegant-grey mt-1">URL-friendly identifier</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
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
                                    Language
                                </label>
                                <input
                                    type="text"
                                    value={formData.language}
                                    onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-royal-green focus:ring-2 focus:ring-royal-green/10 outline-none transition-all"
                                    placeholder="English"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-charcoal-black mb-2">
                                Summary *
                            </label>
                            <textarea
                                value={formData.summary}
                                onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                                required
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-royal-green focus:ring-2 focus:ring-royal-green/10 outline-none transition-all resize-none"
                                placeholder="Brief summary of the publication"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-charcoal-black mb-2">
                                Full Details
                            </label>
                            <textarea
                                value={formData.fullDetails}
                                onChange={(e) => setFormData(prev => ({ ...prev, fullDetails: e.target.value }))}
                                rows={6}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-royal-green focus:ring-2 focus:ring-royal-green/10 outline-none transition-all resize-none"
                                placeholder="Detailed description of the publication content"
                            />
                        </div>
                    </div>
                </div>

                {/* Media */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
                    <h2 className="text-lg font-bold text-charcoal-black mb-6">Media & Files</h2>

                    <div className="space-y-6">
                        <FileUpload
                            endpoint="imageUploader"
                            value={formData.cover}
                            onChange={(url) => setFormData(prev => ({ ...prev, cover: url || '' }))}
                            label="Cover Image *"
                        />

                        <FileUpload
                            endpoint="pdfUploader"
                            value={formData.pdfUrl}
                            onChange={(url) => setFormData(prev => ({ ...prev, pdfUrl: url || '' }))}
                            label="PDF Document"
                        />

                        <div>
                            <label className="block text-sm font-semibold text-charcoal-black mb-2">
                                Icon
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {ICONS.map(icon => (
                                    <button
                                        key={icon}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, iconName: icon }))}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${formData.iconName === icon
                                                ? 'bg-royal-green text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {icon}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Publishing */}
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
                            <div className="font-semibold text-charcoal-black">Publish immediately</div>
                            <div className="text-sm text-elegant-grey">Make this publication visible on the website</div>
                        </div>
                    </label>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4">
                    <Link href="/admin/publications">
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
                                <Save className="h-5 w-5 mr-2" /> {isEdit ? 'Update Publication' : 'Create Publication'}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
