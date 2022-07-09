import React, { Component } from "react";
import PaymentHistory2 from "./PaymentHistory2";
import PaymentSection2 from "./PaymentSection2";

class NextPayment2 extends Component {
constructor(params){
    super();

}

  render() {
    return (
        <div className="next-payment-wrapper">
            <h2>Next Payment</h2>
            <div className="next-payment-child">
                Balance: 
            </div>
            <div className="next-payment-child">
                Interest: 
            </div>

            <div className="next-payment-child">
                Principal: 
            </div>
            <div className="next-payment-child">
                Minimum Payment:  
            </div>
        </div>
    )
  }
}

export default NextPayment2