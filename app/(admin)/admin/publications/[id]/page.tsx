'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import PublicationForm from '@/components/admin/forms/PublicationForm';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function EditPublicationPage() {
    const params = useParams();
    const id = params.id as Id<"publications">;
    const publication = useQuery(api.publications.getById, { id });

    if (publication === undefined) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-royal-green" />
            </div>
        );
    }

    if (publication === null) {
        return <div>Publication not found</div>;
    }

    return (
        <PublicationForm
            initialData={publication}
            isEdit={true}
        />
    );
}
