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

interface UpdateFormProps {
    initialData?: {
        _id?: Id<"updates">;
        title: string;
        slug: string;
        date: string;
        category: string;
        image: string;
        excerpt: string;
        content: string;
        isPublished: boolean;
    };
    isEdit?: boolean;
}

const CATEGORIES = [
    "News",
    "Events",
    "Press Release",
    "Blog",
    "Announcement"
];

export default function UpdateForm({ initialData, isEdit = false }: UpdateFormProps) {
    const router = useRouter();
    const createUpdate = useMutation(api.updates.create);
    const updateUpdate = useMutation(api.updates.update); // Naming is redundant but accurate :P
    const removeUpdate = useMutation(api.updates.remove);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        date: initialData?.date || new Date().toISOString().split('T')[0],
        category: initialData?.category || 'News',
        image: initialData?.image || '',
        excerpt: initialData?.excerpt || '',
        content: initialData?.content || '',
        isPublished: initialData?.isPublished || false,
    });

    const [deleteConfirm, setDeleteConfirm] = useState(false);

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
                await updateUpdate({
                    id: initialData._id,
                    ...formData,
                });
            } else {
                await createUpdate(formData);
            }
            router.push('/admin/updates');
        } catch (error) {
            console.error('Failed to save update:', error);
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!initialData?._id) return;
        setIsSubmitting(true);
        try {
            await removeUpdate({ id: initialData._id });
            router.push('/admin/updates');
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
                        href="/admin/updates"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-charcoal-black">
                            {isEdit ? 'Edit Update' : 'New Update'}
                        </h1>
                        <p className="text-sm text-elegant-grey">
                            {isEdit ? `Editing "${initialData?.title}"` : 'Create a new update'}
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
                                <Trash2 className="h-4 w-4 mr-2" /> Delete Update
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
                    <h2 className="text-lg font-bold text-charcoal-black mb-6">Article Details</h2>

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
                                placeholder="Article title"
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
                                placeholder="auto-generated-slug"
                            />
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
                                    Date *
                                </label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-royal-green focus:ring-2 focus:ring-royal-green/10 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-charcoal-black mb-2">
                                Excerpt *
                            </label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                                required
                                rows={2}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-royal-green focus:ring-2 focus:ring-royal-green/10 outline-none transition-all resize-none"
                                placeholder="Brief summary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-charcoal-black mb-2">
                                Content
                            </label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                rows={8}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-royal-green focus:ring-2 focus:ring-royal-green/10 outline-none transition-all resize-none font-mono text-sm"
                                placeholder="Full article content (Markdown supported)"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
                    <h2 className="text-lg font-bold text-charcoal-black mb-6">Featured Image</h2>

                    <FileUpload
                        endpoint="imageUploader"
                        value={formData.image}
                        onChange={(url) => setFormData(prev => ({ ...prev, image: url || '' }))}
                        label="Upload Article Image"
                    />
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
                            <div className="font-semibold text-charcoal-black">Publish immediately</div>
                        </div>
                    </label>
                </div>

                <div className="flex items-center justify-end gap-4">
                    <Link href="/admin/updates">
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
                                <Save className="h-5 w-5 mr-2" /> {isEdit ? 'Update Article' : 'Create Article'}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
