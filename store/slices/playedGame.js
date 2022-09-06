import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  played: [
    {
      id: 278,
      name: "Horizon Zero Dawn",
      thumbnail: "https://media.rawg.io/media/games/b7d/b7d3f1715fa8381a4e780173a197a615.jpg",
      rating: 4.33,
    },
    {
      id: 5286,
      name: "Tomb Raider (2013)",
      thumbnail: "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg",
      rating: 4.05,
    },
    {
      id: 13536,
      name: "Portal",
      thumbnail: "https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg",
      rating: 4.51,
    },
  ],
};

const playedSlice = createSlice({
  name: "played",
  initialState,
  reducers: {
    addPlayedGame: (state, action) => {
      const isDuplicate = state.played.filter((data) => data.id === action.payload.id);

      state.played = isDuplicate.length !== 0 ? state.played : [...state.played, action.payload];
    },
  },
});
export const { addPlayedGame } = playedSlice.actions;

export const playedSelector = (state) => state.playedGame;

export default playedSlice.reducer;
