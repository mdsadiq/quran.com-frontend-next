import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectReadingPreference,
  setReadingPreference,
} from 'src/redux/slices/QuranReader/readingPreferences';
import { ReadingPreference } from '../QuranReader/types';

const ReadingPreferenceAdjustment = () => {
  const dispatch = useDispatch();
  const quranReadingPreference = useSelector(selectReadingPreference);
  const availableReadingPreferences = [];

  Object.values(ReadingPreference).forEach((font) => availableReadingPreferences.push(font));

  return (
    <>
      {/* Reading Preference */}
      <label htmlFor="font-styles">
        Reading preference{' '}
        <select
          name="font-styles"
          onChange={(event) =>
            dispatch({ type: setReadingPreference.type, payload: event.target.value })
          }
          value={quranReadingPreference}
        >
          {availableReadingPreferences.map((readingPreference) => (
            <option key={readingPreference} value={readingPreference}>
              {readingPreference}
            </option>
          ))}
        </select>
      </label>
    </>
  );
};

export default ReadingPreferenceAdjustment;
