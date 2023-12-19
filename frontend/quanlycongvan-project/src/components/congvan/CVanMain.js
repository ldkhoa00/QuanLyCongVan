import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem, Tab } from '@mui/material';
import "./congvan.css"
import { Grid } from '@mui/material';
import { useGetCongVan } from '../../api/CongVan/useCongVan';
import { TabContext } from '@material-ui/lab';
import { TabList } from '@material-ui/lab';
import { TabPanel } from '@material-ui/lab';
import CVanDen from './CVanDen/CVanDen';
import CVanDi from './CVanDi/CVanDi';
import CVanNoiBo from './CVanNoiBo/CVanNoiBo';
import CVanThem from './CVanThem';
import CVanXoa from './CVanXoa';
import CVanUpdate from './CVanUpdate';
import { useEffect } from 'react';
import { useGetLinhVuc } from '../../api/LinhVuc/useLinhVuc';
import { useGetLoaiCVan } from '../../api/LoaiCVan/useLoaiCVan';
import { isUserAllow } from '../../utils/utils'
import { useGetUserById } from '../../api/User/useUser';

const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    position: "relative",
    margin: "auto"
}

const CVanMain = () => {

    const [value, setValue] = useState('1')

    //Lấy userID
    const userID = localStorage.getItem("userID")

    //Lấy data
    const { data: congvanData, isLoading, error } = useGetCongVan();
    const { data: linhvucData } = useGetLinhVuc();
    const { data: loaicvanData } = useGetLoaiCVan();
    const { data: userData } = useGetUserById(userID);



    //Các state
    const [congvandenData, setCongVanDenData] = useState(null)
    const [congvandiData, setCongVanDiData] = useState(null)
    const [congvannoiboData, setCongVanNoiBoData] = useState(null)
    const [trangthai, setTrangThai] = useState(1);
    const [linhvuc, setLinhVuc] = useState("");
    const [loaicvan, setLoaiCvan] = useState("");
    const [activeTab, setActiveTab] = useState("1");


    useEffect(() => {
        if (congvanData) {
            let congvannoibo = congvanData.filter((congvan) => congvan.kieucvan === "Công văn nội bộ")
            let congvandi = congvanData.filter((congvan) => congvan.kieucvan === "Công văn đi")
            let congvanden = congvanData.filter((congvan) => congvan.kieucvan === "Công văn đến")
            setCongVanDenData(congvanden)
            setCongVanDiData(congvandi)
            setCongVanNoiBoData(congvannoibo)

        }
    }, [congvanData])

    // Hàm lọc để lấy danh sách công văn
    let danhSachCongVan = null;
    if (congvanData && userData) {
        const userPhongBanID = userData.phongban._id;
        // Lọc các công văn theo điều kiện phongbanID trùng nhau
        danhSachCongVan = congvanData.filter(congvan => {
            return congvan.phongban.some(pb => pb._id === userPhongBanID);
        });

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


    //MenuItem cho LoaiCVan Select
    let loaicvanSelect = null;
    if (loaicvanData) {
        loaicvanSelect = loaicvanData.map((loaicvan) => (
            <MenuItem key={loaicvan._id} value={loaicvan._id}>
                {loaicvan.tenloaicvan}
            </MenuItem>
        ))
    }


    //Function
    const handleTrangThaiChange = (e) => {
        setTrangThai(e.target.value);
    };

    const handleLoaiCVanChange = (e) => {
        setLoaiCvan(e.target.value)
    }

    const handleLinhVucChange = (e) => {
        setLinhVuc(e.target.value)
    }

    //Function filter lọc thông tin
    const handleFilter = () => {
        let filteredCongVan = congvanData.filter((cvan) => {
            // Check if the linhvuc matches the selected linhvuc or if no linhvuc is selected
            const linhvucMatch = cvan.linhvuc._id === linhvuc || !linhvuc;

            // Check if the loaicvan matches the selected loaicvan or if no loaicvan is selected
            const loaicvanMatch = cvan.loaicvan._id === loaicvan || !loaicvan;

            // Check if the trangthai matches the selected trangthai or if no trangthai is selected
            const trangthaiMatch = cvan.trangthai === trangthai;


            // Return true only if both linhvuc and loaicvan match the selected values
            return linhvucMatch && loaicvanMatch && trangthaiMatch;
        });
        if (activeTab === '1') {
            setCongVanDenData(filteredCongVan.filter((cvan) => cvan.kieucvan === 'Công văn đến'))
        }
        else if (activeTab === '2') {
            setCongVanDiData(filteredCongVan.filter((cvan) => cvan.kieucvan === 'Công văn đi'))
        }
        else if (activeTab === '3') {
            setCongVanNoiBoData(filteredCongVan.filter((cvan) => cvan.kieucvan === 'Công văn nội bộ'))
        }
    }


    const handleClearFilters = () => {
        // Reset state variables to their initial values or null
        setLoaiCvan("");
        setLinhVuc("");
        setTrangThai(1);
        // Optionally, reset the filtered data to the original data
        setCongVanDenData(congvandenData);
        setCongVanDiData(congvandiData);
        setCongVanNoiBoData(congvannoiboData);
    };


    //Function thya đổi Tabs
    const handleChangeTab = (e, newValue) => {
        setValue(newValue);
        setActiveTab(newValue)
    };

    if (isLoading) {
        return "Is Loading...."
    }

    if (error) {
        return <div>{error.message}</div>;
    }




    return (
        < div >
            <Box style={pageStyle}>
                <div className='section-container'>
                    <h3>Tìm kiếm</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField
                                size='small'
                                select
                                className='filter-field'
                                value={loaicvan}
                                label="Loại công văn"
                                onChange={handleLoaiCVanChange}
                            >
                                {loaicvanSelect}
                            </TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                size='small'
                                select
                                className='filter-field'
                                value={linhvuc}
                                label="Lĩnh vực"
                                onChange={handleLinhVucChange}>
                                {linhvucSelect}
                            </TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                size='small'
                                select
                                className='filter-field'
                                value={trangthai}
                                label="Trạng thái"
                                onChange={handleTrangThaiChange}
                            >
                                <MenuItem value={1}>Đã ký duyệt</MenuItem>
                                <MenuItem value={0}>Chưa ký duyệt</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <div style={{ float: "right", width: "fit-content", display: "flex" }}>
                                <Button onClick={handleClearFilters} variant="contained" style={{ width: "5rem" }}>CLEAR</Button>
                                <div style={{ width: "16px" }} />
                                <Button onClick={handleFilter} variant="contained" style={{ width: "5rem" }}>LỌC</Button>
                            </div>

                        </Grid>
                    </Grid>
                </div>

                <div style={{ height: "16px" }} />

                <div className='section-container'>
                    <div className="button-row">
                        <div className='space-width' />
                        <div className="add-button">
                            {/* ADD CVAN */}
                        </div>
                    </div>

                    <Box>
                        <TabContext value={value}>
                            <Box>
                                <TabList onChange={handleChangeTab}>
                                    <Tab label="CÔNG VĂN ĐẾN" value='1'></Tab>
                                    <Tab label="CÔNG VĂN ĐI" value='2'></Tab>
                                    <Tab label="CÔNG VĂN NỘI BỘ" value='3'></Tab>
                                </TabList>
                            </Box>
                            <TabPanel value='1'>
                                <CVanDen danhSachCongVan={danhSachCongVan} isUserAllow={isUserAllow} congvandenData={congvandenData} CVanXoa={CVanXoa} CVanThem={CVanThem} CVanUpdate={CVanUpdate} />
                            </TabPanel>
                            <TabPanel value='2'>
                                <CVanDi danhSachCongVan={danhSachCongVan} isUserAllow={isUserAllow} congvandiData={congvandiData} CVanXoa={CVanXoa} CVanThem={CVanThem} CVanUpdate={CVanUpdate} />
                            </TabPanel>
                            <TabPanel value='3'>
                                <CVanNoiBo danhSachCongVan={danhSachCongVan} isUserAllow={isUserAllow} congvannoiboData={congvannoiboData} CVanXoa={CVanXoa} CVanThem={CVanThem} CVanUpdate={CVanUpdate} />
                            </TabPanel>
                        </TabContext>
                    </Box>

                </div>

            </Box>
        </div >
    );
};

export default CVanMain;