import { height } from "@mui/system";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import EditProduct from "./EditProduct";

export default function ProductItem(props) {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    setOpen(true);
  };

  const handleClose = () => {
    debugger;
    setOpen(false);
  };

  return (
    <div>
      <Col>
        <Card style={{ width: "20rem", height: "30rem" }}>
          <Card.Img
            variant="top"
            style={{ height: "280px" }}
            src={props.product.data.Picture}
          />
          <Card.Body>
            <Card.Title>{props.product.data.Name}</Card.Title>
            <Card.Text>{props.product.data.Price}$</Card.Text>
          </Card.Body>
          <div className="card-footer">
            <Button
              style={{ float:'left', width:'80px', height:'35px' }}
              onClick={() => {
                nav(`/Products/${props.product.id}`);
              }}
              variant="primary"
            >
              Details
            </Button>
            <Button
              style={{ float:'left', marginLeft:'25px', width:'80px', height:'35px' }}
              variant="primary"
              onClick={handleOpen}
            >
              Edit
            </Button>
            <Button
            style={{ float:'right', width:'80px', height:'35px' }}
              onClick={() => {
                props.delete(props.product.ref);
              }}
              variant="danger"
            >
              Delete
            </Button>
          </div>
        </Card>
      </Col>
      <EditProduct
        handleOpen={open}
        handleClose={handleClose}
        product={props.product}
        update={props.update}
      />
    </div>
  );
}
