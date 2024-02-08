import axios from "axios";

export const createProduct = (productData1 , productData2) => {
  return axios
    .post("https://backend.megha1.org/create-product", productData1 , productData2)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const signup = (
  email,
  password,
  role,
  status,
  pharmacyName,
  pharmacyLocation
) => {
  return axios
    .post(`https://backend.megha1.org/signup`, {
      email,
      password,
      role,
      status,
      pharmacyName,
      pharmacyLocation,
    })
    .then((response) => {
      // // Call create-product API after successful signup
      return response.data
    })
    .catch((error) => {
      console.log("Signup Error:", error);
      throw error;
    });
};

export const signin = (email, password, status) => {
  return axios
    .post(`https://backend.megha1.org/signin`, {
      email,
      password,
      status,
    })
    .then((response) => {
      console.log( response.data)
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const signout = () => {
  return axios
    .get(`https://backend.megha1.org/signout`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const fetchPharmacyUsers = () => {
  return axios
    .get(`https://backend.megha1.org/pharmacy-users`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
