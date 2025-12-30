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
    Plus,
    X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Id } from '@/convex/_generated/dataModel';
import FileUpload from '@/components/admin/FileUpload';

const COLORS = [
    "bg-royal-green",
    "bg-red-600",
    "bg-blue-600",
    "bg-amber-600",
    "bg-purple-600",
    "bg-cyan-600",
    "bg-emerald-600",
    "bg-rose-600",
];

const ICONS = [
    "Zap",
    "Sprout",
    "TrendingUp",
    "Briefcase",
    "Globe",
    "Users",
];

interface ProjectFormProps {
    initialData?: {
        _id?: Id<"projects">;
        title: string;
        slug: string;
        shortDesc: string;
        fullDesc: string;
        image: string;
        stats: { label: string; value: string }[];
        iconName: string;
        color: string;
        isPublished: boolean;
    };
    isEdit?: boolean;
}

export default function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
    const router = useRouter();
    const createProject = useMutation(api.projects.create);
    const updateProject = useMutation(api.projects.update);
    const removeProject = useMutation(api.projects.remove);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        shortDesc: initialData?.shortDesc || '',
        fullDesc: initialData?.fullDesc || '',
        image: initialData?.image || '',
        stats: initialData?.stats || [{ label: '', value: '' }],
        iconName: initialData?.iconName || 'Zap',
        color: initialData?.color || 'bg-royal-green',
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

    const handleStatChange = (index: number, field: 'label' | 'value', value: string) => {
        const newStats = [...formData.stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setFormData(prev => ({ ...prev, stats: newStats }));
    };

    const addStat = () => {
        setFormData(prev => ({
            ...prev,
            stats: [...prev.stats, { label: '', value: '' }]
        }));
    };

    const removeStat = (index: number) => {
        setFormData(prev => ({
            ...prev,
            stats: prev.stats.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Filter out empty stats
        const cleanStats = formData.stats.filter(s => s.label && s.value);

        try {
            if (isEdit && initialData?._id) {
                await updateProject({
                    id: initialData._id,
                    ...formData,
                    stats: cleanStats,
                });
            } else {
                await createProject({
                    ...formData,
                    stats: cleanStats,
                });
            }
            router.push('/admin/projects');
        } catch (error) {
            console.error('Failed to save project:', error);
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!initialData?._id) return;
        setIsSubmitting(true);
        try {
            await removeProject({ id: initialData._id });
            router.push('/admin/projects');
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
                        href="/admin/projects"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-charcoal-black">
                            {isEdit ? 'Edit Project' : 'New Project'}
                        </h1>
                        <p className="text-sm text-elegant-grey">
                            {isEdit ? `Editing "${initialData?.title}"` : 'Create a new project'}
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
                                <Trash2 className="h-4 w-4 mr-2" /> Delete Project
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
                                placeholder="Enter project title"
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
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-charcoal-black mb-2">
                                Short Description *
                            </label>
                            <textarea
                                value={formData.shortDesc}
                                onChange={(e) => setFormData(prev => ({ ...prev, shortDesc: e.target.value }))}
                                required
                                rows={2}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-royal-green focus:ring-2 focus:ring-royal-green/10 outline-none transition-all resize-none"
                                placeholder="Brief summary of the project"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-charcoal-black mb-2">
                                Full Description
                            </label>
                            <textarea
                                value={formData.fullDesc}
                                onChange={(e) => setFormData(prev => ({ ...prev, fullDesc: e.target.value }))}
                                rows={6}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-royal-green focus:ring-2 focus:ring-royal-green/10 outline-none transition-all resize-none"
                                placeholder="Detailed project description"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
                    <h2 className="text-lg font-bold text-charcoal-black mb-6">Visuals & Branding</h2>

                    <div className="space-y-6">
                        <FileUpload
                            endpoint="imageUploader"
                            value={formData.image}
                            onChange={(url) => setFormData(prev => ({ ...prev, image: url || '' }))}
                            label="Project Image *"
                        />

                        <div className="grid sm:grid-cols-2 gap-6">
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
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${formData.iconName === icon
                                                    ? 'bg-royal-green text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {icon}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-charcoal-black mb-2">
                                    Theme Color
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {COLORS.map(color => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, color }))}
                                            className={`w-8 h-8 rounded-full border-2 transition-all ${color} ${formData.color === color
                                                    ? 'border-gray-900 scale-110'
                                                    : 'border-transparent hover:scale-105'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-charcoal-black">Impact Stats</h2>
                        <Button type="button" variant="outline" size="sm" onClick={addStat}>
                            <Plus className="h-4 w-4 mr-2" /> Add Stat
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {formData.stats.map((stat, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={stat.value}
                                        onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                                        placeholder="Value (e.g. 80%)"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-royal-green focus:ring-2 focus:ring-royal-green/10 outline-none transition-all"
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={stat.label}
                                        onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                                        placeholder="Label (e.g. Reduction)"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-royal-green focus:ring-2 focus:ring-royal-green/10 outline-none transition-all"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeStat(index)}
                                    className="text-gray-400 hover:text-red-500"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                        ))}
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
                            <div className="font-semibold text-charcoal-black">Publish immediately</div>
                        </div>
                    </label>
                </div>

                <div className="flex items-center justify-end gap-4">
                    <Link href="/admin/projects">
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
                                <Save className="h-5 w-5 mr-2" /> {isEdit ? 'Update Project' : 'Create Project'}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
