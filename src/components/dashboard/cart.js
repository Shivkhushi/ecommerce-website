import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import spice from "../assets/spice.jpeg";
import ecomm from "../assets/ecomm.png";
import "./file.css";
import { useNavigate, useParams } from "react-router-dom";

export const Cart = () => {
  const navigate = useNavigate();

  const [cartslist, setCartsList] = useState([]);
  const [quantities, setQuantities] = useState({});

  const { product_id,c_id } = useParams();
  const [categorys, setCategorys] = useState({});
  const [product, setProduct] = useState({});

 useEffect(() => {
    axios
      .get(`http://localhost:3300/category/get_category?cat_id=${c_id}`) // Replace with your actual category API endpoint
      .then((response) => {
        if (response.status === 200) {
          // Assuming your API returns an array of categories
  
          setCategorys(response.data.data);
        } else {
          // Handle other status codes if needed
          toast.error("Failed to fetch categories");
        }
      })
      .catch((error) => {
        // Handle network errors or other errors
        console.error("Error:", error);
        toast.error("Failed to fetch categories");
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3300/product/get_product?id=${product_id}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success("access product successfully");

          setProduct(response.data.product);
        } else {
          // Handle other status codes if needed
          toast.error(" failed");
        }
      })
      .catch((error) => {
        // Handle network errors or other errors
        toast.error("failed");
        console.error("Error:", error);
      });
  }, [product_id]);

  console.log("product...", product);
  // Function to increase the quantity for a specific product
  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };
  // Function to decrease the quantity for a specific product

  const decreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0), // Ensure quantity is non-negative
    }));
  };
 
  const cartss=() => {
   
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .get("http://localhost:3300/cart/getAll", {
        headers: customHeaders,
      }) // Replace with your actual category API endpoint
      .then((response) => {
        if (response.status === 200) {
          // Assuming your API returns an array of categories
          //console.log(response.data.data)
          setCartsList(response.data.data);
        } else {
          // Handle other status codes if needed
          toast.error("Failed to fetch cart");
        }
      })
      .catch((error) => {
        // Handle network errors or other errors
        console.error("Error:", error);
        toast.error("Failedffffffffffff to fetch carts");
      });
  }

  const handleclick = (item, quantities) => {
    const selectedQuantity = quantities[item.productId] || 1;
    const updatedprice = selectedQuantity * item.price;
    const cart = {
      product_id: item.product_id,
      price: updatedprice,
      quantity: selectedQuantity || 1, // Default to 1 if quantity is not set
    };
    const jwtToken = localStorage.getItem("JWTtoken");
    const customHeaders = {
      authorization: `${jwtToken}`, // Replace 'YourAuthToken' with your actual authorization token
      "Content-Type": "application/json", // Specify the content type if needed
    };
    axios
      .post("http://localhost:3300/cart/addToCart", cart, {
        headers: customHeaders,
      }) // Send the 'cart' object as JSON data
      .then((response) => {
        if (response.status === 200) {
          toast.success("add the cart successfully");
                  cartss();
                  console.log(response.data.data)
         // setCartsList(response.data.data);

          // response.data.updatedCart.map((obj) => {
          //   localStorage.setItem(
          //     "cartdata",
          //     JSON.stringify(response.data.updatedCart)
          //   );

          // });
        } else {
          // Handle other status codes if needed
          toast.error("Failed to add to cart");
        }
      })
      .catch((error) => {
        // Handle network errors or other errors
        toast.error("Faileddddd to add to cart");
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div>
        <nav className="navbar">
          <div>
            <img className="logo" src={ecomm} alt=""></img>
          </div>
          <ul className="nav-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
          {Object.keys(product).length > 0 ? (
            <div>
              <svg
                onClick={() => navigate(`/checkout/${product.product_id}`)}
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="50"
                fill="currentColor"
                className="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              {cartslist && cartslist.length > 0 ? (
                <span>[{cartslist.length}]</span>
              ) : (
                <span>[0]</span> 
              )}
            </div>
          ) : null /* Render nothing if Object.keys(product).length is not greater than 0 */}
          
        </nav>
      </div>

      <div className="cart-item">
        {Object.keys(product).length > 0 ? (
          <div className="cart">
            <div>
              <img className="cart-item-image" src={spice} alt="" />
            </div>
            <div className="cart-item-details">
              <p className="cart-category_name">
            Category Name:  {categorys.cat_id===product.c_id?categorys.Name:null}
              </p>
              <p className="cart-product_name">
                Product Name: {product.product_name}
              </p>
              <p className="cart-price"> Price:{product.price}</p>
              <p className="cart-description">
                Description:{product.description}
              </p>

              <div className="add">
                <button onClick={() => increaseQuantity(product.product_id)}>
                  ▲
                </button>
                <span> {quantities[product.product_id] || 1}</span>
                <button onClick={() => decreaseQuantity(product.product_id)}>
                  ▼
                </button>
              </div>
              <button
                className="addcart"
                onClick={() => handleclick(product, quantities)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ) : (
          <p>No items is selected by user</p>
        )}
      </div>
    </div>
  );
};
