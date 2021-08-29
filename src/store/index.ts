/* eslint-disable no-param-reassign */
import { createSlice, configureStore } from '@reduxjs/toolkit';

export type CoverLetter = {
  position: string
  companyName: string
  recipient: string
  recipientType: string
  shouldSave: boolean
};

export type State = {
  coverLetter: CoverLetter
}

export const initialState: CoverLetter = {
  position: 'Senior Backend Engineer',
  companyName: 'CredPal',
  recipient: 'Hiring Manager',
  recipientType: 'Hiring Manager',
  shouldSave: true,
};

const coverLetter = createSlice({
  name: 'coverLetter',
  initialState,
  reducers: {
    clearCoverLetter: (state) => {
      const {
        position, companyName, recipient, recipientType, shouldSave,
      } = initialState;

      state.position = position;
      state.companyName = companyName;
      state.recipient = recipient;
      state.recipientType = recipientType;
      state.shouldSave = shouldSave;
    },
    updateCoverLetter: (state, action) => {
      const {
        position, companyName, recipient, recipientType, shouldSave,
      } = action.payload;

      state.position = position;
      state.companyName = companyName;
      state.recipient = recipient;
      state.recipientType = recipientType;
      state.shouldSave = shouldSave;
    },
  },
});

export const { clearCoverLetter, updateCoverLetter } = coverLetter.actions;

export default configureStore({
  reducer: {
    coverLetter: coverLetter.reducer,
  },
});
