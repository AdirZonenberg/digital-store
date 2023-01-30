import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-popup-alert";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [alert, setAlert] = useState({ type: "", text: "", show: false });

  const onSubmit = async (data) => {
    debugger;
    try{
    if (data.Picture[0]) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(data.Picture[0]);
      fileReader.onload = async (evt) => {
        data.Picture = evt.target.result;
        let res = await addDoc(collection(db, "Products"), {
          data,
        });
        reset()
        onShowAlert("success", `Product added successfully`);
      };
    }
  }
  catch{
    onShowAlert("error", `Thrown an exception when adding a product`);
  }
  };

  const onCloseAlert = () => {
    setAlert({
      type: "",
      text: "",
      show: false,
    });
  };

  const onShowAlert = (type, text) => {
    setAlert({
      type: type,
      text: text,
      show: true,
    });
  };

  return (
    <div>
      <div style={{color: "blue",fontWeight:"bold",textAlign: "center", fontSize: "30px", textDecoration:"underline"}}>Add a new product</div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            placeholder="Enter name"
            {...register("Name", { required: true })}
          />
          {errors.Name && <span style={{color: "red"}}>This field is required</span>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price:</Form.Label>
          <Form.Control type="number" {...register("Price", { required: true })} />
          {errors.Price && <span style={{color: "red"}}>This field is required</span>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Is Available:</Form.Label>
          <Form.Select {...register("IsAvailable", { required: true })}>
            <option value="True">Yes</option>
            <option value="False">No</option>
          </Form.Select>
          {errors.IsAvailable && <span style={{color: "red"}}>This field is required</span>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category:</Form.Label>
          <Form.Select {...register("Category", { required: true })}>
            <option value="Mobile">Mobile</option>
            <option value="Gaming">Gaming</option>
            <option value="Accessories">Accessories</option>
          </Form.Select>
          {errors.Category && <span style={{color: "red"}}>This field is required</span>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Picture:</Form.Label>
          <Form.Control {...register("Picture", { required: true })} type="file" />
          {errors.Picture && <span style={{color: "red"}}>This field is required</span>}
        </Form.Group>
        <Button style={{width: "10%", marginLeft: "45%"}} type="submit" variant="primary">Save</Button>
      </Form>
      <Alert
        header={"Alert"}
        btnText={"Close"}
        text={alert.text}
        type={alert.type}
        show={alert.show}
        onClosePress={onCloseAlert}
        pressCloseOnOutsideClick={true}
        showBorderBottom={true}
        alertStyles={{}}
        headerStyles={{}}
        textStyles={{}}
        buttonStyles={{}}
      />
    </div>
  );
}
