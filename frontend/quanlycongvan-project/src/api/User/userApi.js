import axios from 'axios';

const userApi = axios.create({
    baseURL: "http://localhost:8000"
})

// Thêm interceptors để cấu hình request trước khi được gửi đi
userApi.interceptors.request.use(config => {
    // Thêm header vào request
    config.headers['auth-token'] = localStorage.getItem("token");
    return config;
}, error => {
    // Xử lý lỗi nếu có
    return Promise.reject(error);
});

export const registerUser = async (user) => {
    return await userApi.post(`/users/register`, user)
}

export const loginUser = async (user) => {
    return await userApi.post(`/users/login`, user)
}

export const getUser = async (user) => {
    const response = await userApi.get("/users", user)
    return response.data;
}

export const getUserById = async (id) => {
    const response = await userApi.get(`/users/${id}`, id)
    return response.data;
}


export const deleteUser = async (id) => {
    return await userApi.delete(`/users/${id}`, id)
}


export default userApi;