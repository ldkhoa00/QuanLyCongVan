import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { FaTrash } from 'react-icons/fa';
import { useDeleteNhanVien } from '../../../api/NhanVien/useNhanVien';



const QLXoaNhanVien = ({ nhanvienID }) => {
    const deleteNhanVien = useDeleteNhanVien();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = () => {
        onDeleteNhanVien(nhanvienID); // Gọi hàm xóa dữ liệu với nhanvienID
        handleClose(); // Sau khi xóa, đóng hộp thoại
    }

    const onDeleteNhanVien = async (id) => {
        await deleteNhanVien.mutateAsync(id);
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
                    Xóa nhân viên
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

export default QLXoaNhanVien;