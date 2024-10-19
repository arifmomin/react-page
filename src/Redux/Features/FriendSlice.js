import { createSlice } from '@reduxjs/toolkit'

export const FriendSlice = createSlice({
  name: 'friends',
  initialState: {
    friendinfo: {},
  },
  reducers: {
    friendsAction: (state, action) => {
      state.friendinfo = action.payload;
    }
  }
});
export const { friendsAction } = FriendSlice.actions;

export default FriendSlice.reducer;