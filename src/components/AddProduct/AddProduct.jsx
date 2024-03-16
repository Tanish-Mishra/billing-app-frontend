import React,{useState} from "react";
import styles from "./AddProduct.module.css";
const AddProduct = ({setIsAddProduct}) => {

  return (

    <div className={styles.product}>
    <h3 className={styles.home__header_title}>VishuPriya Electricals</h3>

      <div className={styles.product__container}>
        <label>
          <span>Product Name: </span>
        </label>
        <input type="text" placeholder="Item Name" />
      </div>
      <div className={styles.product__container}>
        <label>
        <span>Base Price: </span>
        </label>
          <input type="text" placeholder="Base Price" />
      </div>
      <div className={styles.product__container}>
        <label>
            <span>Selling Price: </span>
        </label>
          <input type="text" placeholder="Selling Price" />
      </div>

      <div className={styles.product__btn_container}>
        <button className={styles.product__btn} onClick={()=>{
            setIsAddProduct(false)
        }}>Cancel</button>
        <button className={styles.product__btn}>Add Prod.</button>
      </div>
    </div>
  );
};

export default AddProduct;
