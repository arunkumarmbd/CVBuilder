import DraggableList from "react-draggable-list";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { EditModel } from "../EditModel";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const Navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [selectedField, setSelectedField] = useState({});
  const [rerender, setRerender] = useState(false);
  const [defaultList, setDefaultList] = useState([
    {
      id: 1,
      field: "Email",
      value: ""
    },
    {
      id: 2,
      field: "Name",
      value: ""
    },
    {
      id: 3,
      field: "Phone number",
      value: ""
    },
    {
      id: 4,
      field: "Profile",
      value: ""
    }
  ]);
  const [list, setList] = useState([]);
  const [newField, setNewField] = useState("");
  const [error, setError] = useState("");
  const containerRef = useRef();

  useEffect(() => {
    if (localStorage.getItem("fields")) {
      return setList(JSON.parse(localStorage.getItem("fields")));
    }
  }, [rerender]);

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminUser");
    if (!isAdmin) {
      Navigate("/login");
    }
  })

  const deleteField = (fieldName) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${fieldName}"?`);

    if (confirmDelete) {
      let itemList = [...list];
      const indexToRemove = itemList.findIndex(item => item.field === fieldName);
      if (indexToRemove !== -1) {
        itemList.splice(indexToRemove, 1);
      }
      setList(itemList);
      localStorage.setItem("fields", JSON.stringify(itemList));
    }
  };

  const Item = ({ item, itemSelected, dragHandleProps }) => {
    const { onMouseDown, onTouchStart } = dragHandleProps;

    return (
      <div className="disable-select">
        <div
          className="disable-select dragHandle"
          style={{
            fontWeight: "600"
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            console.log("touchStart");
            e.target.style.backgroundColor = "blue";
            document.body.style.overflow = "hidden";
            onTouchStart(e);
          }}
          onMouseDown={(e) => {
            console.log("mouseDown");
            document.body.style.overflow = "hidden";
            onMouseDown(e);
          }}
          onTouchEnd={(e) => {
            e.target.style.backgroundColor = "black";
            document.body.style.overflow = "visible";
          }}
          onMouseUp={() => {
            document.body.style.overflow = "visible";
          }}
        >
          <div className="IconsDrag">
            <i className="fa fa-sort" aria-hidden="true"></i>
          </div>
        </div>
        <div>
          {item.field}
        </div>
        <div className="BtnsSection">
          <div className="editSec" title="Edit" variant="primary" onClick={() => { setSelectedField(item); setModalShow(true) }}>
            <i className="fa-solid fa-pencil"></i>
          </div>
          <div>|</div>
          <div className="delSec" title="Delete" onClick={() => deleteField(item.field)}>
            <i className="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
    );
  };

  const updateList = () => {

    if (newField.trim() === "") {
      setError("Please enter the Section / Field name");
      return;
    }

    setError("");
    let newListVal = [...list];
    newListVal.push({ id: list.length + 1, field: newField, value: "" });
    setNewField("");
    setList(newListVal);
    localStorage.setItem("fields", JSON.stringify(newListVal));
  };

  const _onListChange = (newList) => {
    setList(newList);
    localStorage.setItem("fields", JSON.stringify(newList));
  };

  return (
    <div className="App">
      <EditModel show={modalShow} handleClose={() => setModalShow(false)} value={selectedField} rerender={() => setRerender(!rerender)} />
      <div className="headerAdmin mb-5">
        <Container>
          <Row>
            <Col>
              <h4 className="welcomed"> Add Field in CV Template</h4>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          {/* <Col lg={12}>
            <div className="dynamicField">
              Add Field in CV Template
            </div>
          </Col> */}
          <Col>
            <div className='dragableSection'>
              <div className='addFilds'>
                <div className='actionFieldsItem'>
                  <label htmlFor="addField">
                    Add Field / Section &nbsp; &nbsp; {error && <span style={{ color: "red" }}>{error}</span>}
                  </label>
                  <input onChange={(e) => setNewField(e.target.value)} type='text' value={newField} name='add' className='form-control' id='addField' />

                </div>
                <div className='actionFieldsItem'>
                  <button type='button' onClick={updateList}> Add Field</button>
                </div>
              </div>

              <div className='dragableDiv'>
                <div className="itemMove"
                  ref={containerRef}
                  style={{ touchAction: "pan-y" }}
                >
                  {defaultList.length ? defaultList.map(item =>
                    <div className="itemsField" key={item.id}>
                      {item.field}
                    </div>
                  ) : ""}
                  {list.length ? (
                    <DraggableList
                      itemKey="id"
                      template={Item}
                      list={list}
                      onMoveEnd={(newList) => _onListChange(newList)}
                      container={() => containerRef.current}
                    />
                  ) : ""}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
