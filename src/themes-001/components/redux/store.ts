import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import data from './data';
// import address from 'src/member/redux/address';
// import member from 'src/member/redux';
import navSlice from './navSlice';

const store = configureStore({
  reducer: {
    data,
    // member: member,
    // address: address,
    navData: navSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch: () => AppDispatch = useDispatch;

export { store, useAppDispatch, useAppSelector };
