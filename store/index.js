import { configureStore } from '@reduxjs/toolkit';

import favoriteGame from './slices/favoriteGame';
import authUser from './slices/auth';

import playedGame from './slices/playedGame';
const store = configureStore({
  reducer: {
    user: authUser,
    favoriteGame,

    playedGame,
  },
});

export default store;
