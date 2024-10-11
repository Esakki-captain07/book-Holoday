import React,{useEffect, useState} from 'react'
import TopBar from '../TopBar'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
function SiginedUsers() {
  const [data,setData] = useState([])

  const getData = async()=>{
    try {
      let{data, message} = await AxiosService.get(ApiRoutes.GET_ALLUSERS.path,{authenticate:ApiRoutes.GET_ALLUSERS.auth})
      setData(data)
      
    } catch (error) {
      console.error(error.response?.data || error.message);

    }
  }

  useEffect(()=>{
    getData()
  },[])
  return <>
  <TopBar/>
  <h1>sigined users</h1>
  <div className="table-container">
          <div className="responsive-table">
            <div className="table-header">
              <div>Name</div>
              <div>Email</div>
              <div>Mobile</div>
              <div>Date</div>
            </div>

            {data.map((item, i) => (
              <div key={i} className="table-row">
                <div>{`${item.firstName} ${item.lastName}`}</div>
                <div>{item.email}</div>
                <div>{item.mobile || 'NA'}</div>
                <div>{new Date(item.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
  </>
}

export default SiginedUsers
