'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import ServiceForm from '@/components/admin/forms/ServiceForm';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function EditServicePage() {
    const params = useParams();
    const id = params.id as Id<"services">;
    const service = useQuery(api.services.getById, { id });

    if (service === undefined) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-royal-green" />
            </div>
        );
    }

    if (service === null) {
        return <div>Service not found</div>;
    }

    return (
        <ServiceForm
            initialData={{
                ...service,
                focus: service.focus || [],
            }}
            isEdit={true}
        />
    );
}
