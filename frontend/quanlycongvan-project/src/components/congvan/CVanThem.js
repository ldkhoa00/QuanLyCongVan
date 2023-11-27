import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, MenuItem } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAddCongVan } from '../../api/CongVan/useCongVan';
import { useGetLoaiCVan } from '../../api/LoaiCVan/useLoaiCVan';
import { useGetLinhVuc } from '../../api/LinhVuc/useLinhVuc';
const CVanThem = ({ kieucvanden, kieucvandi, kieucvannoibo }) => {

    //styles

    //State
    const [openInner, setOpenInner] = useState(false);
    const [open, setOpen] = useState(false);
    const [ngaygui, setNgayGui] = useState("");
    const [nguoinhan, setNguoiNhan] = useState("");
    const [trichyeu, setTrichYeu] = useState("");
    const [noidung, setNoiDung] = useState("");
    const [file, setFile] = useState(null);
    const [linhvuc, setLinhVuc] = useState("")
    const [trangthai, setTrangThai] = useState(1);
    const [kyhieucvan, setKyHieuCVan] = useState("");
    const [coquanbanhanh, setCoQuanBanHanh] = useState("");
    const [noiluubanchinh, setNoiLuuBanChinh] = useState("");
    const [chudecvan, setChuDeCVan] = useState("");
    const [loaicvan, setLoaiCVan] = useState("");
    const [kieucvanselect, setKieuCVanSelect] = useState('');
    const [error, setError] = useState("");
    const [kieucvan, setKieuCVan] = useState("");

    useEffect(() => {
        if (kieucvanden) {
            setKieuCVanSelect('CVANDEN');
            setKieuCVan(kieucvanden)
        } else if (kieucvannoibo) {
            setKieuCVanSelect('CVANNOIBO');
            setKieuCVan(kieucvannoibo)
        } else if (kieucvandi) {
            setKieuCVanSelect('CVANDI');
            setKieuCVan(kieucvandi)
        }
    }, [kieucvanden, kieucvannoibo, kieucvandi]);

    //Hooks
    const addCongVan = useAddCongVan();
    const { data: loaicvanData } = useGetLoaiCVan();
    const { data: linhvucData } = useGetLinhVuc();

    //Function
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setOpenInner(false)
    }
    const onNgayGuiChange = (selectedDate) => {
        setNgayGui(selectedDate);
    }
    const onNguoiNhanChange = (e) => {
        setNguoiNhan(e.target.value);
    }
    const onTrichYeuChange = (e) => {
        setTrichYeu(e.target.value);
    }
    const onNoiDungChange = (e) => {
        setNoiDung(e.target.value);
    }
    const onFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
        }
    }
    const onTrangThaiChange = (e) => {
        setTrangThai(e.target.value);
    }
    const onCoQuanBanHanhChange = (e) => {
        setCoQuanBanHanh(e.target.value)
    }
    const onNoiLuuBanChinhChange = (e) => {
        setNoiLuuBanChinh(e.target.value)
    }
    const onLoaiCongVanChange = (e) => {
        setLoaiCVan(e.target.value)
    }
    const onKieuCongVanSelectChange = (e) => {
        setKieuCVanSelect(e.target.value)
    }
    const onChuDeCVanChange = (e) => {
        setChuDeCVan(e.target.value)
    }
    const onKyHieuCVanChange = (e) => {
        setKyHieuCVan(e.target.value)
    }
    const onLinhVucChange = (e) => {
        setLinhVuc(e.target.value)
    }

    //Thêm nhân viên
    const onAddCongVan = async (congvan) => {
        await addCongVan.mutateAsync(congvan)
    }

    const onSubmitCongVan = () => {
        if (!chudecvan ||
            !ngaygui ||
            !nguoinhan ||
            !trichyeu ||
            !noidung ||
            !file ||
            !trangthai ||
            !coquanbanhanh ||
            !linhvuc ||
            !noiluubanchinh ||
            !kyhieucvan ||
            !loaicvan // || !kieucvan
        ) {
            setError('Please fill in all required fields');
        }
        setError('');
        onAddCongVan({
            ngaygui,
            kyhieucvan,
            nguoinhan,
            trichyeu,
            noidung,
            file,
            trangthai,
            coquanbanhanh,
            noiluubanchinh,
            loaicvan,
            linhvuc,
            kieucvan,
            chudecvan
        });
        handleClose();
    }

    //MenuItem cho LoaiCVan Select
    let loaicvanSelect = null;
    if (loaicvanData) {
        loaicvanSelect = loaicvanData.map((loaicvan) => (
            <MenuItem key={loaicvan._id} value={loaicvan._id}>
                {loaicvan.tenloaicvan}
            </MenuItem>
        ))
    }

    //MenuItem cho LinhVuc Select
    let linhvucSelect = null;
    if (linhvucData) {
        linhvucSelect = linhvucData.map((linhvuc) => (
            <MenuItem key={linhvuc._id} value={linhvuc._id}>
                {linhvuc.tenlinhvuc}
            </MenuItem>
        ))
    }

    return (
        <form encType="multipart/form-data">
            <Box>
                {error}
                <Button variant="outlined" onClick={handleOpen} size='large'>
                    Thêm
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >

                    <DialogTitle>
                        Thêm công văn
                    </DialogTitle>
                    <DialogContent>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '28ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    onChange={onNguoiNhanChange}
                                    value={nguoinhan}
                                    label="Người nhận" />
                                <TextField
                                    onChange={onTrichYeuChange}
                                    value={trichyeu}
                                    label="Trích yếu" />
                                <TextField
                                    onChange={onKyHieuCVanChange}
                                    value={kyhieucvan}
                                    label="Ký hiệu" />
                                <TextField
                                    onChange={onCoQuanBanHanhChange}
                                    value={coquanbanhanh}
                                    label="Cơ quan ban hành" />
                                <TextField
                                    onChange={onNoiLuuBanChinhChange}
                                    value={noiluubanchinh}
                                    label="Nơi lưu bản chính" />
                                <LocalizationProvider dateAdapter={AdapterDayjs} components={['DateTimePicker']}>
                                    <DateTimePicker
                                        onChange={onNgayGuiChange}
                                        value={ngaygui}
                                        label="Ngày gửi" />
                                </LocalizationProvider>
                                <TextField
                                    onChange={onTrangThaiChange}
                                    select
                                    defaultValue={trangthai}
                                    value={trangthai}
                                    label="Trang Thái">
                                    <MenuItem value={0}>Chưa ký duyệt</MenuItem>
                                    <MenuItem value={1}>Đã ký duyệt</MenuItem>
                                </TextField>
                                <TextField
                                    onChange={onKieuCongVanSelectChange}
                                    select
                                    label="Kiểu công văn"
                                    value={kieucvanselect}
                                    disabled
                                >
                                    {/* Đang ở component nào thì value sẽ chỉ hiển thị props của component đó */}
                                    <MenuItem value="CVANDEN">{kieucvanden}</MenuItem>
                                    <MenuItem value="CVANDI">{kieucvandi}</MenuItem>
                                    <MenuItem value="CVANNOIBO">{kieucvannoibo}</MenuItem>
                                </TextField>
                                <TextField
                                    onChange={onChuDeCVanChange}
                                    value={chudecvan}
                                    id="outlined-select-manager"
                                    label="Chủ đề công văn">
                                </TextField>
                                <TextField
                                    id="outlined-select-department"
                                    onChange={onLinhVucChange}
                                    defaultValue={linhvuc}
                                    value={linhvuc}
                                    select
                                    label="Lĩnh vực">
                                    {linhvucSelect}
                                </TextField>
                                <TextField
                                    id="outlined-select-department"
                                    onChange={onLoaiCongVanChange}
                                    value={loaicvan}
                                    select
                                    label="Loại công văn">
                                    {loaicvanSelect}
                                </TextField>
                                <input
                                    onChange={onFileChange}
                                    type='file'></input>
                                <TextField
                                    onChange={onNoiDungChange}
                                    value={noidung}
                                    id="outlined-multiline-static"
                                    label="Nội dung"
                                    multiline
                                    rows={4} />
                            </div>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>HỦY</Button>
                        <Button onClick={onSubmitCongVan} autoFocus>
                            XÁC NHẬN
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openInner}
                    onClose={handleClose}
                >
                    <DialogTitle>
                        Thêm chủ đề công văn thành công / thất bại
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box >
        </form>
    );
};

export default CVanThem;