import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CVanThem from '../CVanThem';
import CVanXoa from '../CVanXoa';
import CVanUpdate from '../CVanUpdate';

const CVanDen = ({ congvandenData }) => {

    //Hiển thị option cho list
    const renderButton = (params) => {
        return (
            <div style={{ display: "flex" }}>
                <CVanUpdate kieucvanden={"Công văn đến"} congvandenID={params.row.id} />
                <div className='space-width' />
                <CVanXoa congvandenID={params.row.id} />
            </div>
        )
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'kyhieucvan', headerName: 'Ký hiệu', flex: 1 },
        { field: 'ngaygui', headerName: 'Ngày gửi', flex: 1 },
        { field: 'loaicvan', headerName: 'Loại công văn', flex: 1 },
        { field: 'linhvuc', headerName: 'Lĩnh vực', flex: 1 },
        { field: 'file', headerName: 'File', flex: 1 },
        { field: 'trangthai', headerName: 'Trạng thái', flex: 1 },
        { field: 'option', headerName: 'Chức năng', flex: 1, renderCell: renderButton, sortable: false }
    ];

    //Rows
    const rows = congvandenData ? [...congvandenData].reverse().map((item) => {
        return {
            id: item._id,
            kyhieucvan: item.kyhieucvan,
            ngaygui: item.ngaygui,
            loaicvan: item.loaicvan.tenloaicvan,
            linhvuc: item.linhvuc ? item.linhvuc.tenlinhvuc : "N/A",
            file: item.filename,
            trangthai: item.trangthai === 0 ? "Chưa ký duyệt" : "Đã ký duyệt"
        };
    }) : [];

    return (
        <>
            <div style={{ float: "right" }}><CVanThem kieucvanden={"Công văn đến"} /></div>
            <h5>Công văn đến</h5>
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