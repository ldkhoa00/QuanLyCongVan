import axios from 'axios';

const phongbanApi = axios.create({
    baseURL: "http://localhost:8000"
})

export const getPhongBan = async (phongban) => {
    const response = await phongbanApi.get("/phongbans/", phongban)
    return response.data;
}

export const getPhongBanById = async (id) => {
    const response = await phongbanApi.get(`/phongbans/${id}`, id)
    return response.data;
}

export const addPhongBan = async ( phongban ) => {
    return await phongbanApi.post(`/phongbans/`, phongban)
}

export const updatePhongBan = async (phongban) => {
    return await phongbanApi.patch(`/phongbans/${phongban.phongbanID}`, phongban)
}

export const deletePhongBan = async (id) => {
    return await phongbanApi.delete(`/phongbans/${id}`, id)
}

export default phongbanApi;