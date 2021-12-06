import axios from './axiosInterceptor'
import { apiMethod } from '../configs/constants'

export const signIn=(username,password)=>{
   return axios.post(`${apiMethod}usr=${username}&pwd=${password}`)
}