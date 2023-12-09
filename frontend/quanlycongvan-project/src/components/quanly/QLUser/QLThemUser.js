import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, MenuItem } from '@mui/material';
import { useRegisterUser } from '../../../api/User/useUser';



const QLThemUser = ({ phongbanData }) => {

    //State
    const [openInner, setOpenInner] = useState(false);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [phongban, setPhongban] = useState("")
    const [error, setError] = useState("")

    //Hooks được tạo với react-query
    const addUser = useRegisterUser();

    //Function
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setOpenInner(false)
    }

    const onNameChange = (e) => {
        setName(e.target.value);
    }
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const onRoleChange = (e) => {
        setRole(e.target.value);
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const onPhongBanChange = (e) => {
        setPhongban(e.target.value);
    }

    //Function
    //MenuItem cho PhongBan Select
    let phongbanSelect = null;
    if (phongbanData) {
        phongbanSelect = phongbanData.map((phongban) => (
            <MenuItem key={phongban._id} value={phongban._id}>
                {phongban.tenphongban}
            </MenuItem>
        ))
    }

    //Thêm User
    const onAddUser = async (user) => {
        console.log(user)
        await addUser.mutateAsync(user)
    }

    const onSubmitUser = () => {
        if (!name || !email || !role || !phongban || !password) {
            setError('Please fill in all required fields');
            return
        }
        setError('');
        onAddUser({
            name,
            email,
            password,
            role,
            phongban
        })
        handleClose()
    }

    return (
        <Box>
            <Button variant="outlined" onClick={handleOpen} size='large'>
                Thêm
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Thêm Người Dùng Mới
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '30ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <div>
                            {error}
                            <TextField
                                id="email"
                                onChange={onEmailChange}
                                value={email}
                                label="Email"
                                variant="outlined" />
                            <TextField
                                id="password"
                                type="password"
                                onChange={onPasswordChange}
                                value={password}
                                label="Mật khẩu"
                                variant="outlined" />
                            <TextField
                                id="name"
                                onChange={onNameChange}
                                value={name}
                                label="Tên người dùng"
                                variant="outlined" />
                            <TextField
                                id="role"
                                onChange={onRoleChange}
                                value={role}
                                select
                                label="Quyền hạn"
                                variant="outlined">
                                <MenuItem value="user">USER</MenuItem>
                                <MenuItem value="admin">ADMIN</MenuItem>
                            </TextField>
                            <TextField
                                id="outlined-select-department"
                                onChange={onPhongBanChange}
                                value={phongban}
                                select
                                label="Phòng ban">
                                {phongbanSelect}
                            </TextField>
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>HỦY</Button>
                    <Button onClick={onSubmitUser} autoFocus>
                        XÁC NHẬN
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openInner}
                onClose={handleClose}
            >
                <DialogTitle>
                    Thêm phòng ban thành công
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
};

export default QLThemUser;