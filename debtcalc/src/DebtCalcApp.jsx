import React, { Component } from "react";
import PaymentApp from "./PaymentApp";
import PaymentHistory from "./PaymentHistory";

class DebtCalcApp extends React.Component{

    constructor(params) {
        super();
        this.state = {
            debt: "-",
            debtInput: "",
            intInput: "",
            interestRate: 0,
            minPayment:"-",
            principal: "-",
            interest: "-",
            paymentList: []
        }
        
    }


    calculateInterest = (debt, interest) => {

        return Number((((interest*10**-2)/12) * debt).toFixed(2));
    }
    calcultePrincipal(debt){
        return Number((debt * .01).toFixed(2))
    }
    calculateminPayment = (debt, interest) => {
        let interestCalc = this.calculateInterest(debt, interest);
        const principal = debt * .01;

        return Number((interestCalc + principal).toFixed(2));
    }
    // calculateNumPayments= (debt, interest) => {

    //     let interestCalc = this.calculateInterest(debt, interest);
    //     const principal = debt * .01;
    //     let minPayment = Number((interestCalc + principal).toFixed(2));
    //     return Math.round(Number(debt / minPayment))
    // }


    handleDebtChange = (event) => this.setState({ debtInput: event.target.value})

    handleIntChange = (event) => this.setState({intInput: event.target.value})
    
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
    afterSetState = () => { 
        const {interestRate, debt} = this.state
        this.setState({
            interest: this.calculateInterest(debt, interestRate),
            principal: this.calcultePrincipal(debt),
            minPayment: this.calculateminPayment(debt, interestRate),
            // numPayments: this.calculateNumPayments(debt, interestRate),
            balance: debt
            
        })

    }

    handleMinPayment = () => {
        const { balance, interestRate, principal } = this.state
        this.setState((prev) => ({
            balance: ((prev.balance) - (principal)).toFixed(2),
        }))
        const newPayment = {
            interest: this.calculateInterest(balance, interestRate),
            minPayment:this.calculateminPayment(balance, interestRate),
            principal:this.calcultePrincipal(balance),
            balance: balance
        }
        this.state.paymentList.push(newPayment)

    }
    componentDidUpdate(prevProps, prevState, snapShot) {
        const { balance, interestRate } = this.state
        //when balance prop updates, interest is calculated with new balance
        if(this.state.balance !== prevState.balance){
            this.setState((prev) => ({
                interest: this.calculateInterest(balance, interestRate),
                principal: this.calcultePrincipal(balance),
                minPayment: this.calculateminPayment(balance, interestRate)
            }))
    }
    }   
    
    render(){
        return(
            <div className="form-wrapper">
                <h1>Debt Calculator</h1>
                <form className="form-input-section" onSubmit={this.handleSubmit}>

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
                    Minimum Payment:  {this.state.minPayment}
                </div>
                <button onClick={this.handleMinPayment}>Make Minimum Payment</button>
                <div>
                    {/* Number of Payments Required:  {this.state.numPayments} */}
                </div>
                {/* <PaymentApp 
                debt={this.state.debt}
                minPayment={this.state.minPayment}
                principal={this.state.principal}
                interestRate={this.state.interestRate}
                calculateInterest={this.calculateInterest}
                balance={this.state.balance}
                 /> */}
                 <PaymentHistory paymentList={this.state.paymentList}/>
            </div>
        )
    }  

}
export default DebtCalcApp