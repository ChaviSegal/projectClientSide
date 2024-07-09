import axios from "axios";

let baseUrl = "http://localhost:4000/api/user";//להירשם

export const login = (user) => {
  return axios.post(`${baseUrl}/login`,user);

};


export const addUser = (user) => {
    return axios.post(`${baseUrl}`,user);
   
  };