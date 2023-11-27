import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { FaPen } from 'react-icons/fa';
import { useUpdateLinhVuc } from '../../../api/LinhVuc/useLinhVuc';



const QLCapNhatLinhVuc = ({ linhvucData, linhvucID }) => {

    //Lấy props
    const linhvucDataById = linhvucData.find(item => item._id === linhvucID)

    //State
    const [openInner, setOpenInner] = useState(false);
    const [open, setOpen] = useState(false);
    const [tenlinhvuc, setTenlinhvuc] = useState(linhvucDataById.tenlinhvuc)
    const [kyhieu, setKyhieu] = useState(linhvucDataById.kyhieu)
    const [error, setError] = useState("")

    //Hooks được tạo với react-query
    const updateLinhVuc = useUpdateLinhVuc();

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
    const onUpdateLinhVuc = async (linhvuc) => {
        await updateLinhVuc.mutateAsync(linhvuc)
    }

    const onSubmitLinhVuc = () => {
        if (!tenlinhvuc || !kyhieu) {
            setError('Please fill in all required fields');
        }
        setError('');
        onUpdateLinhVuc({
            tenlinhvuc,
            kyhieu,
            linhvucID
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
                    Cập nhật lĩnh vực
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
                                id="tenlinhvuc"
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
                    Cập nhật lĩnh vực thành công / thất bại
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

export default QLCapNhatLinhVuc;