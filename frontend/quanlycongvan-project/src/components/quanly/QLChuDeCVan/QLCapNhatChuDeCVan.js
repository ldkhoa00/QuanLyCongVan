import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { FaPen } from 'react-icons/fa';



const QLCapNhatChuDeCVan = () => {

    const manager = [
        {
            value: 'Hành Chính',
        },
        {
            value: 'Giáo Dục',
        },
    ];

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setOpenInner(false)
    }

    const [openInner, setOpenInner] = useState(false);

    const handleOpenInner = () => {
        setOpenInner(true)
    }

    return (
        <Box>
            <IconButton onClick={handleOpen} >
                <FaPen fontSize="medium" />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Cập nhật chủ đề công văn
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '30ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="outlined-select-topic"
                                select
                                label="Chủ đề công văn"
                                defaultValue="Hành Chính"
                            // helperText="Please select manager"
                            >
                                {manager.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>HỦY</Button>
                    <Button onClick={handleOpenInner} autoFocus>
                        XÁC NHẬN
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openInner}
                onClose={handleClose}
            >
                <DialogTitle>
                    Cập nhật chủ đề công văn thành công / thất bại
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
};

export default QLCapNhatChuDeCVan;