import React, { Component } from "react";
import PaymentApp from "./PaymentApp";

class DebtCalcApp extends React.Component{

    constructor(params) {
        super();
        this.state = {
            debt: "-",
            debtInput: "",
            intInput: "",
            interestRate: 0,
            totalPayment:"-",
            principal: "-",
            interest: "-"
        }
        
    }


    calculateInterest = (debt, interest) => {

        return Number((((interest*10**-2)/12) * debt).toFixed(2));
    }
    calcultePrincipal(debt){
        return Number(debt * .01)
    }
    calculatetotalPayment = (debt, interest) => {
        let interestCalc = this.calculateInterest(debt, interest);
        const principal = debt * .01;

        return Number((interestCalc + principal).toFixed(2));
    }
    calculateNumPayments= (debt, interest) => {

        let interestCalc = this.calculateInterest(debt, interest);
        const principal = debt * .01;
        let totalPayment = Number((interestCalc + principal).toFixed(2));
        return Math.round(Number(debt / totalPayment))
    }


    handleDebtChange = (event) => this.setState({ debtInput: event.target.value})

    handleIntChange = (event) => this.setState({intInput: event.target.value})
    
    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     const myPromise = new Promise((resolve, reject) => {
    //         this.setState((prevState) => ({
    //             debt: Number(parseFloat(this.state.debtInput).toFixed(2)),
    //             interestRate: Number(parseFloat(this.state.intInput).toFixed(2)),
    //             }))
    //     })         
    //     myPromise
    //     .then(console.log('promise resolved'))
    //     .then(this.setState((prev)=>({
    //         interest: this.calculateInterest(prev.debt, prev.interestRate),
    //         totalPayment: this.calculatetotalPayment(prev.debt, prev.interestRate),
    //         numPayments: this.calculateNumPayments(prev.debt, prev.interestRate),
    //         principal: this.calcultePrincipal(prev.debt)
    //     })))
    //     .catch(err => console.log(err));
    // }
    afterSetState = () => { 
        const {interestRate, debt} = this.state
        this.setState({
            interest: this.calculateInterest(debt, interestRate),
            principal: this.calcultePrincipal(debt),
            totalPayment: this.calculatetotalPayment(debt, interestRate),
            numPayments: this.calculateNumPayments(debt, interestRate),
            
        })

    }
    handleSubmit = (event) => {
        const {debtInput, intInput} = this.state
        event.preventDefault();
        this.setState({
            debt: Number(parseFloat(debtInput).toFixed(2)),
            interestRate: Number(parseFloat(intInput).toFixed(2)),
        },() => {
            this.afterSetState(); // updates that need debt and interestRate to complete before executing
        });
    } 
       
    
    render(){
        return(
            <div className="form-wrapper">
                <h1>Debt Calculator</h1>
                <form className="form-input-section" onSubmit={this.handleSubmit}>
                    <div>stuff</div>

                    <label>Debt:</label>
                    <input 
                        type="number"
                        onChange={this.handleDebtChange}
                        value={this.state.debtInput}/>
                    <br />

                    <label htmlFor="InterestRate">Interest Rate:</label>
                    <input 
                        type="number" name="" id=""
                        onChange={this.handleIntChange}
                        value={this.state.intInput}/>

                    <input type="submit" onClick={this.handleSubmit} value="Submit" />
                </form>
                <div>
                    Interest: {this.state.interest}
                    <br />
                    Principal: {this.state.principal}
                    <br />
                    Total Payment:  {this.state.totalPayment}
                </div>
                <div>
                    {/* Number of Payments Required:  {this.state.numPayments} */}
                </div>
                <PaymentApp 
                debt={this.state.debt}
                totalPayment={this.state.totalPayment}
                principal={this.state.principal}
                interest={this.state.interestRate}
                calculateInterest={this.calculateInterest``}
                 />
            </div>
        )
    }  

}
export default DebtCalcApp