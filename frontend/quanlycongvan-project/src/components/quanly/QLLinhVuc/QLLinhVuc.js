import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import QLThemLinhVuc from './QLThemLinhVuc';
import QLXoaLinhVuc from './QLXoaLinhVuc'
import QLCapNhatLinhVuc from './QLCapNhatLinhVuc'
import SearchBar from '../../global/SearchBar';
import '../quanly.css'
import { useGetLinhVuc } from '../../../api/LinhVuc/useLinhVuc';


const QLLinhVuc = () => {
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        position: "relative",
        margin: "auto",
        width: "100%"
    }

    //Lấy data
    const { data: linhvucData, isLoading, error } = useGetLinhVuc();

    //******* Chức năng search *******
    //LinhVuc được search
    const [filteredLinhVuc, setFilteredLinhVuc] = useState("");


    //useEffect
    useEffect(() => {
        if (linhvucData) {
            setFilteredLinhVuc(linhvucData)
        }
    }, [linhvucData])

    //Search method
    const handleSearchLinhVuc = (query) => {
        if (linhvucData) {
            var searchResult = linhvucData.filter((linhvuc) => linhvuc.tenlinhvuc.toLowerCase().indexOf(query.toLowerCase()) !== -1); //đưa tất cả về lowercase
            setFilteredLinhVuc(searchResult);
        }

    }

    //*************************************/


    if (isLoading) {
        return "Có lỗi gì đó đã xảy ra"
    }

    if (error) {
        return <div>{error.message}</div>;
    }



    //Hiển thị option cho list
    const renderButton = (params) => {
        return (
            <div style={{ display: "flex" }}>
                <QLCapNhatLinhVuc linhvucID={params.row.id} linhvucData={linhvucData} />
                <div className='space-width' />
                <QLXoaLinhVuc linhvucID={params.row.id} />
            </div>
        )
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'tenlinhvuc', headerName: 'Tên lĩnh vực', flex: 1 },
        { field: 'kyhieu', headerName: 'Ký hiệu', flex: 1 },
        { field: 'option', headerName: 'Chức năng', flex: 1, renderCell: renderButton, sortable: false }
    ];

    //Rows
    const rows = filteredLinhVuc ? [...filteredLinhVuc].reverse().map((item) => {
        return {
            id: item._id,
            tenlinhvuc: item.tenlinhvuc,
            kyhieu: item.kyhieu
        };
    }) : [];
    return (
        <Box style={pageStyle}>
            <div className='app-bar'>
                <div className="search-bar">
                    <SearchBar handleSearchLinhVuc={handleSearchLinhVuc} />
                </div>
                <div className='space-width' />
                <div className="add-button">
                    <QLThemLinhVuc />
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

export default QLLinhVuc;