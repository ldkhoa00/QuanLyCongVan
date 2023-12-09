import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { FaPen } from 'react-icons/fa';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useUpdateCongVan, useGetCongVan } from '../../api/CongVan/useCongVan';
import { useGetPhongBan } from '../../api/PhongBan/usePhongBan';
import { useGetLoaiCVan } from '../../api/LoaiCVan/useLoaiCVan';
import { useGetLinhVuc } from '../../api/LinhVuc/useLinhVuc';
import dayjs from 'dayjs';

const CVanUpdate = ({ kieucvanden, kieucvandi, kieucvannoibo, congvandenID, congvannoiboID, congvandiID }) => {


    //Hooks
    const updateCongVan = useUpdateCongVan();
    const { data: congvanData } = useGetCongVan();
    const { data: phongbanData } = useGetPhongBan();
    const { data: loaicvanData } = useGetLoaiCVan();
    const { data: linhvucData } = useGetLinhVuc();

    //State

    const [congvanDataByID, setCongVanDataByID] = useState("")
    const [openInner, setOpenInner] = useState(false);
    const [open, setOpen] = useState(false);
    const [phongban, setPhongBan] = useState();
    const [ngaygui, setNgayGui] = useState();
    const [nguoinhan, setNguoiNhan] = useState();
    const [trichyeu, setTrichYeu] = useState();
    const [noidung, setNoiDung] = useState();
    const [file, setFile] = useState();
    const [linhvuc, setLinhVuc] = useState()
    const [trangthai, setTrangThai] = useState();
    const [kyhieucvan, setKyHieuCVan] = useState();
    const [coquanbanhanh, setCoQuanBanHanh] = useState();
    const [noiluubanchinh, setNoiLuuBanChinh] = useState();
    const [chudecvan, setChuDeCVan] = useState();
    const [loaicvan, setLoaiCVan] = useState();
    const [kieucvanselect, setKieuCVanSelect] = useState('');
    const [error, setError] = useState("");
    const [kieucvan, setKieuCVan] = useState("");
    const [congvanID, setCongVanID] = useState("");


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

    useEffect(() => {
        //kiểm tra id của từng kiểu công văn
        if (congvandenID) {
            setCongVanDataByID(congvanData.find(item => item._id === congvandenID))
            setCongVanID(congvandenID)
        }
        if (congvandiID) {
            setCongVanDataByID(congvanData.find(item => item._id === congvandiID))
            setCongVanID(congvandiID)
        }
        if (congvannoiboID) {
            setCongVanDataByID(congvanData.find(item => item._id === congvannoiboID))
            setCongVanID(congvannoiboID)
        }
    }, [congvandenID, congvandiID, congvannoiboID, congvanData])


    useEffect(() => {
        if (congvanDataByID) {
            setPhongBan(congvanDataByID.phongban)
            setNgayGui(dayjs(congvanDataByID.ngaygui))
            setNguoiNhan(congvanDataByID.nguoinhan)
            setTrichYeu(congvanDataByID.trichyeu)
            setNoiDung(congvanDataByID.noidung)
            setFile(congvanDataByID.file)
            setLinhVuc(congvanDataByID.linhvuc._id)
            setTrangThai(congvanDataByID.trangthai)
            setKyHieuCVan(congvanDataByID.kyhieucvan)
            setCoQuanBanHanh(congvanDataByID.coquanbanhanh)
            setNoiLuuBanChinh(congvanDataByID.noiluubanchinh)
            setChuDeCVan(congvanDataByID.chudecvan)
            setLoaiCVan(congvanDataByID.loaicvan._id)
        }

    }, [congvanDataByID])

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
    };
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
    const onPhongBanChange = (e) => {
        setPhongBan(e.target.value)
    }
    const onKyHieuCVanChange = (e) => {
        setKyHieuCVan(e.target.value)
    }
    const onLinhVucChange = (e) => {
        setLinhVuc(e.target.value)
    }

    //Update công văn
    const onUpdateCongVan = async (congvan) => {
        await updateCongVan.mutateAsync(congvan)
    }

    const onSubmitCongVan = () => {
        if (!ngaygui ||
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
        onUpdateCongVan({
            chudecvan,
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
            congvanID
        });
        handleClose();
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
        <Box>
            <IconButton  onClick={handleOpen} >
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
                    {error}
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
                                defaultValue={loaicvan}
                                value={loaicvan}
                                select
                                label="Loại công văn">
                                {loaicvanSelect}
                            </TextField>
                            <TextField
                                id="outlined-select-department"
                                onChange={onPhongBanChange}
                                defaultValue={phongban}
                                value={phongban}
                                select
                                label="Phòng ban">
                                {phongbanSelect}
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

export default CVanUpdate;