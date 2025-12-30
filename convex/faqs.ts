import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// ============== QUERIES ==============

export const getPublished = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("faqs")
            .withIndex("by_published", (q) => q.eq("isPublished", true))
            .collect();
    },
});

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("faqs").collect();
    },
});

export const getByCategory = query({
    args: { category: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("faqs")
            .withIndex("by_category", (q) => q.eq("category", args.category))
            .filter((q) => q.eq(q.field("isPublished"), true))
            .collect();
    },
});

export const getById = query({
    args: { id: v.id("faqs") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

// Get grouped FAQs by category
export const getGroupedByCategory = query({
    args: {},
    handler: async (ctx) => {
        const faqs = await ctx.db
            .query("faqs")
            .withIndex("by_published", (q) => q.eq("isPublished", true))
            .collect();

        // Group by category
        const grouped: Record<string, typeof faqs> = {};
        for (const faq of faqs) {
            if (!grouped[faq.category]) {
                grouped[faq.category] = [];
            }
            grouped[faq.category].push(faq);
        }

        // Convert to array format
        return Object.entries(grouped).map(([category, items]) => ({
            category,
            items,
        }));
    },
});

// ============== MUTATIONS ==============

export const create = mutation({
    args: {
        category: v.string(),
        question: v.string(),
        answer: v.string(),
        order: v.optional(v.number()),
        isPublished: v.boolean(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("faqs", args);
    },
});

export const update = mutation({
    args: {
        id: v.id("faqs"),
        category: v.optional(v.string()),
        question: v.optional(v.string()),
        answer: v.optional(v.string()),
        order: v.optional(v.number()),
        isPublished: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        const filteredUpdates = Object.fromEntries(
            Object.entries(updates).filter(([_, value]) => value !== undefined)
        );
        await ctx.db.patch(id, filteredUpdates);
        return await ctx.db.get(id);
    },
});

export const remove = mutation({
    args: { id: v.id("faqs") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const togglePublish = mutation({
    args: { id: v.id("faqs") },
    handler: async (ctx, args) => {
        const faq = await ctx.db.get(args.id);
        if (!faq) throw new Error("FAQ not found");

        await ctx.db.patch(args.id, {
            isPublished: !faq.isPublished,
        });
        return await ctx.db.get(args.id);
    },
});
