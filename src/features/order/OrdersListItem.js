import { height } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";

const OrdersListItem = ({ one }) => {

  return (
      <div className="orderDetails" style={{ width: "100%", height: "30%" }}>
        <div className="orderAdress" style={{ color: '#A76CED' }}>{one.orderAdress} כתןבת:</div>
        <div>{one.ordererId}קוד מזמין:</div>
        {/* <div className="productPrice">{one.price} ₪</div> */}
      </div>
  );
};

export default OrdersListItem;