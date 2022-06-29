import React, { Component } from 'react'
import DebtCalcApp from './DebtCalcApp';


export class PaymentApp extends Component {

    constructor(props){
        super(props);

        this.state={
            payment: 0,
            paymentInput:"",
            debtState: "-",
            // newPrincipal:"-"
            principal: "-",
            interest: "-"
        }
        


    }
    afterState = () => {
        const {debtState} = this.state
        this.setState({
            principal: Number(debtState * .01),
            interest: this.props.calculateInterest(debtState,this.props.interest)
        })
    }
    
    handleDownPayment = () => {
        this.setState({debtState: this.props.debt - this.props.principal},()=>{this.afterState();})
        
    }

    handlePaymentChange = (event) => {this.setState({paymentInput: event.target.value})}

    subtractPayment = (currDebt, payment) => {
        return currDebt - payment;
    }

    handlePaymentSubmit = (event) => {
        const {debtState,paymentInput, principal} = this.state;
        const {debt} = this.props;
 
        event.preventDefault();
        // this.afterState();
        this.setState((prev) => ({payment: Number(paymentInput)}))
        if(!isNaN(debtState) && debtState !== debt){
            this.setState((prev) => ({debtState:prev.debtState - Number(paymentInput)}))
        }
        else{this.setState((prev) => ({debtState:debt - Number(paymentInput)}))}
            

        }
        


  render() {
    // const  { debt } = this.props;
    const {debtState} = this.state;
    return (
    <div>
        <h2>Payment Tracker</h2>
        <button onClick={this.handleDownPayment}>Down Payment</button>
        <form action="" onSubmit={this.handlePaymentSubmit}>
            <label htmlFor="">Payment Amount:</label>
            <input 
                type="number"  
                onChange={this.handlePaymentChange}
                value={this.state.paymentInput}/>
        </form>

        <br />
        <button onClick={this.handlePaymentSubmit}>Make Payment</button>
        <div> 
            Balance: {debtState} 
            <br />
            New Principal: {this.state.principal}
            <br />
            New Interest: {this.state.interest}
        
        </div>

    </div>
      
    )
  }
}

export default PaymentApp
