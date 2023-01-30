import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-popup-alert";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    alignItems: "center",
    alignContent: "center",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  image: {
    width: 200,
  },
  saveChangesButton: {
    left: 110,
  },
}));

export default function EditProduct({ handleOpen, handleClose, product, update }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const onSubmit = async (data) => {
    try {
      if (data.Picture[0]) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(data.Picture[0]);
        fileReader.onload = async (evt) => {
          data.Picture = evt.target.result;
          update(product.ref, data)
        };
      }
      else{
        data.Picture = product.data.Picture
        update(product.ref, data)
      }
      handleClose()
    } catch {
      
    }
  };

  return (
    <Modal
      open={handleOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <div
          style={{
            color: "blue",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "30px",
            textDecoration: "underline",
          }}
        >
          Update
        </div>
        <div className={classes.root}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                placeholder="Enter name"
                {...register("Name", { required: true })}
                defaultValue={product.data.Name}
              />
              {errors.Name && (
                <span style={{ color: "red" }}>This field is required</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                {...register("Price", { required: true })}
                defaultValue={product.data.Price}
              />
              {errors.Price && (
                <span style={{ color: "red" }}>This field is required</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Is Available:</Form.Label>
              <Form.Select defaultValue={product.data.IsAvailable} {...register("IsAvailable", { required: true })}>
                <option value="True">Yes</option>
                <option value="False">No</option>
              </Form.Select>
              {errors.IsAvailable && (
                <span style={{ color: "red" }}>This field is required</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category:</Form.Label>
              <Form.Select defaultValue={product.data.Category} {...register("Category", { required: true })}>
                <option value="Mobile">Mobile</option>
                <option value="Gaming">Gaming</option>
                <option value="Accessories">Accessories</option>
              </Form.Select>
              {errors.Category && (
                <span style={{ color: "red" }}>This field is required</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Picture:</Form.Label>
              <Form.Control
                {...register("Picture", { required: false })}
                type="file"
              />
            </Form.Group>
            <img style={{width:"100px", height: "100px"}} src={product.data.Picture}/>
            <Button
              style={{ width: "25%", marginLeft: "10%" }}
              type="submit"
              variant="primary"
            >
              Update
            </Button>
          </Form>
          
        </div>
      </div>
    </Modal>
  );
}
