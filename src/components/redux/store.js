import {configureStore} from '@reduxjs/toolkit'
import tourReducer from './tour.js'

export default configureStore({
    reducer:{
        tour:tourReducer
    }
})