import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { FaSearch } from 'react-icons/fa';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import { useEffect } from 'react';

const SearchBar = (props) => {

    //Lấy props search từ component khác
    const handleSearchNhanVien = props.handleSearchNhanVien;
    const handleSearchPhongBan = props.handleSearchPhongBan;
    const handleSearchLinhVuc = props.handleSearchLinhVuc;

    const [searchQuery, setSearchQuery] = useState("")

    const onSearchQueryChanged = (e) => {
        setSearchQuery(e.target.value)
    }

    useEffect(() => {
        if (handleSearchNhanVien) {
            handleSearchNhanVien(searchQuery);
        }
        else if (handleSearchPhongBan) {
            handleSearchPhongBan(searchQuery);
        }
        else if (handleSearchLinhVuc) {
            handleSearchLinhVuc(searchQuery)
        }
    }, [searchQuery, handleSearchNhanVien, handleSearchPhongBan, handleSearchLinhVuc])

    return (
        <Box>
            <TextField
                size="small"
                style={{ width: "100%" }}
                value={searchQuery}
                onChange={onSearchQueryChanged}
                label="Tìm kiếm"
                InputProps={{
                    type: 'search',
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton>
                                <FaSearch fontSize="medium" />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

// const rows = [{ "id": 1, "firstName": "Prince", "lastName": "Jachimak", "department": "HR", "email": "pjachimak0@dell.com", "phone": "930-297-9967", "address": "473 Dahle Way", "startDate": "6/9/2023" },
// { "id": 2, "firstName": "Rickey", "lastName": "Rosenstein", "department": "Marketing", "email": "rrosenstein1@smh.com.au", "phone": "795-972-7716", "address": "20193 Bunting Alley", "startDate": "8/13/2023" },
// { "id": 3, "firstName": "Casandra", "lastName": "Derham", "department": "HR", "email": "cderham2@t-online.de", "phone": "302-938-4795", "address": "3 Ludington Avenue", "startDate": "7/24/2023" },
// { "id": 4, "firstName": "Maurits", "lastName": "Leal", "department": "IT", "email": "mleal3@disqus.com", "phone": "522-155-8111", "address": "701 Westend Circle", "startDate": "7/20/2023" },
// { "id": 5, "firstName": "Roxine", "lastName": "Maven", "department": "Sales", "email": "rmaven4@va.gov", "phone": "488-753-7570", "address": "6 Monterey Parkway", "startDate": "1/30/2023" },
// { "id": 6, "firstName": "Pernell", "lastName": "Garrad", "department": "Sales", "email": "pgarrad5@feedburner.com", "phone": "590-615-8032", "address": "34536 Buell Terrace", "startDate": "10/25/2022" },
// { "id": 7, "firstName": "Jephthah", "lastName": "Edgecombe", "department": "Finance", "email": "jedgecombe6@ted.com", "phone": "304-284-0878", "address": "9644 Dryden Junction", "startDate": "4/18/2023" },
// { "id": 8, "firstName": "Roberto", "lastName": "Browning", "department": "IT", "email": "rbrowning7@ifeng.com", "phone": "253-696-2023", "address": "4952 Magdeline Park", "startDate": "5/10/2023" },
// { "id": 9, "firstName": "Sheppard", "lastName": "Guarin", "department": "Finance", "email": "sguarin8@state.tx.us", "phone": "274-376-4935", "address": "68 Walton Place", "startDate": "4/17/2023" },
// { "id": 10, "firstName": "Manon", "lastName": "Hazelden", "department": "HR", "email": "mhazelden9@ted.com", "phone": "565-352-1728", "address": "0 Michigan Road", "startDate": "6/10/2023" }]

export default SearchBar;