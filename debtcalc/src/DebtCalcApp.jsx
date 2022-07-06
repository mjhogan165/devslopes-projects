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
            paymentList: [],
            totalPaymentInput: "",
            totalPayment: 0,
        }
        
    }

    stringToNum = (str) => {
        // if(typeof str === "string"){
        //     return Number(parseFloat(str).toFixed(2))
        // }
        //     else{return str}
        return Number(parseFloat(str).toFixed(2))
    }

    calculateInterest = (debt, interest) => {

        return Number((((interest*10**-2)/12) * debt).toFixed(2));
    }
    calcultePrincipal(debt){
        return this.stringToNum((debt * .01))
    }
    calculateminPayment = (debt, interest) => {
        let interestCalc = this.calculateInterest(debt, interest);
        const principal = debt * .01;
        const sum = interestCalc + principal
        // console.log(debt)
        // console.log(interest)
        // console.log(principal)
        // console.log(sum)
        // console.log(this.stringToNum(sum))

        return this.stringToNum(sum);
    }
    calculatePrincipalPaid = (payment, interest) =>{
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

    handleTotalPayChange = (event) => this.setState({totalPaymentInput: event.target.value})
    
    handleDebtSubmit = (event) => {
        const {debtInput, intInput, totalPaymentInput} = this.state
        event.preventDefault();
        this.setState({
            debt: this.stringToNum(debtInput),
            interestRate: this.stringToNum(intInput),
            totalPayment: this.stringToNum(totalPaymentInput),
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


    handleTotalPayment = (event) => {
        const {totalPaymentInput} = this.state
        event.preventDefault();
    this.setState({
        totalPayment: this.stringToNum(totalPaymentInput)
    },() => {
        this.afterSetStatePay(); // updates that need debt and interestRate to complete before executing
    });
    }
    afterSetStatePay = () => { 
        const {totalPayment, balance, interestRate, interest} = this.state
        const principalPaid = totalPayment - interest;
        this.setState((prev) => ({
            balance: ((prev.balance) - (principalPaid)).toFixed(2),
            principalPaid: this.calculatePrincipalPaid(totalPayment, interest)
        }))
        const newPayment = {
           
            interest: this.calculateInterest(balance, interestRate),
            minPayment:this.calculateminPayment(balance, interestRate),
            principal:this.calcultePrincipal(balance),
            principalPaid: this.calculatePrincipalPaid(totalPayment, interest),
            balance: balance,
            totalPayment:totalPayment,
        }
        this.state.paymentList.push(newPayment)
      }


    handleMinPayment = () => {
        const { balance, interestRate, principal, totalPayment, interest } = this.state;
        const minPay = this.calculateminPayment(balance, interestRate)
        const localPrincipal = this.calcultePrincipal(balance)
        

        this.setState((prev) => ({
            balance: this.stringToNum((prev.balance) - (principal)),
        }))
        const newPayment = {
            interest: this.calculateInterest(balance, interestRate),
            minPayment: minPay,
            principal: localPrincipal,
            principalPaid: localPrincipal,
            balance: balance,
            totalPayment: minPay ,
        }
        this.state.paymentList.push(newPayment)

    };

    componentDidUpdate(prevProps, prevState, snapShot){
        const { balance, interestRate } = this.state;
        //when balance prop updates, interest is calculated with new balance
        if(this.state.balance !== prevState.balance){
            this.setState((prev) => ({
                interest: this.calculateInterest(balance, interestRate),
                principal: this.calcultePrincipal(balance),
                minPayment: this.calculateminPayment(balance, interestRate)
            }))
        }
    }  ; 
    
    render(){
        return(
            <div className="form-wrapper">
                <h1>Debt Calculator</h1>
                <form className="User-debt-input" onSubmit={this.handleDebtSubmit}>
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
                        <br />

                    <input type="submit" onClick={this.handleDebtSubmit} value="Submit" />
                </form>
                <br />
                <div className="payment-info-wrapper">
                    <div className="Make-payment-wrapper">
                        <h3>Payment</h3>
                        <form action="Make-payment-input">
                            <label>Enter Amount: </label>
                                <input 
                                    type="number"
                                    onChange={this.handleTotalPayChange}
                                    value={this.state.totalPaymentInput}/>
                                    <input type="submit" onClick={this.handleTotalPayment} value="Make Payment" />

                        </form>                        
                        <br />
                        <label>Or</label>
                        <br />
                        <button onClick={this.handleMinPayment}>Make Minimum Payment</button>
                    </div>
                    <div className="next-payment-wrapper">
                        <h3>Next Payment</h3>
                        <div className="next-payment-child">
                            Balance: {this.state.balance}
                        </div>
                        <div className="next-payment-child">
                            Interest: {this.state.interest}
                        </div>

                        <div className="next-payment-child">
                            Principal: {this.state.principal}
                        </div>
                        <div className="next-payment-child">
                            Minimum Payment:  {this.state.minPayment}
                        </div>
                    </div>
                    
                </div>

                 <PaymentHistory paymentList={this.state.paymentList}/>
            </div>
        )
    }  

}
export default DebtCalcApp