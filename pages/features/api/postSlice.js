import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    isOpen: false,
    content: null,
  },
  reducers: {
    openEditPost(state, action) {
      state.isOpen = true;
      state.post = action.payload.post;
      state.sectionId = action.payload.sectionId
    },
    closeEditPost(state) {
      state.isOpen = false;
      state.content = null;
    },
  },
});

export const { openEditPost, closeEditPost } = postSlice.actions;

export default postSlice.reducer;