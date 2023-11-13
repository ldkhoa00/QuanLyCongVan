import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getPhongBan, deletePhongBan,getPhongBanById,addPhongBan,updatePhongBan } from './phongbanApi';

//Sử dụng react-query khai báo các hooks
export const useGetPhongBan = () => {
    return useQuery('phongbanData', getPhongBan);
};


export const useGetPhongBanById = (id) => {

    return useQuery(['phongbanData', id], () => getPhongBanById(id));
}

export const useDeletePhongBan = () => {
    const queryClient = useQueryClient();

    return useMutation(deletePhongBan, {//useMutation: nhận 1 hàm trả về promised
        onSuccess: () => {
            queryClient.invalidateQueries('phongbanData'); //invalidateQueries: gửi yêu cầu cập nhật dữ liệu của key 'data'
        }
    })
}

export const useAddPhongBan = () => {
    const queryClient = useQueryClient();

    return useMutation(addPhongBan, {
        onSuccess: () => {
            queryClient.invalidateQueries('phongbanData');
        }
    })
}

export const useUpdatePhongBan = () => {
    const queryClient = useQueryClient();

    return useMutation(updatePhongBan, {
        onSuccess: () => {
            queryClient.invalidateQueries('phongbanData');
        }
    })
}