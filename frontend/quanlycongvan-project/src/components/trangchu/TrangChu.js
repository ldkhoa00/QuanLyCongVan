import React, { useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from "react-router-dom";
import { useGetCongVan } from "../../api/CongVan/useCongVan";
import { useState } from "react";

// Grid version 2
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 0,
    fontWeight: 'bold',
}));

const TrangChu = () => {
    const { data: congvanData, isLoading, error } = useGetCongVan();
    const [congvandenData, setCongVanDenData] = useState(null)
    const [congvandiData, setCongVanDiData] = useState(null)
    const [congvannoiboData, setCongVanNoiBoData] = useState(null)

    useEffect(() => {
        if (congvanData) {
            let congvannoibo = congvanData.filter((congvan) => congvan.kieucvan === "Công văn nội bộ")
            let congvandi = congvanData.filter((congvan) => congvan.kieucvan === "Công văn đi")
            let congvanden = congvanData.filter((congvan) => congvan.kieucvan === "Công văn đến")
            setCongVanDenData(congvanden)
            setCongVanDiData(congvandi)
            setCongVanNoiBoData(congvannoibo)
        }
    }, [congvanData])


    return (
        <div>
            <h1
                style={{
                    textAlign: "center",
                    color: "#2bc48a",
                }}
            >
                Hệ Thống Quản Lý Công Văn
            </h1>
            <Grid container spacing={1}>
                <Grid xs={2.4} md={2.4} >
                    <Link to="/nhanvien">
                        <Item
                            sx={{
                                borderBottom: "#EBEBEB solid",
                            }}
                        >
                            Quản lý nhân viên
                        </Item>
                        <Item>
                            <Box
                                component="img"
                                sx={{
                                    height: 128,
                                    width: 128,
                                }}
                                alt="The house from the offer."
                                src="https://cdn-icons-png.flaticon.com/512/11516/11516546.png"
                            />
                        </Item>
                    </Link>
                </Grid>
                <Grid xs={2.4} md={2.4}>
                    <Link to="/phongban">
                        <Item
                            sx={{
                                borderBottom: "#EBEBEB solid",
                            }}
                        >
                            Quản lý phòng ban
                        </Item>
                        <Item>
                            <Box
                                component="img"
                                sx={{
                                    height: 128,
                                    width: 128,
                                }}
                                alt="The house from the offer."
                                src="https://cdn-icons-png.flaticon.com/512/3052/3052371.png"
                            />
                        </Item>
                    </Link>
                </Grid>
                <Grid xs={2.4} md={2.4}>
                    <Link to="/linhvuc">
                        <Item
                            sx={{
                                borderBottom: "#EBEBEB solid",
                            }}
                        >
                            Quản lý lĩnh vực
                        </Item>
                        <Item>
                            <Box
                                component="img"
                                sx={{
                                    height: 128,
                                    width: 128,
                                }}
                                alt="The house from the offer."
                                src="https://cdn-icons-png.flaticon.com/512/2799/2799609.png"
                            />
                        </Item>
                    </Link>
                </Grid>
                <Grid xs={2.4} md={2.4}>
                    <Link to="/loaicvan">
                        <Item
                            sx={{
                                borderBottom: "#EBEBEB solid",
                            }}
                        >
                            Quản lý loại công văn
                        </Item>
                        <Item>
                            <Box
                                component="img"
                                sx={{
                                    height: 128,
                                    width: 128,
                                }}
                                alt="The house from the offer."
                                src="https://cdn-icons-png.flaticon.com/512/2644/2644102.png"
                            />
                        </Item>
                    </Link>
                </Grid>
                <Grid xs={2.4} md={2.4}>
                    <Link to="/congvan">
                        <Item
                            sx={{
                                borderBottom: "#EBEBEB solid",
                            }}
                        >
                            Quản lý công văn
                        </Item>
                        <Item>
                            <Box
                                component="img"
                                sx={{
                                    height: 128,
                                    width: 128,
                                }}
                                alt="The house from the offer."
                                src="https://cdn-icons-png.flaticon.com/512/2666/2666436.png"
                            />
                        </Item>
                    </Link>
                </Grid>
            </Grid>
            {/* <h2
                style={{
                    textAlign: "center",
                    color: "#2bc48a",
                }}
            >
                Xin chào, bạn đang làm việc tại Phòng Hành Chính Nhân Sự
            </h2> */}
            <p style={{
                textAlign: "center"
            }}>Thống kê:</p>
            <Grid container spacing={3}>
                <Grid xs={3} md={3}>
                    <Item>
                        <div style={{
                            display: "flex",
                            position: "relative"
                        }}>
                            <div>
                                <div style={{
                                    color: "orange",
                                    fontSize: "30px",

                                }}>{congvanData ? congvanData.length : "0"}</div>
                                <div>Tổng công văn</div>
                            </div><Box
                                component="img"
                                sx={{
                                    height: 32,
                                    width: 32,
                                    position: "absolute",
                                    right: 5,
                                    top: 15
                                }}
                                alt="The house from the offer."
                                src="https://cdn-icons-png.flaticon.com/512/9463/9463155.png"
                            />
                        </div>
                    </Item>
                </Grid>
                <Grid xs={3} md={3}>
                    <Item>
                        <div style={{
                            display: "flex",
                            position: "relative"
                        }}>
                            <div>
                                <div style={{
                                    color: "orange",
                                    fontSize: "30px",

                                }}>{congvandenData ? congvandenData.length : "0"}</div>
                                <div>Công văn đến</div>
                            </div><Box
                                component="img"
                                sx={{
                                    height: 32,
                                    width: 32,
                                    position: "absolute",
                                    right: 5,
                                    top: 15
                                }}
                                alt="picture"
                                src="https://cdn-icons-png.flaticon.com/512/9463/9463155.png"
                            />
                        </div>
                    </Item>
                </Grid>
                <Grid xs={3} md={3}>
                    <Item>
                        <div style={{
                            display: "flex",
                            position: "relative"
                        }}>
                            <div>
                                <div style={{
                                    color: "orange",
                                    fontSize: "30px",

                                }}>{congvandiData ? congvandiData.length : "0"}</div>
                                <div>Công văn đi</div>
                            </div><Box
                                component="img"
                                sx={{
                                    height: 32,
                                    width: 32,
                                    position: "absolute",
                                    right: 5,
                                    top: 15
                                }}
                                alt="The house from the offer."
                                src="https://cdn-icons-png.flaticon.com/512/9463/9463155.png"
                            />
                        </div>
                    </Item>
                </Grid>
                <Grid xs={3} md={3}>
                    <Item>
                        <div style={{
                            display: "flex",
                            position: "relative"
                        }}>
                            <div>
                                <div style={{
                                    color: "orange",
                                    fontSize: "30px",

                                }}>{congvannoiboData ? congvannoiboData.length : "0"}</div>
                                <div>Công văn nội bộ</div>
                            </div><Box
                                component="img"
                                sx={{
                                    height: 32,
                                    width: 32,
                                    position: "absolute",
                                    right: 5,
                                    top: 15
                                }}
                                alt="The house from the offer."
                                src="https://cdn-icons-png.flaticon.com/512/9463/9463155.png"
                            />
                        </div>
                    </Item>
                </Grid>
            </Grid>
        </div>
    );
}
export default TrangChu;