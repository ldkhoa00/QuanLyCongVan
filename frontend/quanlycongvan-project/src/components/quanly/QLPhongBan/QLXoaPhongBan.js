import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { FaTrash } from 'react-icons/fa';
import { useDeletePhongBan } from '../../../api/PhongBan/usePhongBan';



const QLXoaPhongBan = ({ phongbanID }) => {
    //react-query Hooks
    const deletePhongBan = useDeletePhongBan();

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
    const onDeletePhongBan = async (id) => {
        await deletePhongBan.mutateAsync(id);
    }
    const handleDelete = () => {
        onDeletePhongBan(phongbanID); // Gọi hàm xóa dữ liệu với nhanvienID
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

export default QLXoaPhongBan;