import axiosService from "./request";

const mockService = {
  get: (params) => axiosService.get("/posts", { params }),
};

export default mockService;
