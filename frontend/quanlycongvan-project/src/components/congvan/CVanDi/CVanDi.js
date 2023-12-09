import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CVanThem from '../CVanThem';
import CVanXoa from '../CVanXoa';
import CVanUpdate from '../CVanUpdate';
import { useState } from 'react';
import SearchBar from '../../global/SearchBar';

const CVanDi = ({ congvandiData, isUserAllow }) => {

    //Hiển thị option cho list
    const renderButton = (params) => {
        return (
            <div style={{ display: "flex" }}>
                <CVanUpdate isUserAllow={isUserAllow} kieucvandi={"Công văn đến"} congvandiID={params.row.id} />
                <div className='space-width' />
                <CVanXoa isUserAllow={isUserAllow} congvandiID={params.row.id} />
            </div >
        )
    }

    //Search
    //CongVan được search
    const [filteredCongVanDi, setFilteredCongVanDi] = useState([]);

    //Search method
    const handleSearchCongVanDi = (query) => {
        if (congvandiData) {
            if (query === '') {
                setFilteredCongVanDi(congvandiData);
            } else {
                var searchResult = congvandiData.filter((congvan) =>
                    congvan.chudecvan.toLowerCase().indexOf(query.toLowerCase()) !== -1
                );
                setFilteredCongVanDi(searchResult);
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
        isUserAllow() ? "" : { field: 'option', headerName: 'Chức năng', flex: 1, renderCell: renderButton, sortable: false }
    ];

    //Rows
    const rows = filteredCongVanDi ? [...filteredCongVanDi].reverse().map((item) => {
        return {
            id: item._id,
            kyhieucvan: item.kyhieucvan,
            chudecvan:item.chudecvan,
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
            <div style={{ float: "right" }}><CVanThem isUserAllow={isUserAllow} kieucvandi={"Công văn đi"} /></div>
            <h5>Công văn đến</h5>
            <SearchBar handleSearchCongVanDi={handleSearchCongVanDi} />
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

export default CVanDi;