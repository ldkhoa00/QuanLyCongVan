import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import QLThemChuDeCVan from './QLThemChuDeCVan';
import QLXoaChuDeCVan from './QLXoaChuDeCVan'
import QLCapNhatChuDeCVan from './QLCapNhatChuDeCVan'
import SearchBar from '../../global/SearchBar';
import '../quanly.css'

const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    position: "relative",
    margin: "auto",
    width: "100%",
}

//Hiển thị option cho list
const renderButton = (params) => {
    return (
        <div style={{ display: "flex" }}>
            <QLCapNhatChuDeCVan />
            <div className='space-width' />
            <QLXoaChuDeCVan />
        </div>
    )
}

const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'topic', headerName: 'Chủ đề công văn', flex: 1 },
    { field: 'option', headerName: 'Chức năng', flex: 1, renderCell: renderButton, sortable: false }
];

const rows = [{ "id": 1, "topic": "Hành Chính" },
{ "id": 2, "topic": "Giáo Dục" }]

const QLChuDeCVan = () => {
    return (
        <Box style={pageStyle}>
            <div className='app-bar'>
                <div className="search-bar">
                    <SearchBar />
                </div>
                <div className='space-width' />
                <div className="add-button">
                    <QLThemChuDeCVan />
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

export default QLChuDeCVan;