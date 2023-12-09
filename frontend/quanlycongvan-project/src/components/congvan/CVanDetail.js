import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Checkbox } from '@mui/material';
import { Grid } from '@material-ui/core';
import { useUpdateCongVan, useGetCongVanById } from '../../api/CongVan/useCongVan';
import { useGetPhongBan } from '../../api/PhongBan/usePhongBan';
import { Document, Page, pdfjs } from 'react-pdf';
import "./congvan.css"
const CVanDetail = () => {

    //Style
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        position: "relative",
        margin: "auto"
    }
    //Lấy id từ url
    const _congvanID = useParams();
    //other State
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    //Hooks
    const updateCongVan = useUpdateCongVan();
    const { data: congvanDataById, isLoading, error } = useGetCongVanById(_congvanID.id);
    const { data: phongbanData } = useGetPhongBan();
    const [phongban, setPhongBan] = useState([])


    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; //Lỗi version thư viện  
    });

    useEffect(() => {
        //Set initial state cho phòng ban aka các phongban của congvan
        if (congvanDataById && congvanDataById.phongban) {
            const phongbanIds = congvanDataById.phongban.map((pb) => pb._id);
            setPhongBan(phongbanIds);
        }
    }, [congvanDataById]);

    //Function
    //Thêm phongban vào list
    const onCheckBoxChanged = (e) => {
        const phongbanID = e.target.value;
        setPhongBan((prevPhongBan) => {
            const isSelected = prevPhongBan.includes(phongbanID);
            if (isSelected) {
                return prevPhongBan.filter((id) => id !== phongbanID);
            } else {
                return [...prevPhongBan, phongbanID];
            }
        });
    };

    //Xử lý PDF
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages)
    }

    const handleNextPage = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    const handlePrevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    //Update công văn
    const onUpdateCongVan = async (congvan) => {
        await updateCongVan.mutateAsync(congvan)
    }

    const onSubmitCongVan = () => {
        if (congvanDataById) {
            let congvanID = _congvanID.id
            let chudecvan = congvanDataById.chudecvan
            let ngaygui = congvanDataById.ngaygui
            let kyhieucvan = congvanDataById.kyhieucvan
            let nguoinhan = congvanDataById.nguoinhan
            let file = congvanDataById.file
            let trichyeu = congvanDataById.trichyeu
            let noidung = congvanDataById.noidung
            let trangthai = congvanDataById.trangthai
            let coquanbanhanh = congvanDataById.coquanbanhanh
            let noiluubanchinh = congvanDataById.noiluubanchinh
            let loaicvan = congvanDataById.loaicvan._id
            let linhvuc = congvanDataById.linhvuc._id
            let kieucvan = congvanDataById.kieucvan
            onUpdateCongVan({
                chudecvan,
                ngaygui,
                kyhieucvan,
                nguoinhan,
                trichyeu,
                noidung,
                file,
                trangthai,
                coquanbanhanh,
                noiluubanchinh,
                loaicvan,
                linhvuc,
                kieucvan,
                phongban: phongban.map(item => item),
                congvanID
            });
        }

    }

    //Checklist
    let renderCheckList = null;
    if (phongbanData) {
        renderCheckList = phongbanData.map((pb) => {
            //kiểm tra nếu phongban của congvan có trong data của phongban
            const isPhongbanExist = phongban.includes(pb._id);
            return (
                <div key={pb._id} className="container">
                    <Checkbox value={pb._id} onChange={onCheckBoxChanged} checked={isPhongbanExist} />
                    {pb.tenphongban}
                </div>
            );
        });
    }

    if (isLoading) {
        return "Is Loading...."
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <div style={pageStyle}>
            <section id="header">
                <h3>Công văn:{congvanDataById.kyhieucvan} </h3>
            </section>
            <Box className="detail-box">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <p>Chủ đề:{congvanDataById.chudecvan}</p>
                        <p>Người nhận:{congvanDataById.nguoinhan}</p>
                        <p>Trích yếu:{congvanDataById.trichyeu}</p>
                        <p>Ngày gửi:{congvanDataById.ngaygui}</p>
                        <p>Cơ quan ban hành:{congvanDataById.coquanbanhanh}</p>
                        <p>Nơi lưu bản chính:{congvanDataById.noiluubanchinh}</p>
                        <p>Loại công văn:{congvanDataById.loaicvan.tenloaicvan}</p>
                        <p>Lĩnh vực:{congvanDataById.nguoinhan}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <h4>Gửi tới phòng ban:</h4>
                        {renderCheckList}
                        <Button onClick={onSubmitCongVan} style={{ float: "right" }} variant="contained">Lưu</Button>
                    </Grid>
                </Grid>
            </Box>
            <div style={{ height: "16px" }} />
            <h3>{congvanDataById.filename}</h3>
            <Box className="detail-box">
                <Box style={{ margin: "auto" }}>
                    <Button onClick={handlePrevPage} disabled={pageNumber === 1}>
                        Previous Page
                    </Button>
                    <span> Page {pageNumber} / {numPages} </span>
                    <Button onClick={handleNextPage} disabled={pageNumber === numPages}>
                        Next Page
                    </Button>
                </Box>
                <Box style={{ outline: "1px solid gray", display: "flex", justifyContent: "center" }}>
                    <Document
                        file={`http://localhost:8000/congvans/download/${congvanDataById.fileurl}`}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page
                            scale={1.5}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                            pageNumber={pageNumber} />
                    </Document>
                </Box>
                <Box style={{ margin: "auto" }}>
                    <Button onClick={handlePrevPage} disabled={pageNumber === 1}>
                        Previous Page
                    </Button>
                    <span> Page {pageNumber} / {numPages} </span>
                    <Button onClick={handleNextPage} disabled={pageNumber === numPages}>
                        Next Page
                    </Button>
                </Box>
            </Box>

        </div>
    );
};

export default CVanDetail;