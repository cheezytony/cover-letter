/* eslint-disable no-param-reassign */
import { createSlice, configureStore } from '@reduxjs/toolkit';

export type CoverLetter = {
  position: string
  companyName: string
  recipient: string
  recipientType: 'Sir' | 'Ma' | 'Hiring Manager' | 'name'
  currentPosition: string
  currentEmployer: string
  referrer: string | null
  referrerType: string | null
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
  currentPosition: 'Full Stack Developer',
  currentEmployer: 'CredPal',
  referrer: null,
  referrerType: null,
  shouldSave: true,
};

const coverLetter = createSlice({
  name: 'coverLetter',
  initialState,
  reducers: {
    clearCoverLetter: (state) => {
      const {
        position,
        companyName,
        recipient,
        recipientType,
        currentPosition,
        currentEmployer,
        referrer,
        referrerType,
        shouldSave,
      } = initialState;

      state.position = position;
      state.companyName = companyName;
      state.recipient = recipient;
      state.recipientType = recipientType;
      state.currentPosition = currentPosition;
      state.currentEmployer = currentEmployer;
      state.referrer = referrer;
      state.referrerType = referrerType;
      state.shouldSave = shouldSave;
    },
    updateCoverLetter: (state, action) => {
      const {
        position,
        companyName,
        recipient,
        recipientType,
        currentPosition,
        currentEmployer,
        referrer,
        referrerType,
        shouldSave,
      } = action.payload || {};

      state.position = position;
      state.companyName = companyName;
      state.recipient = recipient;
      state.recipientType = recipientType;
      state.currentPosition = currentPosition;
      state.currentEmployer = currentEmployer;
      state.referrer = referrer;
      state.referrerType = referrerType;
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
