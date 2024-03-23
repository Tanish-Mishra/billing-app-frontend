import React from 'react'
import axios from 'axios';

const BACKENDURI = import.meta.env.VITE_BACKEND_URI;
export const getBills = async() => {
  try {
    const reqUrl = `${BACKENDURI}/bill/all-bills`
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(reqUrl)
    return response.data
  } catch (error) {
      console.log(error)
  }
}
export const createBill = async() => {
  try {
    const reqUrl = `${BACKENDURI}/bill/create-bill`
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.post(reqUrl,{clientName, contactNo, totalAmount})
    return response.data
  } catch (error) {
      console.log(error)
  }
}

