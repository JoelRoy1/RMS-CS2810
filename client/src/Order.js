import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
function Order() {
  const [cart, setCart] = useState();
  useEffect(() => {
    const cartData = localStorage.getItem("orders");
    if (cartData) {
      // If cartData exists in local storage, parse it and set it to state
      setCart(JSON.parse(cartData));
      console.log(JSON.parse(cartData)); // Logging the cart data
    }
  }, []);
  console.log(cart);
  return (
    <>
      <div style={{ width: "800px", margin: "auto" }}>
        <h1>Order Summary</h1>
        <br />
        <br />

        {cart && cart.length > 0
          ? cart.map((item, index) => (
              <div key={index} style={{ display: "flex", margin: "50px" }}>
                <img
                  src={item.image} // Assuming each item in the cart has an 'image' property
                  alt={item.name} // Assuming each item in the cart has a 'name' property
                  style={{ width: "100px", borderRadius: "10px" }}
                />
                <div
                  style={{
                    width: "700px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h4 style={{ paddingLeft: "50px" }}>{item.name}</h4>
                    <h4 style={{ paddingLeft: "50px" }}>
                      QTY : {item.quantity}
                    </h4>
                  </div>
                  <div>
                    <p>
                      <span>$</span>
                      {item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : ""}

        {cart && cart.length > 0 ? (
          <div>
            <p
              style={{
                fontWeight: "600",
                textAlign: "right",
                paddingRight: "45px",
              }}
            >
              Total: $
              {cart.reduce((sum, item) => {
                const price = parseFloat(item.price.replace("$", ""));
                return sum + (price * item.quantity || 0);
              }, 0)}
            </p>
          </div>
        ) : (
          <p style={{ fontWeight: "600" }}>No orders till now</p>
        )}

        <div>
          <NavLink to="/">
            <button type="button" class="btn btn-primary">
              Go to Home
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Order;
