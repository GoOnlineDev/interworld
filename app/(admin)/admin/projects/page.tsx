'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';
import { useState } from 'react';
import {
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Briefcase,
    ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Id } from '@/convex/_generated/dataModel';

export default function ProjectsPage() {
    const projects = useQuery(api.projects.getAll);
    const togglePublish = useMutation(api.projects.togglePublish);
    const removeProject = useMutation(api.projects.remove);

    const [searchQuery, setSearchQuery] = useState('');
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const filteredProjects = projects?.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleTogglePublish = async (id: Id<"projects">) => {
        await togglePublish({ id });
        setActiveMenu(null);
    };

    const handleDelete = async (id: Id<"projects">) => {
        await removeProject({ id });
        setDeleteConfirm(null);
        setActiveMenu(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-charcoal-black">Projects</h1>
                    <p className="text-elegant-grey text-sm mt-1">Manage your projects and initiatives</p>
                </div>
                <Link href="/admin/projects/new">
                    <Button className="bg-royal-green hover:bg-royal-green/90 rounded-xl h-12 px-6 shadow-lg shadow-royal-green/20">
                        <Plus className="h-5 w-5 mr-2" /> Add Project
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-royal-green focus:ring-2 focus:ring-royal-green/10 outline-none transition-all"
                />
            </div>

            {/* Projects List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {!projects ? (
                    <div className="p-8 text-center text-elegant-grey">Loading...</div>
                ) : filteredProjects?.length === 0 ? (
                    <div className="p-8 text-center">
                        <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-elegant-grey">No projects found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {filteredProjects?.map((project) => (
                            <div key={project._id} className="p-4 lg:p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start gap-4">
                                    {/* Image */}
                                    <div className="w-20 h-16 lg:w-24 lg:h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0 relative">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${project.isPublished
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-gray-100 text-gray-600'
                                                        }`}>
                                                        {project.isPublished ? 'Published' : 'Draft'}
                                                    </span>
                                                </div>
                                                <h3 className="font-semibold text-charcoal-black truncate">{project.title}</h3>
                                                <p className="text-sm text-elegant-grey line-clamp-2 mt-1">{project.shortDesc}</p>

                                                {/* Stats preview */}
                                                <div className="flex items-center gap-4 mt-2">
                                                    {project.stats.slice(0, 3).map((stat, i) => (
                                                        <div key={i} className="text-xs">
                                                            <span className="font-bold text-royal-green">{stat.value}</span>
                                                            <span className="text-elegant-grey ml-1">{stat.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="relative shrink-0">
                                                <button
                                                    onClick={() => setActiveMenu(activeMenu === project._id ? null : project._id)}
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <MoreVertical className="h-5 w-5 text-gray-500" />
                                                </button>

                                                {activeMenu === project._id && (
                                                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-10">
                                                        <Link
                                                            href={`/admin/projects/${project._id}`}
                                                            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                                                        >
                                                            <Edit className="h-4 w-4" /> Edit
                                                        </Link>
                                                        <Link
                                                            href={`/projects/${project.slug}`}
                                                            target="_blank"
                                                            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                                                        >
                                                            <ExternalLink className="h-4 w-4" /> View on site
                                                        </Link>
                                                        <button
                                                            onClick={() => handleTogglePublish(project._id)}
                                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                                                        >
                                                            {project.isPublished ? (
                                                                <><EyeOff className="h-4 w-4" /> Unpublish</>
                                                            ) : (
                                                                <><Eye className="h-4 w-4" /> Publish</>
                                                            )}
                                                        </button>
                                                        <hr className="my-2" />
                                                        <button
                                                            onClick={() => setDeleteConfirm(project._id)}
                                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                        >
                                                            <Trash2 className="h-4 w-4" /> Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Delete Confirmation */}
                                {deleteConfirm === project._id && (
                                    <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100">
                                        <p className="text-sm text-red-800 mb-3">
                                            Are you sure you want to delete "{project.title}"? This action cannot be undone.
                                        </p>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleDelete(project._id)}
                                                className="bg-red-600 hover:bg-red-700 rounded-lg h-9 text-sm"
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                onClick={() => setDeleteConfirm(null)}
                                                variant="outline"
                                                className="rounded-lg h-9 text-sm"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Click outside to close menu */}
            {activeMenu && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setActiveMenu(null)}
                />
            )}
        </div>
    );
}
