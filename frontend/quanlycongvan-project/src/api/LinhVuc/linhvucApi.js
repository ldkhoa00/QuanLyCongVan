import axios from 'axios';

const linhvucApi = axios.create({
    baseURL: "http://localhost:8000"
})

linhvucApi.interceptors.request.use(config => {
    // Thêm header vào request
    config.headers['auth-token'] = localStorage.getItem("token");
    return config;
}, error => {
    // Xử lý lỗi nếu có
    return Promise.reject(error);
});

export const getLinhVuc = async (linhvuc) => {
    const response = await linhvucApi.get("/linhvucs/", linhvuc)
    return response.data;
}

export const getLinhVucById = async (id) => {
    const response = await linhvucApi.get(`/linhvucs/${id}`, id)
    return response.data;
}

export const addLinhVuc = async (linhvuc) => {
    return await linhvucApi.post(`/linhvucs/`, linhvuc)
}

export const updateLinhVuc = async (linhvuc) => {
    return await linhvucApi.patch(`/linhvucs/${linhvuc.linhvucID}`, linhvuc)
}

export const deleteLinhVuc = async (id) => {
    return await linhvucApi.delete(`/linhvucs/${id}`, id)
}

export default linhvucApi;