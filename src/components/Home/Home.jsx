import React,{useState} from "react";
import styles from "./Home.module.css";

import Header from "../Header/Header";
import AddProduct from "../AddProduct/AddProduct";
import { Search } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';
const Home = () => {
  const [isAddProduct,setIsAddProduct] = useState(false)
  return (
    <div className={styles.home}>
     <Header setIsAddProduct ={setIsAddProduct}/>
   { isAddProduct ? <div className={styles.addproduct}>
     <AddProduct setIsAddProduct={setIsAddProduct}/>
     </div> : <></>}
      <div className={styles.home__body}>
        <div className={styles.home__body_header}>
          <span>Products :</span>
          <div className={styles.home__body_searcharea}>
          <input type="text" placeholder="Search Product" className={styles.home__input}/> 
          <button className={styles.home__body_searchbtn}><Search/></button>
          </div>
        </div>
        <div className={styles.home__product_container}>
           
         <div className={styles.home__product_information}>
            <span>Product Name{" (In Rs.)"}</span>
            <span>Base Price{" (In Rs.)"}</span>
            <span>Selling Price{" (In Rs.)"}</span>
         </div>


         <div className={styles.home__product}>
            <span>Relay 5Ampere</span>
            <span>Rs.200</span>
            <span className={styles.home__product_selling}>Rs.2300   <span className={styles.home__delete_product}> <Pencil /> &nbsp; <Trash2/></span></span>
         </div>
         <hr/>

      

        </div>
      </div>
    </div>
  );
};

export default Home;
