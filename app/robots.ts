import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/'],
            },
        ],
        sitemap: 'https://interworld.co.ug/sitemap.xml',
        host: 'https://interworld.co.ug',
    };
}
