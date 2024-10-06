import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import dummy from '../assets/img/dummy.jpg'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PrintPopup } from './PrintPopup';

export const User = () => {
    const [fields, setFields] = useState([]);
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [editorData, setEditorData] = useState('');
    const [show, setShow] = useState(false);
    const [nameErr, setNameErr] = useState(false);
    const [positionErr, setPositionErr] = useState(false);
    const [phoneErr, setPhoneErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [selectedImage, setSelectedImage] = useState(dummy);

    useEffect(() => {
        if (localStorage.getItem("fields")) {
            return setFields(JSON.parse(localStorage.getItem("fields")));
        }
        setFields([]);
    }, []);

    const handleEditorChange = (id, editorData) => {
        const updatedFields = fields.map(item => {
            if (item.id === id) {
                return { ...item, value: editorData };
            }
            return item;
        });
        setFields(updatedFields);
    };

    const handleSubmitResume = () => {
        let isValid = true;

        if (!name.length) {
            setNameErr(true);
            isValid = false;
        } else {
            setNameErr(false);
        }

        if (!position.length) {
            setPositionErr(true);
            isValid = false;
        } else {
            setPositionErr(false);
        }


        if (phone.length !== 10 || !/^[0-9]+$/.test(phone)) {
            setPhoneErr(true);
            isValid = false;
        } else {
            setPhoneErr(false);
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email === "" || !emailRegex.test(email)) {
            setEmailErr(true);
            isValid = false;
        } else {
            setEmailErr(false);
        }

        if (isValid) {
            setShow(true);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <div className=''>
                <PrintPopup show={show} handleClose={() => setShow(false)} fields={fields} name={name} position={position} email={email} phone={phone} selectedImage={selectedImage} />
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
                                    <div className='wrapperFieldsMend'>
                                        <div className='headerSec'>
                                            <div className='imgProfileim'>
                                                {selectedImage && (
                                                    <div>
                                                        <input type="file" accept="image/*" onChange={handleImageChange} />
                                                        <div className='cemeraIcon'>
                                                            <i className="fa-solid fa-image"></i>
                                                        </div>
                                                        <img src={selectedImage} alt="Selected" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className='imgProfile'>
                                                <div className='itemformFieldName itemformField '>
                                                    <i className="fa-solid fa-user"></i>
                                                    <div className='fieldItem'>
                                                        <input
                                                            onChange={(e) => {
                                                                const input = e.target.value;
                                                                const nameRegex = /^[a-zA-Z\s]*$/;

                                                                if (input.length === 0) {
                                                                    setNameErr(true);
                                                                    setName("");
                                                                } else if (!nameRegex.test(input) || /^[0-9]/.test(input)) {
                                                                    setNameErr(true);
                                                                    setName(input.replace(/[^a-zA-Z\s]/g, ''));
                                                                } else {
                                                                    setNameErr(false);
                                                                    setName(input);
                                                                }
                                                            }}
                                                            value={name}
                                                            type='text'
                                                            className='form-control'
                                                            placeholder='Name *'
                                                            required
                                                        />
                                                        {nameErr ? (
                                                            <p style={{ color: "red" }}>
                                                                {name.length === 0 ? "Name is required" : "Numeric values are not allowed"}
                                                            </p>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className='itemformField'>
                                                    <i className="fa-solid fa-briefcase"></i>
                                                    <div className='fieldItem'>
                                                        <input onChange={(e) => setPosition(e.target.value)} type='text' className='form-control' placeholder='e.g. UI Developer ( React) *' required />
                                                        {positionErr ? <p style={{ color: "red" }}>Designation is required</p> : <></>}
                                                    </div>
                                                </div>
                                                <div className='itemformField'>
                                                    <i className="fa-solid fa-square-phone"></i>
                                                    <div className='fieldItem'>
                                                        <input
                                                            onChange={(e) => {
                                                                const phoneInput = e.target.value;
                                                                const phoneRegex = /^[6-9]\d{0,9}$/;
                                                                if (phoneInput === "" || phoneRegex.test(phoneInput)) {
                                                                    setPhone(phoneInput);
                                                                }
                                                            }}
                                                            value={phone}
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="+91 **** *** ***"
                                                            required
                                                            maxLength={10}
                                                        />
                                                        {phoneErr ? <p style={{ color: "red" }}>Phone number must be 10 digits long</p> : <></>}
                                                    </div>
                                                </div>
                                                <div className='itemformField'>
                                                    <i className="fa-solid fa-envelope"></i>
                                                    <div className='fieldItem'>
                                                        <input
                                                            onChange={(e) => { setEmail(e.target.value); }}
                                                            value={email}
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="example@example.com"
                                                            required
                                                        />
                                                        {emailErr ? <p style={{ color: "red" }}>Email is invalid / required.</p> : <></>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='firstrowfull'>
                                        {
                                            fields.length ?
                                                fields.map((item) =>
                                                    <div className='summurySection' key={item.id}>
                                                        <div className='summuryItem'>
                                                            <h4>{item.field}</h4>
                                                        </div>
                                                        <div>
                                                            <CKEditor
                                                                editor={ClassicEditor}
                                                                config={{
                                                                    toolbar: [
                                                                        'heading',
                                                                        '|',
                                                                        'bold', 'italic',
                                                                        '|',
                                                                        'bulletedList', 'numberedList',
                                                                        '|',
                                                                        'undo', 'redo'
                                                                    ]
                                                                }}
                                                                data={item.value}
                                                                onChange={(event, editor) => {
                                                                    const data = editor.getData();
                                                                    handleEditorChange(item.id, data);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                ) : <></>
                                        }
                                        <div className='fieldItem btnSections'>
                                            <button className='btn btn-primary' onClick={() => handleSubmitResume()}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
