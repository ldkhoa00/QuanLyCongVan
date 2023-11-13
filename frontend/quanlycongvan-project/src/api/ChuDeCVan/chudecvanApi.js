import axios from 'axios';

const chudecvanApi = axios.create({
    baseURL: "http://localhost:8000"
})

export const getChuDeCVan = async (chudecvan) => {
    const response = await chudecvanApi.get("/chudecvans/", chudecvan)
    return response.data;
}

export const getChuDeCVanById = async (id) => {
    const response = await chudecvanApi.get(`/chudecvans/${id}`, id)
    return response.data;
}

export const addChuDeCVan = async ( chudecvan ) => {
    return await chudecvanApi.post(`/chudecvans/`, chudecvan)
}

export const updateChuDeCVan = async (chudecvan) => {
    return await chudecvanApi.patch(`/chudecvans/${chudecvan.chudecvanID}`, chudecvan)
}

export const deleteChuDeCVan = async (id) => {
    return await chudecvanApi.delete(`/chudecvans/${id}`, id)
}

export default chudecvanApi;