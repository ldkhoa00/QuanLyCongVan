import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchBar from '../global/SearchBar';
import '../quanly/quanly.css'
import { useState } from 'react';
import { useGetCongVan } from '../../api/CongVan/useCongVan';
import { useGetUserById } from '../../api/User/useUser';


const UserListCongVan = () => {
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        position: "relative",
        margin: "auto",
        width: "100%"
    }
    //Lấy userID
    const userID = localStorage.getItem("userID")

    //Lấy data
    const { data: congvanData } = useGetCongVan();
    const { data: userData } = useGetUserById(userID);

    //function
    // Hàm lọc để lấy danh sách công văn
    let danhSachCongVan = null;
    if (congvanData && userData) {
        const userPhongBanID = userData.phongban._id;

        // Lọc các công văn theo điều kiện phongbanID trùng nhau
        danhSachCongVan = congvanData.filter(congvan => {
            return congvan.phongban.some(pb => pb._id === userPhongBanID);
        });

    }




    //******* Chức năng search *******
    //NhanVien được search
    const [filteredCongVan, setFilteredCongVan] = useState([]);

    //Search method
    const handleSearchCongVan = (query) => {
        if (danhSachCongVan) {
            if (query === '') {
                setFilteredCongVan(danhSachCongVan);
            } else {
                var searchResult = danhSachCongVan.filter((congvan) =>
                    congvan.chudecvan.toLowerCase().indexOf(query.toLowerCase()) !== -1
                );
                setFilteredCongVan(searchResult);
            }
        }
    }
    //*************************************/



    const columns = [
        {
            field: 'id', headerName: 'ID', width: 220, renderCell: (params) => {
                return <a href={`/congvan/${params.id}`}>{params.id}</a>;
            },
        },
        { field: 'chudecvan', headerName: 'Chủ đề', flex: 1 },
        { field: 'kyhieucvan', headerName: 'Ký hiệu', flex: 1 },
        { field: 'ngaygui', headerName: 'Ngày gửi', flex: 1 },
        { field: 'loaicvan', headerName: 'Loại công văn', flex: 1 },
        { field: 'linhvuc', headerName: 'Lĩnh vực', flex: 1 },
        {
            field: 'file', headerName: 'File', renderCell: (params) => {
                return <a href={`http://localhost:8000/congvans/download/${params.row.fileurl}`}>{params.row.file}</a>
            }
        },
        { field: 'trangthai', headerName: 'Trạng thái', flex: 1 },
        // { field: 'option', headerName: 'Chức năng', flex: 1, renderCell: renderButton, sortable: false }
    ];

    //Rows
    const rows = filteredCongVan ? [...filteredCongVan].reverse().map((item) => {
        return {
            id: item._id,
            chudecvan: item.chudecvan,
            kyhieucvan: item.kyhieucvan,
            ngaygui: item.ngaygui,
            loaicvan: item.loaicvan.tenloaicvan,
            linhvuc: item.linhvuc ? item.linhvuc.tenlinhvuc : "N/A",
            file: item.filename,
            fileurl: item.fileurl,
            trangthai: item.trangthai === 0 ? "Chưa ký duyệt" : "Đã ký duyệt"
        };
    }) : [];


    return (
        <Box style={pageStyle}>
            <div className='app-bar'>
                <div className="search-bar">
                    <SearchBar handleSearchCongVan={handleSearchCongVan} />
                </div>
                <div className='space-width' />
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

export default UserListCongVan;