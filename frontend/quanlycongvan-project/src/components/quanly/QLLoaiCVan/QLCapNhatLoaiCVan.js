import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { FaPen } from 'react-icons/fa';
import { useUpdateLoaiCVan } from '../../../api/LoaiCVan/useLoaiCVan';



const QLCapNhatLoaiCVan = ({ loaicvanData, loaicvanID }) => {

    //Lấy props
    const loaicvanDataById = loaicvanData.find(item => item._id === loaicvanID)

    //State
    const [openInner, setOpenInner] = useState(false);
    const [open, setOpen] = useState(false);
    const [tenloaicvan, setTenloaicvan] = useState(loaicvanDataById.tenloaicvan)
    const [kyhieu, setKyhieu] = useState(loaicvanDataById.kyhieu)
    const [error, setError] = useState("")

    //Hooks được tạo với react-query
    const updateLoaiCVan = useUpdateLoaiCVan();

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
    const onUpdateLoaiCVan = async (loaicvan) => {
        await updateLoaiCVan.mutateAsync(loaicvan)
    }

    const onSubmitLoaiCVan = () => {
        if (!tenloaicvan || !kyhieu) {
            setError('Please fill in all required fields');
        }
        setError('');
        onUpdateLoaiCVan({
            tenloaicvan,
            kyhieu,
            loaicvanID
        })
        handleClose()
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
                    Cập nhật loại công văn
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
                    Cập nhật loại công văn thành công / thất bại
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

export default QLCapNhatLoaiCVan;