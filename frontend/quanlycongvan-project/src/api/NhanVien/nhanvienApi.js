import axios from 'axios';

const nhanvienApi = axios.create({
    baseURL: "http://localhost:8000"
})

// Thêm interceptors để cấu hình request trước khi được gửi đi
nhanvienApi.interceptors.request.use(config => {
    // Thêm header vào request
    config.headers['auth-token'] = localStorage.getItem("token");
    return config;
}, error => {
    // Xử lý lỗi nếu có
    return Promise.reject(error);
});


export const getNhanVien = async (nhanvien) => {
    const response = await nhanvienApi.get("/nhanviens/", nhanvien)
    return response.data;
}

export const getNhanVienById = async (id) => {
    const response = await nhanvienApi.get(`/nhanviens/${id}`, id)
    return response.data;
}

export const addNhanVien = async (nhanvien) => {
    return await nhanvienApi.post(`/nhanviens/`, nhanvien)
}

export const updateNhanVien = async (nhanvien) => {
    return await nhanvienApi.patch(`/nhanviens/${nhanvien.nhanvienID}`, nhanvien)
}

export const deleteNhanVien = async (id) => {
    return await nhanvienApi.delete(`/nhanviens/${id}`, id)
}

export default nhanvienApi;