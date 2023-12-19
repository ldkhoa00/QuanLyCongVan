import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CVanThem from '../CVanThem';
import CVanXoa from '../CVanXoa';
import CVanUpdate from '../CVanUpdate';
import SearchBar from '../../global/SearchBar';
import { useState } from 'react';

const CVanDen = ({ congvandenData, isUserAllow, danhSachCongVan }) => {


    //Hiển thị option cho list
    const renderButton = (params) => {
        let isIdInList = null
        if (danhSachCongVan) {
            isIdInList = danhSachCongVan.some((item) => item._id === params.row.id);
        }
        return (
            <div style={{ display: isIdInList ? 'none' : '' }}>
                <div style={{ display: "flex" }}>
                    <CVanUpdate isUserAllow={isUserAllow} kieucvanden={"Công văn đến"} congvandenID={params.row.id} />
                    <div className='space-width' />
                    <CVanXoa isUserAllow={isUserAllow} congvandenID={params.row.id} />
                </div >
            </div>
        )

    }
    //Search
    //CongVan được search
    const [filteredCongVanDen, setFilteredCongVanDen] = useState([]);

    //Search method
    const handleSearchCongVanDen = (query) => {
        if (congvandenData) {
            if (query === '') {
                setFilteredCongVanDen(congvandenData);
            } else {
                var searchResult = congvandenData.filter((congvan) =>
                    congvan.chudecvan.toLowerCase().indexOf(query.toLowerCase()) !== -1
                );
                setFilteredCongVanDen(searchResult);
            }
        }
    }

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
        { field: 'option', headerName: 'Chức năng', flex: 1, renderCell: renderButton, sortable: false }
    ];

    //Rows
    const rows = filteredCongVanDen ? [...filteredCongVanDen].reverse().map((item) => {
        return {
            id: item._id,
            kyhieucvan: item.kyhieucvan,
            chudecvan: item.chudecvan,
            ngaygui: item.ngaygui,
            loaicvan: item.loaicvan.tenloaicvan,
            linhvuc: item.linhvuc ? item.linhvuc.tenlinhvuc : "N/A",
            file: item.filename,
            fileurl: item.fileurl,
            trangthai: item.trangthai === 0 ? "Chưa ký duyệt" : "Đã ký duyệt"
        };
    }) : [];

    return (
        <>
            <div style={{ float: "right" }}><CVanThem isUserAllow={isUserAllow} kieucvanden={"Công văn đến"} /></div>
            <h5>Công văn đến</h5>
            <SearchBar handleSearchCongVanDen={handleSearchCongVanDen} />
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
        </>
    );
};

export default CVanDen;