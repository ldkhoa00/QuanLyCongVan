import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { FaTrash } from 'react-icons/fa';
import { useDeleteCongVan } from '../../api/CongVan/useCongVan';



const CVanXoa = ({ congvandenID, congvandiID, congvannoiboID }) => {

    //Hooks
    const deleteCongVan = useDeleteCongVan();

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
    const onDeleteCongVan = async (id) => {
        await deleteCongVan.mutateAsync(id);
    }
    const handleDelete = () => {
        if (congvandenID) {
            onDeleteCongVan(congvandenID);
        }
        if (congvandiID) {
            onDeleteCongVan(congvandiID);
        }
        if (congvannoiboID) {
            onDeleteCongVan(congvannoiboID)
        }
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
                    Xóa chủ đề công văn
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

export default CVanXoa;