import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReadingPreference, WordByWordType } from 'src/components/QuranReader/types';
import resetSettings from '../reset-settings';

const DEFAULT_TRANSLATION = 20; // just a placeholder.
const DEFAULT_TRANSLITERATION = 12; // just a placeholder.

export type ReadingPreferences = {
  readingPreference: ReadingPreference;
  showWordByWordTranslation: boolean;
  selectedWordByWordTranslation: number;
  showWordByWordTransliteration: boolean;
  selectedWordByWordTransliteration: number;
  showTooltipFor: WordByWordType[];
};

const initialState: ReadingPreferences = {
  readingPreference: ReadingPreference.Translation,
  showWordByWordTranslation: false,
  selectedWordByWordTranslation: DEFAULT_TRANSLATION,
  showWordByWordTransliteration: false,
  selectedWordByWordTransliteration: DEFAULT_TRANSLITERATION,
  showTooltipFor: [WordByWordType.Translation],
};

export const readingPreferencesSlice = createSlice({
  name: 'readingPreferences',
  initialState,
  reducers: {
    setReadingPreference: (state, action: PayloadAction<ReadingPreference>) => ({
      ...state,
      readingPreference: action.payload,
    }),
    setShowWordByWordTranslation: (state, action: PayloadAction<boolean>) => ({
      ...state,
      showWordByWordTranslation: action.payload,
    }),
    setShowWordByWordTransliteration: (state, action: PayloadAction<boolean>) => ({
      ...state,
      showWordByWordTransliteration: action.payload,
    }),
    setSelectedWordByWordTranslation: (state, action: PayloadAction<number>) => ({
      ...state,
      selectedWordByWordTranslation: action.payload,
    }),
    setSelectedWordByWordTransliteration: (state, action: PayloadAction<number>) => ({
      ...state,
      selectedWordByWordTransliteration: action.payload,
    }),
    setShowTooltipFor: (state, action: PayloadAction<WordByWordType[]>) => ({
      ...state,
      showTooltipFor: action.payload,
    }),
  },
  // reset the state to initial state
  // when `reset` action is dispatched
  extraReducers: (builder) => {
    builder.addCase(resetSettings, () => initialState);
  },
});

export const {
  setReadingPreference,
  setShowWordByWordTranslation,
  setShowWordByWordTransliteration,
  setSelectedWordByWordTranslation,
  setSelectedWordByWordTransliteration,
  setShowTooltipFor,
} = readingPreferencesSlice.actions;

export const selectReadingPreferences = (state) => state.readingPreferences as ReadingPreferences;
export const selectReadingPreference = (state) => state.readingPreferences.readingPreference;

export default readingPreferencesSlice.reducer;
