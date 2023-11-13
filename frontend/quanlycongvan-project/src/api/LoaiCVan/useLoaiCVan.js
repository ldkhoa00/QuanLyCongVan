import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getLoaiCVan, deleteLoaiCVan,getLoaiCVanById,addLoaiCVan,updateLoaiCVan } from './loaicvanApi';

//Sử dụng react-query khai báo các hooks
export const useGetLoaiCVan = () => {
    return useQuery('loaicvanData', getLoaiCVan);
};


export const useGetLoaiCVanById = (id) => {

    return useQuery(['loaicvanData', id], () => getLoaiCVanById(id));
}

export const useDeleteLoaiCVan = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteLoaiCVan, {//useMutation: nhận 1 hàm trả về promised
        onSuccess: () => {
            queryClient.invalidateQueries('loaicvanData'); //invalidateQueries: gửi yêu cầu cập nhật dữ liệu của key 'data'
        }
    })
}

export const useAddLoaiCVan = () => {
    const queryClient = useQueryClient();

    return useMutation(addLoaiCVan, {
        onSuccess: () => {
            queryClient.invalidateQueries('loaicvanData');
        }
    })
}

export const useUpdateLoaiCVan = () => {
    const queryClient = useQueryClient();

    return useMutation(updateLoaiCVan, {
        onSuccess: () => {
            queryClient.invalidateQueries('loaicvanData');
        }
    })
}