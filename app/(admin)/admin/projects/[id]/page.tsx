'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import ProjectForm from '@/components/admin/forms/ProjectForm';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function EditProjectPage() {
    const params = useParams();
    const id = params.id as Id<"projects">;
    const project = useQuery(api.projects.getById, { id });

    if (project === undefined) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-royal-green" />
            </div>
        );
    }

    if (project === null) {
        return <div>Project not found</div>;
    }

    return (
        <ProjectForm
            initialData={project}
            isEdit={true}
        />
    );
}
