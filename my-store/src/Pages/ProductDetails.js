import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function ProductDetails(props) {
  const [product, setProduct] = useState({
    data: {
      Picture: "",
      Name: "",
      Price: "",
      IsAvailable: "",
      Category: "",
    },
  });
  const { id } = useParams();
  const nav = useNavigate()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const docRef = doc(db, "Products", id);
    const docSnap = await getDoc(docRef);
    let data = docSnap.data();
    setProduct(data);
  };

  return (
    <div style={{marginLeft:"40%"}}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={product.data.Picture} />
        <Card.Body>
          <Card.Title>Name: {product.data.Name}</Card.Title>
          <Card.Text>Price: {product.data.Price}$</Card.Text>
          <Card.Text>In Stock: : {product.data.IsAvailable}</Card.Text>
          <Card.Text>Category: {product.data.Category}</Card.Text>
          <Button style={{ marginRight: "10px" }} variant="primary" onClick={()=>{nav('/products')}}>
            Go Back
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
