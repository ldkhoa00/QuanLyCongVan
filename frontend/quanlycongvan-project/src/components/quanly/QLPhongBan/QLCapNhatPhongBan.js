import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { FaPen } from 'react-icons/fa';
import { useUpdatePhongBan } from '../../../api/PhongBan/usePhongBan';



const QLCapNhatPhongBan = ({ phongbanData, phongbanID }) => {

    //Lấy props
    const phongbanDataById = phongbanData.find(item => item._id === phongbanID)

    //State
    const [openInner, setOpenInner] = useState(false);
    const [open, setOpen] = useState(false);
    const [tenphongban, setTenphongban] = useState(phongbanDataById.tenphongban)
    const [truongphong, setTruongphong] = useState(phongbanDataById.truongphong)
    const [sdtphongban, setSdtphongban] = useState(phongbanDataById.sdtphongban)
    const [error, setError] = useState("")

    //Hooks được tạo với react-query
    const updatePhongBan = useUpdatePhongBan();

    //Function
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setOpenInner(false)
    }

    const onTenPhongBanChange = (e) => {
        setTenphongban(e.target.value);
    }
    const onTruongPhongChange = (e) => {
        setTruongphong(e.target.value);
    }
    const onSdtPhongBanChange = (e) => {
        setSdtphongban(e.target.value);
    }

    //Thêm phòng ban
    const onUpdatePhongBan = async (phongban) => {
        await updatePhongBan.mutateAsync(phongban)
    }

    const onSubmitPhongBan = () => {
        if (!tenphongban || !truongphong || !sdtphongban) {
            setError('Please fill in all required fields');
        }
        setError('');
        onUpdatePhongBan({
            tenphongban,
            truongphong,
            sdtphongban,
            phongbanID
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
                    Cập nhật phòng ban
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
                                id="tenphongban"
                                onChange={onTenPhongBanChange}
                                value={tenphongban}
                                label="Tên Phòng Ban"
                                variant="outlined" />
                            <TextField
                                id="truongphong"
                                onChange={onTruongPhongChange}
                                value={truongphong}
                                label="Trưởng Phòng"
                                variant="outlined" />
                            <TextField
                                id="sdtphongban"
                                onChange={onSdtPhongBanChange}
                                value={sdtphongban}
                                label="SDT Phòng ban"
                                variant="outlined" />
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>HỦY</Button>
                    <Button onClick={onSubmitPhongBan} autoFocus>
                        XÁC NHẬN
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openInner}
                onClose={handleClose}
            >
                <DialogTitle>
                    Cập nhật phòng ban thành công / thất bại
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

export default QLCapNhatPhongBan;