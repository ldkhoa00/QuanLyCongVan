import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getLinhVuc, deleteLinhVuc,getLinhVucById,addLinhVuc,updateLinhVuc } from './linhvucApi';

//Sử dụng react-query khai báo các hooks
export const useGetLinhVuc = () => {
    return useQuery('linhvucData', getLinhVuc);
};


export const useGetLinhVucById = (id) => {

    return useQuery(['linhvucData', id], () => getLinhVucById(id));
}

export const useDeleteLinhVuc = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteLinhVuc, {//useMutation: nhận 1 hàm trả về promised
        onSuccess: () => {
            queryClient.invalidateQueries('linhvucData'); //invalidateQueries: gửi yêu cầu cập nhật dữ liệu của key 'data'
        }
    })
}

export const useAddLinhVuc = () => {
    const queryClient = useQueryClient();

    return useMutation(addLinhVuc, {
        onSuccess: () => {
            queryClient.invalidateQueries('linhvucData');
        }
    })
}

export const useUpdateLinhVuc = () => {
    const queryClient = useQueryClient();

    return useMutation(updateLinhVuc, {
        onSuccess: () => {
            queryClient.invalidateQueries('linhvucData');
        }
    })
}