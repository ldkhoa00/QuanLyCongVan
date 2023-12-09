import axios from 'axios';

const congvanApi = axios.create({
    baseURL: "http://localhost:8000"
})

congvanApi.interceptors.request.use(config => {
    // Thêm header vào request
    config.headers['auth-token'] = localStorage.getItem("token");
    return config;
}, error => {
    // Xử lý lỗi nếu có
    return Promise.reject(error);
});

export const getCongVan = async (congvan) => {
    const response = await congvanApi.get("/congvans/", congvan)
    return response.data;
}

export const getCongVanById = async (id) => {
    const response = await congvanApi.get(`/congvans/${id}`, id)
    return response.data;
}

export const addCongVan = async (congvan) => {
    const formData = new FormData();
    for (const key in congvan) {
        formData.append(key, congvan[key]);
    }
    return await congvanApi.post(`/congvans/`, formData)
}

export const updateCongVan = async (congvan) => {
    console.log(congvan)
    const formData = new FormData();
    for (const key in congvan) {
        formData.append(key, congvan[key]);
    }
    return await congvanApi.patch(`/congvans/${congvan.congvanID}`, formData)
}

export const deleteCongVan = async (id) => {
    return await congvanApi.delete(`/congvans/${id}`, id)
}

//Xóa 1 list
// export const deleteCongVanList = async (idList) => {
//     return await congvanApi.delete('/congvan/deleteList', { data: idList });
// }

export default congvanApi;