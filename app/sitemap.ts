import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://interworld.co.ug';

    // Static pages
    const staticPages = [
        '',
        '/about',
        '/services',
        '/projects',
        '/publications',
        '/updates',
        '/impact',
        '/gallery',
        '/faq',
        '/contact',
        '/partners',
    ];

    const staticRoutes = staticPages.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic pages - Services
    const services = [
        'strategic-consulting',
        'research-development',
        'monitoring-evaluation',
        'proposal-writing',
        'technical-documentation',
        'training-capacity',
        'professional-writing',
        'book-publishing',
        'academic-mentorship',
    ];

    const serviceRoutes = services.map((slug) => ({
        url: `${baseUrl}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Dynamic pages - Projects
    const projects = [
        'supertech',
        'organic-fertilizers',
        'calcifeed',
    ];

    const projectRoutes = projects.map((slug) => ({
        url: `${baseUrl}/projects/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Dynamic pages - Publications
    const publications = [
        'future-sustainable-ag',
        'innovating-for-impact',
        'climate-resilience-policy',
        'circular-economy-bsf',
    ];

    const publicationRoutes = publications.map((slug) => ({
        url: `${baseUrl}/publications/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    // Dynamic pages - Updates
    const updates = [
        'interworld-launches-new-innovation-hub',
        'scaling-supertech-nationwide',
    ];

    const updateRoutes = updates.map((slug) => ({
        url: `${baseUrl}/updates/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [
        ...staticRoutes,
        ...serviceRoutes,
        ...projectRoutes,
        ...publicationRoutes,
        ...updateRoutes,
    ];
}
