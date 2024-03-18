import React, { useRef, useState, useEffect } from "react";
import styles from "./Bill.module.css";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";


const Bill = () => {

 

  const pdfRef = useRef();
  

  const downloadPdf = () => {
    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4", true);

      const pdfWidth = pdf.internal.pageSize.getWidth();

      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;

      const imgHeight = canvas.height;

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const imgX = (pdfWidth - imgWidth * ratio) / 2;

      const imgY = 0;

      pdf.addImage(
        imgData,

        "PNG",

        imgX,

        imgY,

        imgWidth * ratio,

        imgHeight * ratio
      );

      pdf.save("invoice.pdf");
    
    });
  };

  const printPdf = () => {
    const input = pdfRef.current;
  
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF("p", "mm", "a4", true);
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
  
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
  
      // Set autoPrint option to true
      const options = {
        autoPrint: {
          variant: "non-conform"
        }
      };
  
      // Print the PDF document
      pdf.output("dataurlnewwindow", options);
  
      // Alternatively, if you want to open the print dialog without opening a new window
      // you can use the following:
      // pdf.autoPrint(options);
  
      // Note: This will prompt the browser's print dialog.
    });
  };

  const [today, setToday] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    setToday(formattedDate);
  }, []);





  return (
    <div className={styles.bill}>
      <div className={styles.bill__body} ref={pdfRef}>

     <div className={styles.bill__header}>
         <div>
           <span> <b>Bill No.</b></span>
           <span><b>Date:</b> {today}</span>
         </div>
         <img src="https://img.freepik.com/free-vector/colorful-bird-illustration-gradient_343694-1741.jpg?w=1380&t=st=1710574664~exp=1710575264~hmac=be6529fbaaf32a6b879cc59314d53e1ea8485a4f7b16d48c3538db29eec60d8d" height='100px' width='100px' alt="logo"/>
     </div>
  <hr/>

 <h3 className={styles.bill__title}>Invoice</h3>

<div className={styles.bill__address_detail}>
  
  <div className={styles.bill__addres_client}>
    <div><b>Billed to:</b></div>
    {/* <span>Ayush Mishra</span> */}
    <input type='text' name="clientName" placeholder="Your Client Name"/>
    <span>+91<input type='text' name="contactNo" placeholder="Contact No."/></span>
  </div>

  <div className={styles.bill__addres_client}>
  <div><b>From:</b></div>
    <span>Vishnu Priya Electrical</span>
    <span>9450839388 </span>
    <span>Lalganj Ajhara,Pratabgarh</span>
  </div>

</div>
          <div className={styles.bill__item_container}> 

            <div className={styles.bill__information}>
              <span>Item</span>
              <div className={styles.bill__sub_information}>
                <span style={{
                  margin: "0 0.5rem 0 0"
                }}>Quantity</span>
                <span>Price(In Rs.)</span>
                <span>Amount(In Rs.)</span>
              </div>
            </div>


            <div className={styles.bill__products_information}>

    {/* Add Products here  */}

            <div className={styles.bill__product_container}>
              <span>Item Name</span>
              <div className={styles.bill__sub_pinformation}>
                <span style={{
                  margin: "0 -0.35rem 0 0"
                }}><input type='text' name="quantity" placeholder="Quantity"/></span>
                <span style={{
                  margin: "0 1rem 0 0"
                }}>&#8377;&nbsp;<input type='text' name="sellingPrice" placeholder="Price"/></span>
                <span>&#8377;&nbsp; 23</span>
              </div>
              </div>
              <hr/>
            

          

 <div className={styles.bill__total}>
 <hr/>
  <b style={{
    fontSize: "1.3rem",
    margin:"0 1rem 0 0"
  }}>Total:</b>  <span style={{
    fontSize:'1.1rem'
  }}>&#8377;&nbsp;222</span>
 </div>
            </div>
          
          </div>

          <div className={styles.bill__footer}>
   <div><b>Payment method: </b> <span>Cash</span></div>
   <div><b>Note: </b> <span>Thank you for choosing us!</span></div>
          </div>
      </div>
      <button onClick={printPdf}>Download</button>
    </div>
  );
};

export default Bill;
