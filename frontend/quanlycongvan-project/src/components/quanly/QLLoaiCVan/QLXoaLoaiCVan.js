import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { FaTrash } from 'react-icons/fa';
import { useDeleteLoaiCVan } from '../../../api/LoaiCVan/useLoaiCVan';



const QLXoaLoaiCVan = ({ loaicvanID }) => {
    //react-query Hooks
    const deleteLoaiCVan = useDeleteLoaiCVan();

    //State
    const [open, setOpen] = useState(false);

    //Fucntion
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    //Fucntion xóa loại công văn
    const onDeleteLoaiCVan = async (id) => {
        await deleteLoaiCVan.mutateAsync(id);
    }
    const handleDelete = () => {
        onDeleteLoaiCVan(loaicvanID); // Gọi hàm xóa dữ liệu với loaicvanID
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
                    Xóa loại công văn
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

export default QLXoaLoaiCVan;