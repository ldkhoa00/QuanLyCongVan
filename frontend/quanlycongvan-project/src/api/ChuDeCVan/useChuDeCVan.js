import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getChuDeCVan, deleteChuDeCVan,getChuDeCVanById,addChuDeCVan,updateChuDeCVan } from './chudecvanApi';

//Sử dụng react-query khai báo các hooks
export const useGetChuDeCVan = () => {
    return useQuery('chudecvanData', getChuDeCVan);
};


export const useGetChuDeCVanById = (id) => {

    return useQuery(['chudecvanData', id], () => getChuDeCVanById(id));
}

export const useDeleteChuDeCVan = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteChuDeCVan, {//useMutation: nhận 1 hàm trả về promised
        onSuccess: () => {
            queryClient.invalidateQueries('chudecvanData'); //invalidateQueries: gửi yêu cầu cập nhật dữ liệu của key 'data'
        }
    })
}

export const useAddChuDeCVan = () => {
    const queryClient = useQueryClient();

    return useMutation(addChuDeCVan, {
        onSuccess: () => {
            queryClient.invalidateQueries('chudecvanData');
        }
    })
}

export const useUpdateChuDeCVan = () => {
    const queryClient = useQueryClient();

    return useMutation(updateChuDeCVan, {
        onSuccess: () => {
            queryClient.invalidateQueries('chudecvanData');
        }
    })
}