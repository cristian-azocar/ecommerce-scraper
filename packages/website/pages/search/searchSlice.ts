import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SORT_KEY } from '../../constants';
import { EnhancedProduct } from './types';

export interface SearchState {
  products: EnhancedProduct[];
}

const initialState: SearchState = {
  products: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    filter: (
      state,
      action: PayloadAction<{ name: string; value: string; checked: boolean }>
    ) => {
      const { name, value, checked } = action.payload;
      const urlParams = new URLSearchParams(window.location.search);
      const filterValues = urlParams.getAll(name);

      if (checked) {
        filterValues.push(value);
      } else {
        const index = filterValues.indexOf(value);
        filterValues.splice(index, 1);
      }

      urlParams.delete(name);

      filterValues.forEach((filterValue) => {
        urlParams.append(name, filterValue);
      });

      window.location.search = urlParams.toString();
    },
    sort: (state, action: PayloadAction<string>) => {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set(SORT_KEY, action.payload);

      window.location.search = urlParams.toString();
    },
  },
});

export const { filter, sort } = searchSlice.actions;

export default searchSlice;
