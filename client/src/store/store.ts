import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import userReducer from './slices/userSlice';
import auctionCreateReducer from './slices/auctionCreateSlice';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['user'], //user Reducer만 저장
};

export const rootReducer = combineReducers({
  user: userReducer,
  auctionCreate: auctionCreateReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
