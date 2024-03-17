import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";


const Login = () => {
   const navigate = useNavigate()

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <h3 className={styles.login__heading}>Vishnu Priya Electricals</h3>
        <p>Your Personal Billing Software</p>
        <input
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
        />
        <button
          className={styles.login__submitbtn}
          onClick={()=>{
            navigate('/')
          }}
        >
          Login
        </button>

      </div>
    </div>
  );
};

export default Login;
