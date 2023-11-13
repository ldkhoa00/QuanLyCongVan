import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import QLThemPhongBan from './QLThemPhongBan';
import QLXoaPhongBan from './QLXoaPhongBan'
import QLCapNhatPhongBan from './QLCapNhatPhongBan'
import SearchBar from '../../global/SearchBar';
import '../quanly.css'
import { useGetPhongBan } from '../../../api/PhongBan/usePhongBan';


const QLPhongBan = () => {
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        position: "relative",
        margin: "auto",
        width: "100%"
    }
    
    //Lấy data
    const { data: phongbanData, isLoading, error } = useGetPhongBan();

    if (isLoading) {
        return "Cò lỗi gì đó đã xảy ra"
    }

    if (error) {
        return <div>{error.message}</div>;
    }



    //Hiển thị option cho list
    const renderButton = (params) => {
        return (
            <div style={{ display: "flex" }}>
                <QLCapNhatPhongBan phongbanID={params.row.id} phongbanData={phongbanData} />
                <div className='space-width' />
                <QLXoaPhongBan phongbanID={params.row.id} />
            </div>
        )
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'tenphongban', headerName: 'Tên phòng ban', flex: 1 },
        { field: 'truongphong', headerName: 'Trưởng phòng', flex: 1 },
        { field: 'sdtphongban', headerName: 'Số ĐT Phòng', flex: 1 },
        { field: 'option', headerName: 'Chức năng', flex: 1, renderCell: renderButton, sortable: false }
    ];

    //Rows
    const rows = phongbanData ? [...phongbanData].reverse().map((item) => {
        return {
            id: item._id,
            tenphongban: item.tenphongban,
            truongphong: item.truongphong,
            sdtphongban: item.sdtphongban
        };
    }) : [];
    return (
        <Box style={pageStyle}>
            <div className='app-bar'>
                <div className="search-bar">
                    <SearchBar />
                </div>
                <div className='space-width' />
                <div className="add-button">
                    <QLThemPhongBan />
                </div>
            </div>

            <div className='space-height' />
            <div style={{ height: '100%', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </Box>
    );
};

export default QLPhongBan;