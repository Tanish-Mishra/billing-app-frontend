import React, { useEffect, useState } from "react";
import styles from "./FileShare.module.css";
import fileShare from "../../apis/fileShare";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpin from "react-loading-spin";

import WhatsappIcon from "/assets/icons/whatsapp.png";
const FileShare = ({ setIsFileActive }) => {
  const [file, setFile] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [isShared, setIsShared] = useState(true);
  // FileName which is mentioned as filename should be same on frontend and on backend multer it should be same
  const shareFile = async (formData) => {
    const response = await fileShare(formData);
    return response;
  };
  const bodyObj = document.body;
  const upload = async () => {
    if (!/^\d{10}$/.test(mobileNo)) {
      setError("Mobile Number is Invalid");
      toast.error("Mobile Number is Invalid!", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
      return;
    }

    setError("");
    const formData = new FormData();
    formData.append("filename", file);
    formData.append("mobileNumber", mobileNo);
    console.log(formData);
    if (!formData) {
      toast.error("File Not Selected!", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
      return;
    }
    setIsShared(false)
    bodyObj.style.filter = "brightness(50%)";
    const response = await shareFile(formData);
      
    if (response?.status == 200) {
      toast.success("File Shared Sucessfully!", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });

      setIsShared(true);
      bodyObj.style.filter = "brightness(100%)";

    } else {
      toast.error("Error Occured!", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    }
  };

  const [error, setError] = useState();

  return (
    <div className={styles.file}>
      <div
        style={{
          display: "flex",
          position: "fixed",
          alignItems: "center",
          width: "30%",
          justifyContent: "center",
          filter: "brightness(150%)"
        }}
      >
        {!isShared && (
          <LoadingSpin
            duration="2s"
            width="8px"
            timingFunction="ease-in-out"
            direction="alternate"
            size="150px"
            primaryColor="#fafafa"
            secondaryColor="#22384c"
            numberOfRotationsInAnimation={2}
          />
        )}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
      <h3 className={styles.home__header_title}>Billzy Solutions</h3>
      <h3>Client's Mobile No :</h3>
      <input
        className={styles.file__mobile_no}
        type="number"
        name="mobileNumber"
        onChange={(e) => {
          setMobileNo(e.target.value);
        }}
        placeholder="Mobile Number"
      />
      {error && (
        <span
          style={{
            color: "red",
            fontSize: "0.8rem",
          }}
        >
          Mobile Number is Invalid!
        </span>
      )}

      <input
        type="file"
        name="filename"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <div
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <button
          className={styles.product__btn}
          onClick={() => {
            upload();
          }}
        >
          <img src={WhatsappIcon} loading="lazy" />
          Whatsapp
        </button>

        <button
          className={styles.product__btn}
          onClick={() => {
            setIsFileActive(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FileShare;
