import React, { Component } from "react";
import PaymentHistory2 from "./PaymentHistory2";
import PaymentSection2 from "./PaymentSection2";

class DebtCalcApp2 extends React.Component{

    constructor(params) {
        super();
        this.state = {
            debt: 0,
            debtInput: "",
            intInput: "",
            interestRate: 0,
            minPayment:0,
            principal: 0,
            interest: 0,
            paymentList: [],
            // totalPaymentInput: "",
            // totalPayment: 0,
        }
        
    }
    stringToNum = (str) => {
        if(str ===''){
            return 0
        }
        else{
            return Number(parseFloat(str).toFixed(2))
        }
    }
    calculateInterest = (debt, interest) => {
        return Number((((interest*10**-2)/12) * debt).toFixed(2));
    }
    calcultePrincipal(debt){
        return this.stringToNum((debt * .01))
    }
    calculateMinPayment = (debt, interest) => {
        let interestCalc = this.calculateInterest(debt, interest);
        const principal = debt * .01;
        const sum = interestCalc + principal

        return this.stringToNum(sum);
    }
    calculatePrincipalPaid = (payment, interest) => {
        return this.stringToNum(payment - interest);
    }
    // calculateNumPayments= (debt, interest) => {

    //     let interestCalc = this.calculateInterest(debt, interest);
    //     const principal = debt * .01;
    //     let minPayment = Number((interestCalc + principal).toFixed(2));
    //     return Math.round(Number(debt / minPayment))
    // }


    // USER INPUT FIELDS--------------------------------------
    handleDebtChange = (event) => this.setState({debtInput: event.target.value})

    handleIntChange = (event) => this.setState({intInput: event.target.value})

    
    handleDebtSubmit = (event) => {
        const {debtInput, intInput, totalPaymentInput, interestRate} = this.state
        event.preventDefault();
        this.setState({
            debt: this.stringToNum(debtInput),
            interestRate: this.stringToNum(intInput),
        })
       
    } 


    
    render(){
        return(
            <div className="form-wrapper">
                <h1>Debt Calculator</h1>
                <form className="user-debt-input" onSubmit={this.handleDebtSubmit}>
                    <div>
                        <label>Debt:</label>
                        <br />
                        <input
                            className="base-input-field" 
                            type="text"
                            onChange={this.handleDebtChange}
                            value={this.state.debtInput}/>
                    </div>
                    <div>
                        <label htmlFor="InterestRate">Interest Rate:</label>
                        <br />
                        <input
                            className="base-input-field" 
                            type="text" name="" id=""
                            onChange={this.handleIntChange}
                            value={this.state.intInput}/>
                    </div>
                    <div>
                        <input className="btn" type="submit" onClick={this.handleDebtSubmit} value="Submit" />
                    </div>
                </form>
                <br />
                <PaymentSection2 
                debt={this.state.debt}
                interest={this.state.interest}
                />

                {/* <PaymentHistory2 paymentList={this.state.paymentList}/> */}
            </div>
        )
    }  

}
export default DebtCalcApp2