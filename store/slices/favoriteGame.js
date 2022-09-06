import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorite: [
    {
      id: 1,
      title: 'paper rock scissors',
      thumbnail: '/assets/games/prs-thumbnail.png',
      rating: 4.5,
    },
    {
      id: 2,
      title: 'game cutie',
      thumbnail: '/assets/games/prs-thumbnail.png',
      rating: 10,
    },
  ],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavoriteGame: (state, action) => {
      const isDuplicate = state.favorite.filter(
        (data) => data.id === action.payload.id
      );

      state.favorite =
        isDuplicate.length !== 0
          ? state.favorite
          : [...state.favorite, action.payload];
    },
    deleteFavoriteGame: (state, action) => {
      console.log('payload', action.payload);
      const deleted = state.favorite.filter(
        (fav) => fav.id !== action.payload.id
      );
      console.log('payload', deleted);
      state.favorite = deleted;
    },
  },
});
export const { addFavoriteGame, deleteFavoriteGame } = favoriteSlice.actions;

export const favoriteSelector = (state) => state.favoriteGame;

export default favoriteSlice.reducer;
