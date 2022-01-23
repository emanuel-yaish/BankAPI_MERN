import React from "react";
import "./Account.css";

function Account(props) {
  const { passportid, cash, credit } = props;
  return (
    <div className="account">
      <div>Account Number: {passportid}</div>
      <div>Balance: {cash}</div>
      <div>Credit: {credit}</div>
    </div>
  );
}

export default Account;
