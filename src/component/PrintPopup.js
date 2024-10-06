import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import html2pdf from 'html2pdf.js';

export const PrintPopup = ({ show, handleClose, name, email, position, phone, fields, selectedImage }) => {
    const contentRef = useRef(null);

    const handleDownload = () => {
        const element = contentRef.current;
        const opt = {
            margin: 0.5,
            filename: 'Curriculum vitae.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size='xl'>
                <Container>
                    <Row>
                        <Col>
                            <div className='mainWrapper'>
                                <div className='mainCvView'>
                                    <div className='cvTitle'>
                                        <h4 className='position-relative'>Curriculum vitae
                                            <div className='borderbtm'></div>
                                        </h4>
                                    </div>
                                    <div ref={contentRef}>
                                        <div className='wrapperFieldsMend'>
                                            <div className='headerSec'>
                                                <div className='imgProfileim'>
                                                    {selectedImage && (
                                                        <img src={selectedImage} alt="profileImg" />
                                                    )}
                                                </div>
                                                <div className='imgProfile'>
                                                    {name && (
                                                        <div className='itemformFieldName itemformField'>
                                                            <i className="fa-solid fa-user"></i>
                                                            <div className='fieldItem'>
                                                                {name}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {position && (
                                                        <div className='itemformField'>
                                                            <i className="fa-solid fa-briefcase"></i>
                                                            <div className='fieldItem'>
                                                                {position}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {phone && (
                                                        <div className='itemformField'>
                                                            <i className="fa-solid fa-square-phone"></i>
                                                            <div className='fieldItem'>
                                                                {phone}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {email && (
                                                        <div className='itemformField'>
                                                            <i className="fa-solid fa-envelope"></i>
                                                            <div className='fieldItem'>
                                                                {email}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='firstrowfull'>
                                            {
                                                fields.length ?
                                                    fields.map((item, index) => (
                                                        item.value.trim() !== "" && ( // Check if value is not empty
                                                            <div key={index} className='summurySection'>
                                                                <div className='summuryItem'>
                                                                    <h4>{item.field}</h4>
                                                                </div>
                                                                <div dangerouslySetInnerHTML={{ __html: item.value }} />
                                                            </div>
                                                        )
                                                    )) : <></>
                                            }
                                        </div>
                                    </div>
                                    <div className='fieldItem btnSections'>
                                        <button className='btn btn-primary' onClick={handleDownload}>Download</button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal>
        </>
    );
}
