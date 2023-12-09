import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import QLThemUser from './QLThemUser';
import QLXoaUser from './QLXoaUser'
import SearchBar from '../../global/SearchBar';
import '../quanly.css'
import { useGetUser } from '../../../api/User/useUser';
import { useState } from 'react';
import { useEffect } from 'react';
import { useGetPhongBan } from '../../../api/PhongBan/usePhongBan';



const QLUser = () => {
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        position: "relative",
        margin: "auto",
        width: "100%"
    }
    //Lấy data
    const { data: phongbanData } = useGetPhongBan();
    const { data: userData, isLoading, error } = useGetUser();

    //******* Chức năng search *******
    //User được search
    const [filteredUser, setFilteredUser] = useState("");


    //useEffect
    useEffect(() => {
        if (userData) {
            setFilteredUser(userData)
        }
    }, [userData])

    //Search method
    const handleSearchUser = (query) => {
        if (userData) {
            var searchResult = userData.filter((user) => user.tenuser.toLowerCase().indexOf(query.toLowerCase()) !== -1); //đưa tất cả về lowercase
            setFilteredUser(searchResult);
        }

    }

    //*************************************/



    if (isLoading) {
        return "Loading..."
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    //Hiển thị option cho list
    const renderButton = (params) => {
        return (
            <div style={{ display: "flex" }}>
                <QLXoaUser userID={params.row.id} />
            </div>
        )
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'name', headerName: 'Tên người dùng', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'phongban', headerName: 'Phòng', flex: 1 },
        { field: 'role', headerName: 'Quyền hạn', flex: 1 },
        { field: 'option', headerName: 'Chức năng', flex: 1, renderCell: renderButton, sortable: false }
    ];

    //Rows
    const rows = filteredUser ? [...filteredUser].reverse().map((item) => {
        return {
            id: item._id,
            name: item.name,
            email: item.email,
            role:item.role,
            phongban: item.phongban.tenphongban
        };
    }) : [];

    return (
        <Box style={pageStyle}>
            <div className='app-bar'>
                <div className="search-bar">
                    <SearchBar handleSearchUser={handleSearchUser} />
                </div>
                <div className='space-width' />
                <div className="add-button">
                    <QLThemUser phongbanData={phongbanData} />
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

export default QLUser;