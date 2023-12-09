import { useQuery, useMutation, useQueryClient } from 'react-query';

import {
    registerUser, loginUser, getUser, deleteUser, getUserById
} from './userApi';


import { jwtDecode } from "jwt-decode";

export const useGetUser = () => {
    return useQuery('userData', getUser);
};

// export const useUpdateUserPassword = () => {
//     const queryClient = useQueryClient();
//     return useMutation(updateUserPassword, {
//         onSuccess: () => {
//             queryClient.invalidateQueries('user')
//         }
//     })
// }
export const useGetUserById = (id) => {
    return useQuery(['userData', id], () => getUserById(id));
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteUser, {//useMutation: nhận 1 hàm trả về promised
        onSuccess: () => {
            queryClient.invalidateQueries('userData'); //invalidateQueries: gửi yêu cầu cập nhật dữ liệu của key 'data'
        }
    })
}

export const useRegisterUser = () => {
    const queryClient = useQueryClient();

    return useMutation(registerUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('userData');
        }
    })
}

export const useLoginUser = () => {
    const queryClient = useQueryClient();

    return useMutation(loginUser, {
        onSuccess: (data, user) => {
            if (user.email) {
                localStorage.setItem('email', user.email.toString());
            }
            //Trình duyệt chrome sẽ không update visually các key/value của localStorage in realtime
            localStorage.setItem('token', data.data); // store the token on LocalStorage as a string
            localStorage.setItem('role', jwtDecode(data.data).role) //lấy role từ claims của token
            localStorage.setItem('userID', jwtDecode(data.data)._id)
            queryClient.invalidateQueries('userData');
        },
    })
}
