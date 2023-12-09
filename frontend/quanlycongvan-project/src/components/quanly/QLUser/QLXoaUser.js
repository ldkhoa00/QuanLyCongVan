import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { FaTrash } from 'react-icons/fa';
import { useDeleteUser } from '../../../api/User/useUser';




const QLXoaUser = ({ userID }) => {
    //react-query Hooks
    const deleteUser = useDeleteUser();

    //State
    const [open, setOpen] = useState(false);

    //Fucntion
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    //Fucntion xóa phòng ban
    const onDeleteUser = async (id) => {
        await deleteUser.mutateAsync(id);
    }
    const handleDelete = () => {
        onDeleteUser(userID); // Gọi hàm xóa dữ liệu với userID
        handleClose(); // Sau khi xóa, đóng hộp thoại
    }


    return (
        <Box>
            <IconButton onClick={handleOpen} >
                <FaTrash fontSize="medium" />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Xóa phòng ban
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Không đồng ý</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
};

export default QLXoaUser;