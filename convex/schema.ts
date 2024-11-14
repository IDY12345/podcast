import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    podcasts:defineTable({
        user:v.id('users'),
        podCastTitle:v.string(),
        podCastDescription:v.string(),
        audioUrl:v.optional(v.string()),
        audioStorageId:v.optional(v.id('_storage')),
        imgUrl:v.optional(v.string()),
        imageStorageId:v.optional(v.id('_storage')),
        author:v.string(),
        authorId: v.string(),
        authorImageUrl:v.string(),
        voicePrompt:v.string(),
        imagePrompt:v.string(),
        voiceType:v.string(),
        audioDuration:v.string(),
        views:v.number(),
    })
    .searchIndex('search_author',{searchField:'author'})
    .searchIndex('search_title',{searchField:'podCastTitle'})
    .searchIndex('search_body',{searchField:'podCastDescription'}),
    users:defineTable({
        email:v.string(),
        imgUrl:v.string(),
        clerkId:v.string(),
        name:v.string(),
    })
})