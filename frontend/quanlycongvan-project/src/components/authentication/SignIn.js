import React, { useState } from 'react';
import { Box, Grid, TextField, InputAdornment, Dialog } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { Link } from 'react-router-dom';
import './user.css';
import { useLoginUser } from '../../api/User/useUser';
// import { useDispatch, useSelector } from 'react-redux';
// import { userLogin } from './userSlice';
// import { selectUser, selectToken } from './userSlice';
import { FaUserAlt, FaEye, FaEyeSlash, FaRegTimesCircle } from "react-icons/fa";


import Button from '@mui/material/Button/Button';
const SignIn = () => {

    //Style
    const dialogTitleStyle = {
        backgroundColor: '#4e54ed',
        color: 'white',
        display: "flex",
        alignItems: "center",
        justtifyContent: "space-around"
    }


    const [iconUserFocusStyle, setIconUserFocusStyle] = useState("");
    const [iconLockFocusStyle, setIconLockFocusStyle] = useState("login-form--lockicon-unblur")

    const [inputType, setInputType] = useState("password");

    //style khi người dùng nhấn vào form
    const onIconFocus = (e) => {
        if (e.target.id === "email") {
            setIconUserFocusStyle('login-form--usericon');
        }
        if (e.target.id === "password") {
            setIconLockFocusStyle('login-form--lockicon')
        }

    }

    //Style khi nhấn ra ngoài form
    const onIconBlur = (e) => {
        if (e.target.id === "email") {
            setIconUserFocusStyle('');
        }
        setIconLockFocusStyle('login-form--lockicon-unblur');
    }

    //đóng mở dialog
    const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    //--------------------------------------------------
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = useLoginUser()

    //Đăng nhập
    const onLoginUser = async (user) => {
        try {
            await loginUser.mutateAsync(user)
            window.location.href = '/trangchu'; //sau khi token được authen thì mới chuyển trang "/"
        }
        catch (err) {
            console.log(err)
            if (err) {
                setOpen(true);
            }
        }
    };
   
    //Event nút đăng nhập
    const onLoginClicked = (e) => {
        const regex = /^([^@]*@[^@]*)$/
        if (regex.test(email)) {
            onLoginUser({
                email,
                password
            })
            return 'submit email'
        }
        onLoginUser({
            email,
            password
        })
        return 'submit email'
    };


    // //Clear token
    // const onLogOut = () => {
    //     localStorage.clear();
    // }


    const onUsernameChange = (e) => {
        setEmail(e.target.value)
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    //Hiển thị password
    const onCheckPassword = (e) => {
        setInputType(inputType === "password" ? 'text' : 'password')
    }

    return (
        <div className="user-form-container" >
            <Box className="login-form">
                <div className="login-form__title">
                    <p>Sign in</p>
                </div>
                <Box sx={{ flexGrow: 1, height: 'fit-content', width: "100%" }}>
                    <Grid container spacing={3} rowSpacing={5}>
                        <Grid item xs={12}>
                            <TextField
                                onChange={onUsernameChange}
                                onFocus={onIconFocus}
                                onBlur={onIconBlur}
                                value={email}
                                required
                                id="email"
                                label="Email"
                                variant='outlined'
                                fullWidth={true}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <FaUserAlt className={iconUserFocusStyle} />
                                        </InputAdornment>
                                    )
                                }}
                            // error={fullName.length < 1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={onPasswordChange}
                                onFocus={onIconFocus}
                                onBlur={onIconBlur}
                                value={password}
                                required
                                id="password"
                                label="Password"
                                variant='outlined'
                                fullWidth={true}
                                type={inputType}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {inputType === "password" ?
                                                <FaEyeSlash onClick={onCheckPassword} className={iconLockFocusStyle} />
                                                : <FaEye onClick={onCheckPassword} className={iconLockFocusStyle} />}
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Link to="/forget">
                                <div>
                                    <p className='text__recoverypassword'>Forget Password ?</p>
                                </div>
                            </Link>
                            {/* <Link to="/signup">
                                <div>
                                    <p className='text__signup'>Sign up</p>
                                </div>
                            </Link> */}

                        </Grid>
                        <Grid item xs={12}>
                            <div className="btn btn--form">
                                <Button className="btn__login" onClick={onLoginClicked}>Login</Button>
                            </div>
                            {/* <button onClick={onLogOut}>RESET TOKEN</button> */}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Dialog fullWidth={false} open={open} onClose={handleClose}>
                <DialogTitle style={dialogTitleStyle}>
                    <span>Invalid Password or Username</span>
                    <FaRegTimesCircle style={{ color: "#eb4438" }} />
                </DialogTitle>
                <DialogContent style={{
                    paddingTop: '16px',
                    paddingBottom: '16px'
                }}>
                    Please try again
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
};

export default SignIn;  