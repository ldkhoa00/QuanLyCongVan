import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getCongVan, deleteCongVan,getCongVanById,addCongVan,updateCongVan } from './congvanApi';

//Sử dụng react-query khai báo các hooks
export const useGetCongVan = () => {
    return useQuery('congvanData', getCongVan);
};


export const useGetCongVanById = (id) => {

    return useQuery(['congvanData', id], () => getCongVanById(id));
}

export const useDeleteCongVan = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteCongVan, {//useMutation: nhận 1 hàm trả về promised
        onSuccess: () => {
            queryClient.invalidateQueries('congvanData'); //invalidateQueries: gửi yêu cầu cập nhật dữ liệu của key 'data'
        }
    })
}

//Xóa list
// export const useDeleteCongVanList = () => {
//     const queryClient = useQueryClient();

//     return useMutation(deleteCongVanList, {
//         onSuccess: () => {
//             queryClient.invalidateQueries('congvanData');
//         }
//     })
// }

export const useAddCongVan = () => {
    const queryClient = useQueryClient();

    return useMutation(addCongVan, {
        onSuccess: () => {
            queryClient.invalidateQueries('congvanData');
        }
    })
}

export const useUpdateCongVan = () => {
    const queryClient = useQueryClient();

    return useMutation(updateCongVan, {
        onSuccess: () => {
            queryClient.invalidateQueries('congvanData');
        }
    })
}