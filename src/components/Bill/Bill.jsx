import React, { useRef, useState, useEffect, useMemo } from "react";
import styles from "./Bill.module.css";
import { getBills, createBill } from "../../apis/bills";
import { getProducts } from "../../apis/product";
import toast, { Toaster } from 'react-hot-toast';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import LoadingSpin from "react-loading-spin";

import { CirclePlus } from "lucide-react";
import { CircleMinus } from 'lucide-react';

const Bill = () => {
  const [totalBills, setTotalBills] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [invoiceProducts, setInvoiceProducts] = useState([]);
  const [newItem,setNewItem] = useState([])

  const pdfRef = useRef();

  const getBillData = async () => {
    const response = await getBills();
    setTotalBills(response.bills);
  };

  const getAllProducts = async () => {
    const response = await getProducts(title);
    setAllProducts(response?.products);
    return response;
  };

  // useEffect(()=> {
  //  getAllProducts()
  // },[])

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
          variant: "non-conform",
        },
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
  const [title, setTitle] = useState();

  useEffect(() => {
    const currentDate = new Date();
    const options = { year: "numeric", month: "long", day: "2-digit" };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);
    setToday(formattedDate);
    getBillData();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, []);

  const addInvoiceProduct = (product) => {
    let filteredProduct = invoiceProducts.filter((item) => {
      return item._id == product._id;
    });

    if (!filteredProduct.length) {
      setInvoiceProducts([...invoiceProducts, {
        _id: product._id,
        productName: product.productName,
        basePrice: product.basePrice,
        sellingPrice: product.sellingPrice,
        quantity: 1,

      }]);
      
      toast.success('Product Added!', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    }
  };



  const editInvoiceProducts = (event, product) => {
    const updatedProducts = invoiceProducts.map(item => {
      if (item._id === product._id) {
        return {
          ...item,
          quantity: parseInt(event.target.value)
        };
      }
      return item;
    });
  
    setInvoiceProducts(updatedProducts);
  };

  const onEditSellingPrice = (event,product) => {
    const updatedProducts = invoiceProducts.map((item)=>{
         if(product._id === item._id) {
          return {
            ...item,
            sellingPrice: parseInt(event.target.value)
          }
         }
         return item
    })

    setInvoiceProducts(updatedProducts)
  }

  const removeInvoiceProduct = (product) => {
    let filteredProduct = invoiceProducts.filter((item) => {
      return item._id !== product._id;
    });
  
  setInvoiceProducts(filteredProduct);
  toast.success('Removed!', {
    style: {
      border: '1px solid #713200',
      padding: '16px',
      color: '#713200',
    },
    iconTheme: {
      primary: '#713200',
      secondary: '#FFFAEE',
    },
  });
  };

  const addNewItem = () => {
    let newProduct = {
      productName: "",
      basePrice: "",
      sellingPrice: "",
    }
    setInvoiceProducts([...invoiceProducts,newProduct])
    toast.success('Product Added!', {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    });
  }

  useMemo(()=>{
  const totalBill = invoiceProducts.reduce((acc,item)=>{
                return acc + (item.quantity * item.sellingPrice)    
  },0)
  setTotalAmount(totalBill)
  },[invoiceProducts])
   
  return (
    <div className={styles.bill__area}>
      <Toaster
  position="top-right"
  reverseOrder={false}
/>
      <div className={styles.home__header}>
        <img
          src="https://img.freepik.com/free-vector/colorful-bird-illustration-gradient_343694-1741.jpg?w=1380&t=st=1710574664~exp=1710575264~hmac=be6529fbaaf32a6b879cc59314d53e1ea8485a4f7b16d48c3538db29eec60d8d"
          height="100px"
          width="100px"
          style={{
            borderRadius: "50%",
          }}
          alt="error"
        />
        <h3 className={styles.home__header_title}>VishuPriya Electricals</h3>
        <div className={styles.home__navigation}>
          <button
            className={styles.home__header_btn}
            onClick={() => {
              printPdf();
            }}
          >
            Print Bill
          </button>
          <button
            className={styles.home__header_btn}
            onClick={() => {
              downloadPdf();
            }}
          >
            Download Pdf
          </button>
          <button className={styles.home__header_btn}>Whatsapp</button>
        </div>
      </div>


      <div className={styles.home__search_product}>

        <div>
        <div className={styles.home__search_area}>
          <input
            type="text"
            placeholder="Search Product"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            onKeyDown={(event)=>{ getAllProducts();}}
          />
          <button
            onClick={() => {
              getAllProducts();
            }}
          >
            Search
          </button>
        </div>


        <div className={styles.home__search_results}>
          {   allProducts?.length > 0 ? (  allProducts?.map((item) => (
          
              <div className={styles.home__search_allproducts}>
                <span>{item.productName}</span>
                <span className={styles.home__priceandadd}>
                  &#8377; {item.sellingPrice}{" "}
                  <span
                    className={styles.home__add_icon}
                    onClick={() => {
                      addInvoiceProduct(item);
                    }}
                  >
                    {" "}
                    <CirclePlus />
                  </span>
                </span>
              </div>
        
          ))) : (<div className={styles.home__noresult_productbill}>
            <LoadingSpin
              duration="2s"
              width="4px"
              timingFunction="ease-in-out"
              direction="alternate"
              size="55px"
              primaryColor="#000000"
              secondaryColor="#fafafa"
              numberOfRotationsInAnimation={2}
            />
            No Products Available!
          </div>) }

        </div>
        </div>
 <div>
      <h3 className={styles.bill__selectedproduct_heading}> Selected Products: </h3>
        <div className={styles.home__search_results} style={{
          margin: "0.9rem 0 0 0"
        }}>
          
          {invoiceProducts?.map((item) => {
            return (
              <div className={styles.home__search_allproducts}>
                <span>{item.productName}</span>
                <span className={styles.home__priceandadd}>
                  &#8377; {item.sellingPrice}{" "}
                  <span
                    className={styles.home__add_icon}
                    onClick={() => {
                          removeInvoiceProduct(item)
                    }}
                  >
                    {" "}
                    <CircleMinus />
                  </span>
                </span>
              </div>
            );
          })}
        </div>
        </div>
      <button className={styles.home__additem_btn} onClick={()=>{
            addNewItem()
      }}>Add Item</button>
      </div>

      <div className={styles.bill}>
        <div className={styles.bill__body} ref={pdfRef}>
          <div className={styles.bill__header}>
            <div>
              <span>
                {" "}
                <b>Bill No.</b> {totalBills.length + 1}
              </span>
              <span>
                <b>Date:</b> {today}
              </span>
            </div>
            <img
              src="https://img.freepik.com/free-vector/colorful-bird-illustration-gradient_343694-1741.jpg?w=1380&t=st=1710574664~exp=1710575264~hmac=be6529fbaaf32a6b879cc59314d53e1ea8485a4f7b16d48c3538db29eec60d8d"
              height="100px"
              width="100px"
              alt="logo"
            />
          </div>
          <hr />

          <h3 className={styles.bill__title}>Invoice</h3>

          <div className={styles.bill__address_detail}>
            <div className={styles.bill__addres_client}>
              <div>
                <b>Billed to:</b>
              </div>
              <input
                type="text"
                name="clientName"
                placeholder="Your Client Name"
              />
              <span>
                +91
                <input type="text" name="contactNo" placeholder="Contact No." />
              </span>
            </div>

            <div className={styles.bill__addres_client}>
              <div>
                <b>From:</b>
              </div>
              <span>Vishnu Priya Electrical</span>
              <span>9450839388 </span>
              <span>Lalganj Ajhara,Pratabgarh</span>
            </div>
          </div>
          <div className={styles.bill__item_container}>
            <div className={styles.bill__information}>
              <span>Item</span>
              <div className={styles.bill__sub_information}>
                <span
                  style={{
                    margin: "0 0.5rem 0 0",
                  }}
                >
                  Quantity
                </span>
                <span
                  style={{
                    margin: "0 -0.4rem 0 0",
                  }}
                >
                  Price(In Rs.)
                </span>
                <span>Amount(In Rs.)</span>
              </div>
            </div>

            <div className={styles.bill__products_information}>
              {/* Add Products here  */}

              {invoiceProducts.map((data) => (
                <>
                <div className={styles.bill__product_container}>
                  <span>
                    <input
                      type="text"
                      name="itemName"
                      placeholder="Item Name"
                      value={data?.productName}
                    />
                  </span>
                  <div className={styles.bill__sub_pinformation}>
                    <span
                      style={{
                        margin: "0 -0.35rem 0 0",
                      }}
                    >
                      <input
                        type="text"
                        name="quantity"
                        placeholder="Quantity"
                        onChange={(event)=>{editInvoiceProducts(event,data)}}
                      />
                    </span>
                    <span
                      style={{
                        margin: "0 1rem 0 0",
                      }}
                    >
                      &#8377;&nbsp;
                      <input
                        type="text"
                        name="sellingPrice"
                        placeholder="Price"
                       value={data?.sellingPrice || event.target.value}
                       onChange={(event)=>{onEditSellingPrice(event,data)}}
                      />
                    </span>
                    <span>&#8377;&nbsp; {data.quantity*data.sellingPrice}</span>
                  </div>
                 
                </div>

<hr style={{
  margin: "0.4rem 0"
}}/>
</>
              ))}




              <div className={styles.bill__total}>
                <b
                  style={{
                    fontSize: "1.3rem",
                    margin: "0 1rem 0 0",
                  }}
                >
                  Total:
                </b>{" "}
                <span
                  style={{
                    fontSize: "1.1rem",
                  }}
                >
                  &#8377;&nbsp;{totalAmount}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.bill__footer}>
            <div>
              <b>Payment method: </b>{" "}
              <span>
                <input
                  type="text"
                  name="paymentMode"
                  placeholder="Cash/UPI"
                  style={{
                    textTransform: "uppercase",
                  }}
                />
              </span>
            </div>
            <div>
              <b>Note: </b> <span>Thank you for choosing us!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bill;
