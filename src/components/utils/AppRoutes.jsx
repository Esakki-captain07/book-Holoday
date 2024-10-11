import Login from "../Login";
import {Navigate} from 'react-router-dom'
import Home from "../Home";
import ViewTour from "../ViewTour";
import Themes from "../Themes";
import CreateProgram from "../admin/CreateProgram";
import SiginedUsers from "../admin/SiginedUsers";
import AllBookings from "../admin/AllBookings";
import Adventure from "../Adventure";
import HillStation from "../HillStation";
import Religious from "../Religious";
import Heritage from '../Heritage'
import UserProfile from "../UserProfile";
import SignUp from '../SignUp'

export default[
    {
        path:'/',
        element:<Home/>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/view-tour/:tourId',
        element:<ViewTour/>
    },
    {
        path:'themes-explore',
        element:<Themes/>
    },
    {
        path:'create-program',
        element:<CreateProgram/>
    },
    {
        path:'all-users',
        element:<SiginedUsers/>
    },
    {
        path:'all-bookings',
        element:<AllBookings/>
    },
    {
        path:'adventures',
        element:<Adventure/>
    },
    {
        path:'hill-stations',
        element:<HillStation/>
    },
    {
        path:'religious',
        element:<Religious/>
    },
    {
        path:'heritage',
        element:<Heritage/>
    },
    {
        path:'/profile',
        element:<UserProfile/>
    },
    {
        path:'/signup',
        element:<SignUp/>
    },
    {

        path:'/*',
        element:<Navigate to='/'/>
    },

]