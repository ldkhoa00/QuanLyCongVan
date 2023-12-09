import axios from 'axios';

const loaicvanApi = axios.create({
    baseURL: "http://localhost:8000"
})

// Thêm interceptors để cấu hình request trước khi được gửi đi
loaicvanApi.interceptors.request.use(config => {
    // Thêm header vào request
    config.headers['auth-token'] = localStorage.getItem("token");
    return config;
}, error => {
    // Xử lý lỗi nếu có
    return Promise.reject(error);
});


export const getLoaiCVan = async (loaicvan) => {
    const response = await loaicvanApi.get("/loaicvans/", loaicvan)
    return response.data;
}

export const getLoaiCVanById = async (id) => {
    const response = await loaicvanApi.get(`/loaicvans/${id}`, id)
    return response.data;
}

export const addLoaiCVan = async (loaicvan) => {
    return await loaicvanApi.post(`/loaicvans/`, loaicvan)
}

export const updateLoaiCVan = async (loaicvan) => {
    return await loaicvanApi.patch(`/loaicvans/${loaicvan.loaicvanID}`, loaicvan)
}

export const deleteLoaiCVan = async (id) => {
    return await loaicvanApi.delete(`/loaicvans/${id}`, id)
}

export default loaicvanApi;