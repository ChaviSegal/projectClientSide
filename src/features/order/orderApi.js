import axios from "axios";

let baseUrl = "http://localhost:4000/api/order";

export const addOrder = (order,token) => {
  const headers={
      "x-access-token":token
  }
  return axios.post(baseUrl,order,{headers})
}

  export const getAllOrders = (page) => {
    return axios.get(baseUrl+"/?page="+page);
  };
  