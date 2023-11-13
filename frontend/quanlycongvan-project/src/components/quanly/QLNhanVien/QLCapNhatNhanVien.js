import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, MenuItem } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import IconButton from '@mui/material/IconButton';
import { FaPen } from 'react-icons/fa';
import { useUpdateNhanVien } from '../../../api/NhanVien/useNhanVien';
import dayjs from 'dayjs';

const QLCapNhatNhanVien = (props) => {
    //Lấy data
    const phongbanData = props.phongbanData;
    const nhanvienID = props.nhanvienID;
    const nhanvienData = props.nhanvienData;
    const nhanvienDataById = nhanvienData.find(item => item._id === nhanvienID)

    //Các State
    const [open, setOpen] = useState(false);
    const [openInner, setOpenInner] = useState(false);
    const [tennhanvien, setTennhanvien] = useState(nhanvienDataById.tennhanvien)
    const [phongban, setPhongban] = useState(nhanvienDataById.phongban._id)
    const [email, setEmail] = useState(nhanvienDataById.email)
    const [ngayvaolam, setNgayvaolam] = useState(dayjs(nhanvienDataById.ngayvaolam))
    const [sdtnhanvien, setSdtnhanvien] = useState(nhanvienDataById.sdtnhanvien)
    const [diachi, setDiachi] = useState(nhanvienDataById.diachi)
    const [error, setError] = useState("")

    //Các hook react-query
    const updateNhanVien = useUpdateNhanVien();

    //Các function
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setOpenInner(false)
    }
    //MenuItem cho PhongBan Select
    let phongbanSelect = null;
    if (phongbanData) {
        phongbanSelect = phongbanData.map((phongban) => (
            <MenuItem key={phongban._id} value={phongban._id}>
                {phongban.tenphongban}
            </MenuItem>
        ))
    }
    //Setstate
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
    const onUpdateNhanVien = async (nhanvien) => {
        await updateNhanVien.mutateAsync(nhanvien)
    }

    const onSubmitNhanVien = () => {
        if (!tennhanvien || !diachi || !ngayvaolam || !sdtnhanvien || !email || !phongban) {
            setError('Please fill in all required fields');
        }
        setError('');
        onUpdateNhanVien({
            nhanvienID,
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
            <IconButton onClick={handleOpen} >
                <FaPen fontSize="medium" />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Cập nhật nhân viên
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
                                    format="DD-MM-YYYY"
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
                    Cập nhật nhân viên thành công / thất bại
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

export default QLCapNhatNhanVien;