import http from "/home/ahmed/Documents/vue-projects/exam-system/src/services/httpcommon.js";

class DataService {

  //CAPTCHA ENDPOINT
  getCaptcha = () => {
    return http.get("/captcha/getCaptcha.php");
  };

  //SPLASH ENDPOINT
  getSplash = () => {
    return http.get("/splash/getSplash.php");
  };

  //USERS ENDPOINTS
  login = (credentials) => {
    return http.post("/users/login.php", credentials);
  };


  //SCHOOLS ENDPOINTS
  createSchool = (data) => {
    return http.post("/schools/createSchool.php", data);
  };

  updateSchool = (id, data) => {
    return http.put(`/schools/editSchool.php?id=${id}`, data);
  };

  deleteSchool = (id) => {
    return http.delete(`/schools/removeSchool.php`, {
      data: { id },
    });
  };

  //STUDENTS ENDPOINTS
  newStudent = (data) => {
    return http.post("/products/addStudent.php", data);
  };

  updateStudent = (id, data) => {
    return http.put(`/products/editStudent.php?id=${id}`, data);
  };

  removeStudent = (id) => {
    return http.delete(`/products/deleteStudent.php`, {
      data: { id },
    });
  };


  //PRODUCTS ENDPOINTS
  // getProductById = (id) => {
  //   return http.get(`/products/getSingleProduct.php?id=${id}`);
  // };

  // createProduct = (data) => {
  //   return http.post("/products/addProduct.php", data);
  // };

  // updateProduct = (id, data) => {
  //   return http.put(`/products/updateProduct.php?id=${id}`, data);
  // };

  // deleteProduct = (id) => {
  //   return http.delete(`/products/deleteProduct.php`, {
  //     data: { id },
  //   });
  // };

}

export default new DataService();
