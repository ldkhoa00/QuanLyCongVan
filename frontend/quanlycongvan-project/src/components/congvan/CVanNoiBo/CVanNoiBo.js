import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CVanThem from '../CVanThem';
import CVanXoa from '../CVanXoa';
import CVanUpdate from '../CVanUpdate';
import SearchBar from '../../global/SearchBar';
import { useState } from 'react';

const CVanNoiBo = ({ congvannoiboData, isUserAllow }) => {


    //Hiển thị option cho list
    const renderButton = (params) => {
        return (
            <div style={{ display: "flex" }}>
                <CVanUpdate isUserAllow={isUserAllow} kieucvanden={"Công văn đến"} congvandenID={params.row.id} />
                <div className='space-width' />
                <CVanXoa isUserAllow={isUserAllow} congvandenID={params.row.id} />
            </div >
        )
    }

    //Search
    //CongVan được search
    const [filteredCongVanNoiBo, setFilteredCongVanNoiBo] = useState([]);

    //Search method
    const handleSearchCongVanNoiBo = (query) => {
        if (congvannoiboData) {
            if (query === '') {
                setFilteredCongVanNoiBo(congvannoiboData);
            } else {
                var searchResult = congvannoiboData.filter((congvan) =>
                    congvan.chudecvan.toLowerCase().indexOf(query.toLowerCase()) !== -1
                );
                setFilteredCongVanNoiBo(searchResult);
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
    const rows = filteredCongVanNoiBo ? [...filteredCongVanNoiBo].reverse().map((item) => {
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
            <div style={{ float: "right" }}><CVanThem isUserAllow={isUserAllow} kieucvannoibo={"Công văn nội bộ"} /></div>
            <h5>Công văn nội bộ</h5>
            <SearchBar handleSearchCongVanNoiBo={handleSearchCongVanNoiBo} />
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

export default CVanNoiBo;