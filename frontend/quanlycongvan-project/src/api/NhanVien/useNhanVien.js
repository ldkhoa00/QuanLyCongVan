import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getNhanVien, deleteNhanVien, getNhanVienById, addNhanVien, updateNhanVien } from './nhanvienApi';

//Sử dụng react-query khai báo các hooks
export const useGetNhanVien = () => {
    return useQuery('nhanvienData', getNhanVien);
};


export const useGetNhanVienById = (id) => {

    return useQuery(['nhanvienData', id], () => getNhanVienById(id));
}

export const useDeleteNhanVien = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteNhanVien, {//useMutation: nhận 1 hàm trả về promised
        onSuccess: () => {
            queryClient.invalidateQueries('nhanvienData'); //invalidateQueries: gửi yêu cầu cập nhật dữ liệu của key 'data'
        }
    })
}

export const useAddNhanVien = () => {
    const queryClient = useQueryClient();

    return useMutation(addNhanVien, {
        onSuccess: () => {
            queryClient.invalidateQueries('nhanvienData');
        }
    })
}

export const useUpdateNhanVien = () => {
    const queryClient = useQueryClient();

    return useMutation(updateNhanVien, {
        onSuccess: () => {
            queryClient.invalidateQueries('nhanvienData');
        }
    })
}