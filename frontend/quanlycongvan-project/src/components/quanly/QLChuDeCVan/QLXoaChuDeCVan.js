import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { FaTrash } from 'react-icons/fa';



const QLXoaChuDeCVan = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
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
                    <Button onClick={handleClose} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
};

export default QLXoaChuDeCVan;