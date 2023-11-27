import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from '@mui/material';
import { useAddLinhVuc } from '../../../api/LinhVuc/useLinhVuc';



const QLThemLinhVuc = () => {

    //State
    const [openInner, setOpenInner] = useState(false);
    const [open, setOpen] = useState(false);
    const [tenlinhvuc, setTenlinhvuc] = useState("")
    const [kyhieu, setKyhieu] = useState("")
    const [error, setError] = useState("")

    //Hooks được tạo với react-query
    const addLinhVuc = useAddLinhVuc();

    //Function
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setOpenInner(false)
    }

    const onTenLinhVucChange = (e) => {
        setTenlinhvuc(e.target.value);
    }
    const onKyHieuChange = (e) => {
        setKyhieu(e.target.value);
    }

    //Thêm lĩnh vực
    const onAddLinhVuc = async (linhvuc) => {
        await addLinhVuc.mutateAsync(linhvuc)
    }

    const onSubmitLinhVuc = () => {
        if (!tenlinhvuc || !kyhieu) {
            setError('Please fill in all required fields');
        }
        setError('');
        onAddLinhVuc({
            tenlinhvuc,
            kyhieu
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
                    Thêm lĩnh vực
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
                                onChange={onTenLinhVucChange}
                                value={tenlinhvuc}
                                label="Tên Lĩnh Vực"
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
                    <Button onClick={onSubmitLinhVuc} autoFocus>
                        XÁC NHẬN
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openInner}
                onClose={handleClose}
            >
                <DialogTitle>
                    Thêm lĩnh vực thành công
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

export default QLThemLinhVuc;