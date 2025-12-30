import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// ============== QUERIES ==============

export const getPublished = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("projects")
            .withIndex("by_published", (q) => q.eq("isPublished", true))
            .collect();
    },
});

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("projects").collect();
    },
});

export const getBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("projects")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
    },
});

export const getById = query({
    args: { id: v.id("projects") },
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
        image: v.string(),
        stats: v.array(v.object({
            label: v.string(),
            value: v.string(),
        })),
        iconName: v.string(),
        color: v.string(),
        isPublished: v.boolean(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("projects", args);
    },
});

export const update = mutation({
    args: {
        id: v.id("projects"),
        title: v.optional(v.string()),
        slug: v.optional(v.string()),
        shortDesc: v.optional(v.string()),
        fullDesc: v.optional(v.string()),
        image: v.optional(v.string()),
        stats: v.optional(v.array(v.object({
            label: v.string(),
            value: v.string(),
        }))),
        iconName: v.optional(v.string()),
        color: v.optional(v.string()),
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
    args: { id: v.id("projects") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const togglePublish = mutation({
    args: { id: v.id("projects") },
    handler: async (ctx, args) => {
        const project = await ctx.db.get(args.id);
        if (!project) throw new Error("Project not found");

        await ctx.db.patch(args.id, {
            isPublished: !project.isPublished,
        });
        return await ctx.db.get(args.id);
    },
});
