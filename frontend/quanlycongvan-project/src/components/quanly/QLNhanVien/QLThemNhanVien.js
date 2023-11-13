import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, MenuItem } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useAddNhanVien } from '../../../api/NhanVien/useNhanVien';



const QLThemNhanVien = (props) => {

    //State
    const [openInner, setOpenInner] = useState(false);
    const [open, setOpen] = useState(false);
    const [tennhanvien, setTennhanvien] = useState("")
    const [phongban, setPhongban] = useState("")
    const [email, setEmail] = useState("")
    const [ngayvaolam, setNgayvaolam] = useState(null)
    const [sdtnhanvien, setSdtnhanvien] = useState("")
    const [diachi, setDiachi] = useState("")
    const [error, setError] = useState("")

    //Lấy props
    const phongbanData = props.phongbanData;

    //Hooks được tạo với react-query
    const addNhanVien = useAddNhanVien();

    //Function
    //MenuItem cho PhongBan Select
    let phongbanSelect = null;
    if (phongbanData) {
        phongbanSelect = phongbanData.map((phongban) => (
            <MenuItem key={phongban._id} value={phongban._id}>
                {phongban.tenphongban}
            </MenuItem>
        ))
    }

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setOpenInner(false)
    }

    const onTenNhanVienChange = (e) => {
        setTennhanvien(e.target.value);
    }
    const onPhongBanChange = (e) => {
        setPhongban(e.target.value);
    }
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const onNgayVaoLamChange = (selectedDate) => {
        setNgayvaolam(selectedDate);
    }
    const onSdtNhanVienChange = (e) => {
        setSdtnhanvien(e.target.value);
    }
    const onDiaChiChange = (e) => {
        setDiachi(e.target.value);
    }


    //Thêm nhân viên
    const onAddNhanVien = async (nhanvien) => {
        await addNhanVien.mutateAsync(nhanvien)
    }

    const onSubmitNhanVien = () => {
        if (!tennhanvien || !diachi || !ngayvaolam || !sdtnhanvien || !email || !phongban) {
            setError('Please fill in all required fields');
        }
        setError('');
        onAddNhanVien({
            tennhanvien,
            phongban,
            diachi,
            sdtnhanvien,
            email,
            ngayvaolam
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
                    Thêm nhân viên
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
                                onChange={onTenNhanVienChange}
                                value={tennhanvien}
                                label="Họ và Tên"
                                variant="outlined" />
                            <TextField
                                id="outlined-select-department"
                                onChange={onPhongBanChange}
                                value={phongban}
                                select
                                label="Phòng ban">
                                {phongbanSelect}
                            </TextField>
                            <TextField
                                id="email"
                                onChange={onEmailChange}
                                value={email}
                                label="Email"
                                variant="outlined" />
                            <TextField
                                id="sdtnhanvien"
                                onChange={onSdtNhanVienChange}
                                value={sdtnhanvien}
                                label="Số điện thoại"
                                variant="outlined" />
                            <TextField
                                id="diachi"
                                onChange={onDiaChiChange}
                                value={diachi}
                                label="Địa chỉ"
                                variant="outlined" />
                            <LocalizationProvider dateAdapter={AdapterDayjs} components={['DateTimePicker']}>
                                <DateTimePicker
                                    onChange={onNgayVaoLamChange}
                                    value={ngayvaolam}
                                    label="Ngày vào làm" />
                            </LocalizationProvider>
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>HỦY</Button>
                    <Button onClick={onSubmitNhanVien} autoFocus>
                        XÁC NHẬN
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={openInner}
                onClose={handleClose}
            >
                <DialogTitle>
                    Thêm nhân viên thành công / thất bại
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

export default QLThemNhanVien;