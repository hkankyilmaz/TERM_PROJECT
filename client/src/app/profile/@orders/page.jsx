import React from "react";
import { getOrders } from "@/services/orderservice";
import { cookies } from "next/headers";

async function Orders() {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(3000);

  const c = cookies();
  const email = c.get("user_email_hemenal");

  const orders = await getOrders();
  const filteredOrders = orders.orders.filter(
    (order) => order.email === email.value
  );

  return (
    <div className="">
      <h1 className="mb-3 text-xl font-bold">Orders</h1>
      <ul>
        {filteredOrders.length === 0 ? (
          <p>No Orders</p>
        ) : (
          filteredOrders.map((order, idx) => (
            <li className="mb-3" key={order.id}>
              <h3 className="border-b text-red-600"> Order {idx + 1}</h3>
              <p>
                <strong> Name : </strong> {order.name}
              </p>
              <p>
                <strong>Email :</strong> {order.email}
              </p>
              <p>
                <strong> Items : </strong>
              </p>
              {order.orders.map((item, idx) => (
                <p key={idx}>
                  {idx + 1} : {item.productName} | Price : {item.productPrice} $
                </p>
              ))}
              <p>
                <strong>Total Price :</strong> {order.totalPrice}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Orders;
