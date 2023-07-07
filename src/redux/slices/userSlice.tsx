import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs/plugin/utc';

dayjs.extend(dayjsPluginUTC);
// Define a type for the slice state
export interface UserState {
  token: string;
  refreshToken: string;
  tokenExpiryTime: Date;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

// Define the initial state using that type
const initialState: UserState = {
  token: '',
  refreshToken: '',
  tokenExpiryTime: new Date(),
  email: '',
  firstName: '',
  lastName: '',
  avatarUrl: '',
};
interface RefreshTokenProps {
  token: string;
  refreshToken: string;
  tokenExpiryTime: Date;
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserData: (state, action: PayloadAction<UserState>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      let currentTime = new Date();
      currentTime.setHours(currentTime.getHours() + 1);
      //due to reffresh token is always setted to current time
      state.tokenExpiryTime = currentTime;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.avatarUrl = action.payload.avatarUrl;
    },
    refreshUserToken: (state, action: PayloadAction<RefreshTokenProps>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.tokenExpiryTime = action.payload.tokenExpiryTime;
    },
    clearUserData: (state) => {
      state.token = '';
      state.refreshToken = '';
      state.tokenExpiryTime = new Date();
      state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.avatarUrl = '';
    },
  },
});

export const { addUserData, refreshUserToken, clearUserData } =
  userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;
export const getIsUserAuthorized = (state: RootState) =>
  dayjs(state.user.tokenExpiryTime) > dayjs().utc();
export default userSlice.reducer;
