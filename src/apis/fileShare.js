import React from 'react'
import axios from 'axios';
const BACKENDURI = import.meta.env.VITE_BACKEND_URI;
const fileShare = async(formData) => {
    try {
        const reqUrl = `${BACKENDURI}/file`
        const token = localStorage.getItem("token")
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.post(reqUrl,formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        return response
    
      } catch (error) {
          console.log(error)
      }
}

export default fileShare