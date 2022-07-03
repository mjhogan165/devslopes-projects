import React, { Component } from 'react'
import DebtCalcApp from './DebtCalcApp';


export class PaymentApp extends Component {

    constructor(props){
        super(props);

        this.state={
            payment: 0,
            paymentInput:"",
            // newPrincipal:"-"
            // principal: "-",
            lastPrincipal: '',
            // interest: "-"
        }
        


    }
    

    handlePaymentChange = (event) => {this.setState({paymentInput: event.target.value})}

    // subtractPayment = (currDebt, payment) => {
    //     return currDebt - payment;
    // }

    // afterSetState = () => {
    //     this.setState((prev) => ({
    //         balance: prev.balance - this.state.lastPrincipal
    //     }))
    // }

    // handlePaymentSubmit = (event) => {
    //     const {balance,paymentInput} = this.state;
    //     const {debt} = this.props;
        
    //     // this.setState({
    //     //     lastPrincipal: this.props.principal,
    //     //     balance: debt
    //     // },() => {
    //     //     this.afterSetState(); // updates that need debt and interestRate to complete before executing
    //     // });
    //     event.preventDefault();
    //     // this.afterState();
    //     this.setState((prev) => ({payment: Number(paymentInput)}))

    //     //first time around
    //     if(isNaN(balance)){
    //         this.setState(() => ({
    //             balance:debt - this.props.principal,
    //             lastPrincipal: this.props.principal
    //         })) 
    //         console.log('if fired')
    //     }
    //     //all subsequent updates
    //     else{ this.setState((prev) => ({
    //         balance:prev.balance - this.state.lastPrincipal
        
    //     }))
    //     console.log('else fired')
    //     }
           
    //     }
    componentDidUpdate(prevProps, prevState, snapShot) {

            //when balance prop updates, interest is calculated with new balance
            if(this.props.balance !== prevProps.balance){
                this.setState((prev) => ({
                    interest: Number((((this.props.interestRate*10**-2)/12) * this.props.balance).toFixed(2)),
                    principal: Number(this.props.balance * .01)
                }))


    }

    }
  render() {
    // const  { debt } = this.props;
    const {balance} = this.props;
    return (
    <div>
        <h2>Payment Tracker</h2>
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
            Balance: {balance} 
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
