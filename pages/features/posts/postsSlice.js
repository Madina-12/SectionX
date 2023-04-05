import { createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSlice } from "../api/apiSlice";

const postsAdapter = createEntityAdapter({
    // sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: id => '/api/posts/?sectionId=' + id,
            transformResponse: responseData => {
                // let min = 1;
                const loadedPosts = responseData.map(post => {
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => [
                { type: 'Post', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }),
        getPostsByUserId: builder.query({
            query: id => `/posts/?userId=${id}`,
            transformResponse: responseData => {
                let min = 1;
                const loadedPosts = responseData.map(post => {
                    // if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    // if (!post?.isHeart) post.isHeart = {
                    //     thumbsUp: 0,
                    //     wow: 0,
                    //     heart: 0,
                    //     rocket: 0,
                    //     coffee: 0
                    // }
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }),
        addNewPost: builder.mutation({
            query: ({title,content, sectionId}) => ({
                url: `/api/posts/?sectionId=${sectionId}`,
                method: 'POST',
                body: {
                    title,
                    content,
                }
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),

        updatePost: builder.mutation({
            query: ({id,sectionId, title, content}) => ({
                url: `/api/posts/?sectionId=${sectionId}`,
                method: 'PUT',
                body: {
                    id,
                    title,
                    content,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
        invalidatePosts: builder.mutation({
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),
        deletePost: builder.mutation({
            query: ({ id , sectionId}) => ({
                url: `/api/posts/?sectionId=${sectionId}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
        addIsHeart: builder.mutation({
            query: ({ postId,sectionId, isHeart}) => ({
                url: `/api/posts/heart`,
                method: 'PUT',
                // In a real app, we'd probably need to base this on user ID somehow
                // so that a user can't do the same reaction more than once
                body: { postId,sectionId, isHeart}
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
        updatePinned: builder.mutation({
            query: ({postId,sectionId, isPinned}) => ({
                url: `/api/posts/?sectionId=${sectionId}`,
                method: 'PATCH',
                body: {
                    postId,
                    sectionId,
                    isPinned
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),

    })
})

export const {
    useGetPostsQuery,
    useGetPostsByUserIdQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddIsHeartMutation,
    useUpdatePinnedMutation,
    useInvalidatePostsMutation
} = extendedApiSlice
