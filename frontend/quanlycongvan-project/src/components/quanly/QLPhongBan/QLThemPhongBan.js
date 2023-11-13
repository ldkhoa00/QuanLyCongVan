import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from '@mui/material';
import { useAddPhongBan } from '../../../api/PhongBan/usePhongBan';



const QLThemPhongBan = () => {

    //State
    const [openInner, setOpenInner] = useState(false);
    const [open, setOpen] = useState(false);
    const [tenphongban, setTenphongban] = useState("")
    const [truongphong, setTruongphong] = useState("")
    const [sdtphongban, setSdtphongban] = useState("")
    const [error, setError] = useState("")

    //Hooks được tạo với react-query
    const addPhongBan = useAddPhongBan();

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

    //Thêm nhân viên
    const onAddPhongBan = async (phongban) => {
        await addPhongBan.mutateAsync(phongban)
    }

    const onSubmitPhongBan = () => {
        if (!tenphongban || !truongphong || !sdtphongban) {
            setError('Please fill in all required fields');
        }
        setError('');
        onAddPhongBan({
            tenphongban,
            truongphong,
            sdtphongban,
        })
        handleClose()
    }

    return (
        <Box>
            <Button variant="outlined" onClick={handleOpen} size='large'>
                Thêm
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Thêm phòng ban
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
                                id="tennhanvien"
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
                    Thêm phòng ban thành công
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

export default QLThemPhongBan;