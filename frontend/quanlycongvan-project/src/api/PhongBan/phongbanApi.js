import axios from 'axios';

const phongbanApi = axios.create({
    baseURL: "http://localhost:8000"
})

// Thêm interceptors để cấu hình request trước khi được gửi đi
phongbanApi.interceptors.request.use(config => {
    // Thêm header vào request
    config.headers['auth-token'] = localStorage.getItem("token");
    return config;
}, error => {
    // Xử lý lỗi nếu có
    return Promise.reject(error);
});


export const getPhongBan = async (phongban) => {
    const response = await phongbanApi.get("/phongbans/", phongban)
    return response.data;
}

export const getPhongBanById = async (id) => {
    const response = await phongbanApi.get(`/phongbans/${id}`, id)
    return response.data;
}

export const addPhongBan = async (phongban) => {
    return await phongbanApi.post(`/phongbans/`, phongban)
}

export const updatePhongBan = async (phongban) => {
    return await phongbanApi.patch(`/phongbans/${phongban.phongbanID}`, phongban)
}

export const deletePhongBan = async (id) => {
    return await phongbanApi.delete(`/phongbans/${id}`, id)
}

export default phongbanApi;