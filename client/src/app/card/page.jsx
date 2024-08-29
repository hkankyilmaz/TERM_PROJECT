"use client";
import React from "react";
import { useCard } from "@/store/Card";
import { Toaster, toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { createOrder } from "@/services/orderservice";

function Card() {
  const { cart, setCart } = useCard();

  const email = Cookies.get("user_email_hemenal");
  const name = Cookies.get("user_name_hemenal");

  const handleOrder = () => {
    const data = {
      orders: cart,
      totalPrice:
        cart.reduce((acc, item) => +acc + +item.productPrice, 0) + " $",
      email: email,
      name: name,
    };

    console.log(data);
    setCart([]);
    createOrder(data);
    toast.success(
      "Order placed successfully, Orders details sent to your email"
    );
  };

  return (
    <div className="px-6">
      <h2 className="text-center text-xl font-bold mb-3">Cart</h2>
      <div className="">
        {cart.length === 0 && <p className="text-center">Cart is empty</p>}
        {cart.length > 0 && (
          <div className="flex flex-col space-y-5 justify-center items-center">
            {cart.map((product) => (
              <div key={product.id} className="border p-4 w-full shadow-lg">
                <div className="flex justify-start space-x-3 items-center">
                  <img className="max-w-[50px]" src={product.imageUrl} />
                  <div>
                    <h3>
                      <strong>Name :</strong> {product.productName}
                    </h3>
                    <p>
                      <strong>Price :</strong> {product.productPrice} $
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCart(cart.filter((item) => item.id !== product.id));
                    toast.success("Product removed from cart");
                  }}
                  className="bg-red-800 text-white px-3 py-1 hover:bg-red-900"
                >
                  Remove Product
                </button>
              </div>
            ))}

            <div className="flex justify-center items-center space-x-3">
              <h3 className="text-xl">Total Price :</h3>
              <h3 className="text-xl">
                {cart.reduce((acc, item) => +acc + +item.productPrice, 0)} $
              </h3>
            </div>

            {cart.length > 0 && (
              <button
                onClick={handleOrder}
                className="bg-blue-400 text-white px-6 py-3 w-[300px]"
              >
                BUY
              </button>
            )}
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default Card;
