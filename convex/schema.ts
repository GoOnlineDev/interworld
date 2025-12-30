import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // Publications table - for books, reports, policy briefs, etc.
    publications: defineTable({
        title: v.string(),
        slug: v.string(),
        category: v.string(), // "Books", "Reports", "Policy Briefs", "Journals", "Academic Papers", "Knowledge Products"
        summary: v.string(),
        fullDetails: v.string(),
        cover: v.string(), // Image URL
        pdfUrl: v.optional(v.string()), // PDF file URL for reading/downloading
        iconName: v.string(), // Icon identifier
        publishedAt: v.optional(v.number()), // Timestamp
        language: v.optional(v.string()),
        isPublished: v.boolean(),
    })
        .index("by_slug", ["slug"])
        .index("by_category", ["category"])
        .index("by_published", ["isPublished"]),

    // Projects table
    projects: defineTable({
        title: v.string(),
        slug: v.string(),
        shortDesc: v.string(),
        fullDesc: v.string(),
        image: v.string(), // Image URL
        stats: v.array(v.object({
            label: v.string(),
            value: v.string(),
        })),
        iconName: v.string(),
        color: v.string(), // Tailwind gradient class
        isPublished: v.boolean(),
    })
        .index("by_slug", ["slug"])
        .index("by_published", ["isPublished"]),

    // Services table
    services: defineTable({
        title: v.string(),
        slug: v.string(),
        shortDesc: v.string(),
        fullDesc: v.string(),
        iconName: v.string(),
        focus: v.optional(v.array(v.string())), // Focus areas for certain services
        isPublished: v.boolean(),
    })
        .index("by_slug", ["slug"])
        .index("by_published", ["isPublished"]),

    // Updates/News table
    updates: defineTable({
        title: v.string(),
        slug: v.string(),
        category: v.string(), // "News", "Announcements", etc.
        date: v.string(), // Display date
        excerpt: v.string(),
        content: v.string(), // Full article content
        image: v.string(), // Featured image URL
        publishedAt: v.optional(v.number()),
        isPublished: v.boolean(),
    })
        .index("by_slug", ["slug"])
        .index("by_category", ["category"])
        .index("by_published", ["isPublished"]),

    // Gallery table
    gallery: defineTable({
        title: v.string(),
        category: v.string(), // "Projects", "Events", "Team"
        image: v.string(), // Image URL
        description: v.string(),
        order: v.optional(v.number()), // For custom ordering
        isPublished: v.boolean(),
    })
        .index("by_category", ["category"])
        .index("by_published", ["isPublished"]),

    // Partners table
    partners: defineTable({
        name: v.string(),
        logo: v.optional(v.string()), // Logo image URL
        website: v.optional(v.string()),
        description: v.optional(v.string()),
        order: v.optional(v.number()), // For custom ordering
        isPublished: v.boolean(),
    })
        .index("by_published", ["isPublished"]),

    // FAQs table
    faqs: defineTable({
        category: v.string(), // "General", "Services", "Impact"
        question: v.string(),
        answer: v.string(),
        order: v.optional(v.number()), // For custom ordering within category
        isPublished: v.boolean(),
    })
        .index("by_category", ["category"])
        .index("by_published", ["isPublished"]),

    // Contact form submissions table
    contacts: defineTable({
        fullName: v.string(),
        email: v.string(),
        subject: v.string(),
        message: v.string(),
        submittedAt: v.number(), // Timestamp
        isRead: v.boolean(),
        isArchived: v.boolean(),
    })
        .index("by_read", ["isRead"])
        .index("by_archived", ["isArchived"])
        .index("by_submitted", ["submittedAt"]),

    // Pillars table (Identity Pillars)
    pillars: defineTable({
        title: v.string(),
        description: v.string(),
        iconName: v.string(),
        order: v.optional(v.number()),
        isPublished: v.boolean(),
    })
        .index("by_published", ["isPublished"]),
});
