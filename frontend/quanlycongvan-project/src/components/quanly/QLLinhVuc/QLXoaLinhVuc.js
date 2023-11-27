import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { FaTrash } from 'react-icons/fa';
import { useDeleteLinhVuc } from '../../../api/LinhVuc/useLinhVuc';



const QLXoaLinhVuc = ({ linhvucID }) => {
    //react-query Hooks
    const deleteLinhVuc = useDeleteLinhVuc();

    //State
    const [open, setOpen] = useState(false);

    //Fucntion
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    //Fucntion xóa lĩnh vực
    const onDeleteLinhVuc = async (id) => {
        await deleteLinhVuc.mutateAsync(id);
    }
    const handleDelete = () => {
        onDeleteLinhVuc(linhvucID); // Gọi hàm xóa dữ liệu với linhvucID
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
                    Xóa lĩnh vực
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

export default QLXoaLinhVuc;