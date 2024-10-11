import { createSlice } from '@reduxjs/toolkit';
import { fetchTour, fetchTopRated, fetchBeach,honeymoonPackeages, fetchAdventure, fetchHillsStation, fetchREligious, fetchHeritage } from './GetTourRequest';

export const tourSlice = createSlice({
    name: 'tour',
    initialState: {
      tour: [],  
      topRated: [],  
      beach: [],  
      honeymoon:[],
      adventure:[],
      hills:[],
      religious:[],
      heritage:[],
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTour.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchTour.fulfilled, (state, action) => {
          state.status = 'completed';
          state.tour = action.payload || [];  
        })
        .addCase(fetchTour.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
  
        // Handle top-rated
        .addCase(fetchTopRated.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchTopRated.fulfilled, (state, action) => {
          state.status = 'completed';
          state.topRated = action.payload || [];  
        })
        .addCase(fetchTopRated.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })

        // Handle beach
        .addCase(fetchBeach.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchBeach.fulfilled, (state, action) => {
          state.status = 'completed';
          state.beach = action.payload || []; 
        })
        .addCase(fetchBeach.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })

        //honeymoon

         .addCase(honeymoonPackeages.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(honeymoonPackeages.fulfilled, (state, action) => {
          state.status = 'completed';
          state.honeymoon = action.payload || []; 
        })
        .addCase(honeymoonPackeages.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })


        .addCase(fetchAdventure.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchAdventure.fulfilled, (state, action) => {
          state.status = 'completed';
          state.adventure = action.payload || []; 
        })
        .addCase(fetchAdventure.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })

        .addCase(fetchHillsStation.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchHillsStation.fulfilled, (state, action) => {
          state.status = 'completed';
          state.hills = action.payload || []; 
        })
        .addCase(fetchHillsStation.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })

        .addCase(fetchREligious.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchREligious.fulfilled, (state, action) => {
          state.status = 'completed';
          state.religious = action.payload || []; 
        })
        .addCase(fetchREligious.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })

        .addCase(fetchHeritage.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchHeritage.fulfilled, (state, action) => {
          state.status = 'completed';
          state.heritage = action.payload || []; 
        })
        .addCase(fetchHeritage.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })

    },
});
  
export default tourSlice.reducer;
