import axios from "axios";


let baseUrl = "http://localhost:4000/api/product"

export const getProductById = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}

export const getAllProducts = (page) => {
  return axios.get(baseUrl+"/?page="+page)
}

export const addProduct = (product, token) => {
  // console.log(token)
  return axios.post(baseUrl, product, { headers: { "x-access-token": token  } })
}

export const deleteProduct = (id, token) => {
  return axios.delete(`${baseUrl}/${id}`, { headers: { "x-access-token": token  } })
}

export const getProductByCategory = (desc, page, perPage) => {
  console.log(`${baseUrl}/category/${desc}?perPage=${perPage}&page=${page}`);
  return axios.get(
    `${baseUrl}/category/${desc}?perPage=${perPage}&page=${page}`
  );
}; 

export const amountProduct = (category) => {
  return axios.get(`${baseUrl}/count/${category}`);
};



