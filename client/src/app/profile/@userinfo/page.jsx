import React from "react";
import { cookies } from "next/headers";
import { getCustomerViaEmail } from "@/services/customerService";
async function UserInfo() {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(2000);

  const c = cookies();
  const email = c.get("user_email_hemenal");
  console.log(email.value);
  const customer = await getCustomerViaEmail(email.value);

  return (
    <div>
      <h1 className="mb-3 text-xl font-bold">User Info</h1>
      <p>
        <strong> Name: </strong> {customer.name}
      </p>

      <p>
        <strong>Email: </strong> {customer.email}
      </p>
      <p>
        <strong>Address:</strong> {customer.address}
      </p>
    </div>
  );
}

export default UserInfo;
