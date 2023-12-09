import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from '@mui/material';
import { useAddLoaiCVan } from '../../../api/LoaiCVan/useLoaiCVan';



const QLThemLoaiCVan = ({ isUserAllow }) => {

    //State
    const [openInner, setOpenInner] = useState(false);
    const [open, setOpen] = useState(false);
    const [tenloaicvan, setTenloaicvan] = useState("")
    const [kyhieu, setKyhieu] = useState("")
    const [error, setError] = useState("")

    //Hooks được tạo với react-query
    const addLoaiCVan = useAddLoaiCVan();

    //Function
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setOpenInner(false)
    }

    const onTenLoaiCVanChange = (e) => {
        setTenloaicvan(e.target.value);
    }
    const onKyHieuChange = (e) => {
        setKyhieu(e.target.value);
    }

    //Thêm loại công văn
    const onAddLoaiCVan = async (loaicvan) => {
        await addLoaiCVan.mutateAsync(loaicvan)
    }

    const onSubmitLoaiCVan = () => {
        if (!tenloaicvan || !kyhieu) {
            setError('Please fill in all required fields');
        }
        setError('');
        onAddLoaiCVan({
            tenloaicvan,
            kyhieu
        })
        handleClose()
    }

    return (
        <Box>
            <Button style={{ display: isUserAllow() ? 'none' : 'inline-block' }} variant="outlined" onClick={handleOpen} size='large'>
                Thêm
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Thêm loại công văn
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '30ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <div>
                            {error}
                            <TextField
                                id="tenloaicvan"
                                onChange={onTenLoaiCVanChange}
                                value={tenloaicvan}
                                label="Tên Loại Công Văn"
                                variant="outlined" />
                            <TextField
                                id="kyhieu"
                                onChange={onKyHieuChange}
                                value={kyhieu}
                                label="Ký Hiệu"
                                variant="outlined" />
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>HỦY</Button>
                    <Button onClick={onSubmitLoaiCVan} autoFocus>
                        XÁC NHẬN
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openInner}
                onClose={handleClose}
            >
                <DialogTitle>
                    Thêm loại công văn thành công
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

export default QLThemLoaiCVan;