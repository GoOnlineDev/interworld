'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import UpdateForm from '@/components/admin/forms/UpdateForm';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function EditUpdatePage() {
    const params = useParams();
    const id = params.id as Id<"updates">;
    const update = useQuery(api.updates.getById, { id });

    if (update === undefined) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-royal-green" />
            </div>
        );
    }

    if (update === null) {
        return <div>Article not found</div>;
    }

    return (
        <UpdateForm
            initialData={update}
            isEdit={true}
        />
    );
}
