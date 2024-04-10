import { configureStore } from '@reduxjs/toolkit'
import hotelSlice from './slices/hotel.slice'
import appSlice from './slices/app.slice'

export default configureStore({
  reducer: {
    hotels: hotelSlice,
    app: appSlice,
  },
})
