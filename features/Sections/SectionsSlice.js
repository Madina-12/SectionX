import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const sectionsAdapter = createEntityAdapter()

const initialState = sectionsAdapter.getInitialState()

export const sectionsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSections: builder.query({
            query: () => '/api/sections',
            transformResponse: responseData => {
                return sectionsAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => [
                { type: 'Section', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Section', id }))
            ]
        }),
        addNewSection: builder.mutation({
            query: ({sectionName}) => ({
                url: `/api/sections`,
                method: 'POST',
                body: {
                    sectionName
                }
            }),
            invalidatesTags: [
                { type: 'Section', id: "LIST" }
            ]
        }),

        updateSection: builder.mutation({
            query: ({sectionId, sectionName}) => ({
                url: `/api/sections`,
                method: 'PATCH',
                body: {
                    sectionId,
                    sectionName
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Section', id: arg.id }
            ]
        }),
        deleteSection: builder.mutation({
            query: ({ sectionId }) => ({
                url: `/api/sections`,
                method: 'DELETE',
                body: { sectionId }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Section', id: arg.id }
            ]
        }),

    })
})

export const {
    useGetSectionsQuery,
    useAddNewSectionMutation,
    useDeleteSectionMutation,
    useUpdateSectionMutation
} = sectionsApiSlice