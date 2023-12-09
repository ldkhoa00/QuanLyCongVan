import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import QLThemLoaiCVan from './QLThemLoaiCVan';
import QLXoaLoaiCVan from './QLXoaLoaiCVan'
import QLCapNhatLoaiCVan from './QLCapNhatLoaiCVan'
import SearchBar from '../../global/SearchBar';
import '../quanly.css'
import { useGetLoaiCVan } from '../../../api/LoaiCVan/useLoaiCVan';
import { isUserAllow } from '../../../utils/utils';

const QLLoaiCVan = () => {
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        position: "relative",
        margin: "auto",
        width: "100%"
    }

    //Lấy data
    const { data: loaicvanData, isLoading, error } = useGetLoaiCVan();

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
                <QLCapNhatLoaiCVan loaicvanID={params.row.id} loaicvanData={loaicvanData} />
                <div className='space-width' />
                <QLXoaLoaiCVan loaicvanID={params.row.id} />
            </div>
        )
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'tenloaicvan', headerName: 'Tên loại công văn', flex: 1 },
        { field: 'kyhieu', headerName: 'Ký hiệu', flex: 1 },
        isUserAllow() ? "" : { field: 'option', headerName: 'Chức năng', flex: 1, renderCell: renderButton, sortable: false }
    ];

    //Rows
    const rows = loaicvanData ? [...loaicvanData].reverse().map((item) => {
        return {
            id: item._id,
            tenloaicvan: item.tenloaicvan,
            kyhieu: item.kyhieu,
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
                    <QLThemLoaiCVan isUserAllow={isUserAllow} />
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

export default QLLoaiCVan;