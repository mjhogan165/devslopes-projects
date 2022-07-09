import React, { Component } from 'react'
import NextPayment2 from './NextPayment2';
import PaymentHistory2 from './PaymentHistory2';

export class PaymentSection2 extends Component {
    constructor(params){
        super();
        this.state={
            totalPaymentInput: 0,
            totalPayment: 0,
            balance:0
        }
    }

    handleTotalPayChange = (event) => this.setState({totalPaymentInput: event.target.value})

    handleTotalPayment = (event) => {
        const {debt, interest} = this.props
        event.preventDefault();
        this.setState({
            balance: debt,
            totalPayment: parseFloat(this.state.totalPaymentInput) 
        })
    }

  render() {
    return (
      
        <div className="payment-info-wrapper">
            <div className="make-payment-wrapper">
                <h2>Payment</h2>
                <form action="make-payment-input">
                    <div>
                        <label>Enter Amount: </label>
                        <br />
                        <input
                            className="base-input-field" 
                            type="number"
                            onChange={this.handleTotalPayChange}
                            value={this.state.totalPaymentInput}/>
                            <br />
                    </div>
                    <div>
                        <input className="btn" onClick={this.handleTotalPayment} type="submit"  value="Make Payment" />
                    </div>
                    <div>
                        <h3>Or</h3>
                    </div>
                    <div>
                        <button  className="btn" >Make Minimum Payment</button>
                    </div>
                </form>                        
            </div>
            <NextPayment2 />
                
        </div>
      
    )
  }
}

export default PaymentSection2