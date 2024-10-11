import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AxiosService from '../utils/AxiosService'

export const fetchTour = createAsyncThunk(
    'tour/fetchTour',
    async () => {
      try {
        const {data} = await axios.get('https://book-holiday.onrender.com/program/upcomming');
        console.log('Upcomming:', data); 
        return data;
      } catch (error) {
        console.error('API Error:', error);  
        throw error;
      }
    }
  );

export const fetchTopRated = createAsyncThunk('tour/Fetchtop-rated', async () => {
  try {
    const {data} = await axios.get('https://book-holiday.onrender.com/program/top-rated');
    console.log('Fetched Top Rated Data:', data); 
    return data;
  } catch (error) {
    console.error('API Error:', error);  
    throw error;
  }
});

export const fetchBeach = createAsyncThunk('tour/Fetcht-beach', async () => {
  try {
    const {data} = await axios.get('https://book-holiday.onrender.com/program/beach');
    console.log('Fetched Top beaches:', data); 
    return data;
  } catch (error) {
    console.error('API Error:', error);  
    throw error;
  }
});

export const fetchAdventure = createAsyncThunk('tour/Fetcht-adventure', async () => {
  try {
    const {data} = await axios.get('https://book-holiday.onrender.comprogram/adventure');
    console.log('Fetched Top adeventure:', data); 
    return data;
  } catch (error) {
    console.error('API Error:', error);  
    throw error;
  }
});

export const fetchHillsStation = createAsyncThunk('tour/Fetcht-hills-station', async () => {
  try {
    const {data} = await axios.get('https://book-holiday.onrender.com/program/hills');
    console.log('Fetched Top hills :', data); 
    return data;
  } catch (error) {
    console.error('API Error:', error);  
    throw error;
  }
})

export const fetchREligious = createAsyncThunk('tour/Fetcht-religious', async () => {
  try {
    const {data} = await axios.get('https://book-holiday.onrender.com/program/religeos');
    console.log('Fetched Top religious :', data); 
    return data;
  } catch (error) {
    console.error('API Error:', error);  
    throw error;
  }
});

export const fetchHeritage = createAsyncThunk('tour/Fetcht-heritage', async () => {
  try {
    const {data} = await axios.get('https://book-holiday.onrender.com/program/heritage');
    console.log('Fetched Top heritage :', data); 
    return data;
  } catch (error) {
    console.error('API Error:', error);  
    throw error;
  }
});

export const honeymoonPackeages = createAsyncThunk('tour/honeymoon',async()=>{
  try {
    const {data} = await axios.get('https://book-holiday.onrender.com/program/top-honeymoon-packeages')
    console.log('Fetched Top honeymoon pac:', data); 

    return data
    
  } catch (error) {
    console.error('API Error:', error);  
    throw error;
  }
})

export const getAllPrograms = createAsyncThunk('tour/honeymoon',async()=>{
  try {
    const {data} = await axios.get('https://book-holiday.onrender.com/program/all-programs')
    console.log('Get All Programs :', data); 

    return data
    
  } catch (error) {
    console.error('API Error:', error);  
    throw error;
  }
})