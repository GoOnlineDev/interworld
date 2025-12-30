import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// ============== QUERIES ==============

export const getPublished = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("services")
            .withIndex("by_published", (q) => q.eq("isPublished", true))
            .collect();
    },
});

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("services").collect();
    },
});

export const getBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("services")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
    },
});

export const getById = query({
    args: { id: v.id("services") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

// ============== MUTATIONS ==============

export const create = mutation({
    args: {
        title: v.string(),
        slug: v.string(),
        shortDesc: v.string(),
        fullDesc: v.string(),
        iconName: v.string(),
        focus: v.optional(v.array(v.string())),
        isPublished: v.boolean(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("services", args);
    },
});

export const update = mutation({
    args: {
        id: v.id("services"),
        title: v.optional(v.string()),
        slug: v.optional(v.string()),
        shortDesc: v.optional(v.string()),
        fullDesc: v.optional(v.string()),
        iconName: v.optional(v.string()),
        focus: v.optional(v.array(v.string())),
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
    args: { id: v.id("services") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const togglePublish = mutation({
    args: { id: v.id("services") },
    handler: async (ctx, args) => {
        const service = await ctx.db.get(args.id);
        if (!service) throw new Error("Service not found");

        await ctx.db.patch(args.id, {
            isPublished: !service.isPublished,
        });
        return await ctx.db.get(args.id);
    },
});
