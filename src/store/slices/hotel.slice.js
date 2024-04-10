import { createSlice } from '@reduxjs/toolkit'
import { setIsLoading } from './app.slice';
import axios from '../../utils/axios';

export const hotelSlice = createSlice({
  name: 'hotels',
  initialState: {
    cityId: null,
    name: null,
    price: [0, Infinity], // [min, max]
    allHotels: [],
    filtered: [],
  },
  reducers: {
    setHotels: (state, { payload }) => {
      state.allHotels = payload;
    },
    setFiltered: (state, { payload }) => {
      state.filtered = payload;
    },
    clearFilters: (state) => {
      state.cityId = null;
      state.name = null;
      state.price = [0, Infinity];
    },
    setCityId: (state, { payload }) => {
      state.cityId = payload;
    },
    setName: (state, { payload }) => {
      state.name = payload;
    },
    setPrice: (state, { payload }) => {
      state.price = payload;
    }
  },
})

//                             params = { cityId, name, clear, price: [min, max] }
export const getHotelsThunk = (params = {}) => async (dispatch, getState) => {

  if (params.clear) dispatch(clearFilters());
  if (params.cityId) dispatch(setCityId(params.cityId));
  if (params.name) dispatch(setName(params.name));
  if (params.price) dispatch(setPrice(params.price));

  const queryParams = new URLSearchParams();
  const { cityId, name, price } = getState().hotels;
  if (cityId) queryParams.append('cityId', cityId);
  if (name) queryParams.append('name', name);

  dispatch(setIsLoading(true));
  axios.get(`/hotels`, { params: queryParams })
    .then(res => {
      dispatch(setHotels(res.data))
      const [ min, max ] = price;
      dispatch(setFiltered(filterPrice(res.data, min, max)))
    })
    .finally(() => dispatch(setIsLoading(false)));
}

export const filterPriceThunk = ([min, max]) => (dispatch, getState) => {
  const {allHotels} = getState().hotels;
  const hotelsFiltered = filterPrice(allHotels, min, max);
  dispatch(setPrice([min, max]));
  dispatch(setFiltered(hotelsFiltered));
}

const filterPrice = (hotels, min = 0, max = Infinity) => {
  return hotels.filter(({price}) => 
    (price >= min && price <= max) 
  );
}

export const { 
  setHotels, setFiltered, clearFilters, setCityId, setName, setPrice,
} = hotelSlice.actions

export default hotelSlice.reducer
