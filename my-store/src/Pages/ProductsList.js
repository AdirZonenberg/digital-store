import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import ProductItem from "./ProductItem";
import Alert from "react-popup-alert";
import Row from "react-bootstrap/Row";
import styles from '../../src/App.css'

const style = {
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "15px",
    width: "100px",
    height: '30px',
    marginLeft: '10px',
    backgroundColor: 'black',
    color:'white'
  }
}

export default function ProductsList(props) {
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const [alert, setAlert] = useState({ type: "", text: "", show: false });
  const [isRefresh, setIsRefresh] = useState(false);
  useEffect(() => {
    fetchData();
  }, [isRefresh]);

  const fetchData = async () => {
    await getDocs(collection(db, "Products")).then((query) => {
      const newData = query.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        ref: doc.ref,
      }));
      setProducts(newData);
      setProductsFilter(newData);
    });
  };

  const deleteProduct = async (ref) => {
    try {
      await deleteDoc(ref);
      onShowAlert("success", `Product ${ref.id} deleted successfully`);
      setIsRefresh(!isRefresh);
    } catch {
      onShowAlert(
        "error",
        `Thrown an exception when deleting a product ${ref.id}`
      );
    }
  };

  const updateProduct = async (ref, data) => {
    try {
      await updateDoc(ref, { data });
      onShowAlert("success", `Product ${ref.id} updated successfully`);
      setIsRefresh(!isRefresh);
    } catch {
      onShowAlert(
        "error",
        `Thrown an exception when updating a product ${ref.id}`
      );
    }
  };

  const onCloseAlert = () => {
    debugger;
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

  const onFilter = (category) => {
    let arr = [];
    switch (category) {
      case "Mobile":
        arr = products.filter((x) => x.data.Category == "Mobile");
        break;
      case "Gaming":
        arr = products.filter((x) => x.data.Category == "Gaming");
        break;
      case "Accessories":
        arr = products.filter((x) => x.data.Category == "Accessories");
        break;
      case "All":
        arr = products;
        break;
    }

    setProductsFilter(arr);
  };

  return (
    <div>
      <div
        style={{
          color: "blue",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "30px",
          textDecoration: "underline",
        }}
      >
        Products
      </div>
      <br />
      <div>
      <button style={style.button} onClick={() => onFilter("All")}>All</button>
      <button style={style.button} onClick={() => onFilter("Gaming")}>Gaming</button>
      <button style={style.button} onClick={() => onFilter("Mobile")}>Mobile</button>
      <button style={style.button} onClick={() => onFilter("Accessories")}>Accessories</button>
      </div>
      <br />
      <Row xs={1} md={4} className="g-4">
        {productsFilter.map((item, i) => {
          return (
            <ProductItem
              product={item}
              key={i}
              delete={deleteProduct}
              update={updateProduct}
            />
          );
        })}
      </Row>
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
