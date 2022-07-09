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

    handleTotalPayChange = (event) => this.setState({totalPaymentInput: event.target.value})
    
    handleDebtSubmit = (event) => {
        const {debtInput, intInput, totalPaymentInput, interestRate} = this.state
        event.preventDefault();
        //error check
        if(isNaN(interestRate)){
            this.setState({
                interestRate: 0
            })
            console.log('fire')
        }
        else{
            this.setState({
                debt: this.stringToNum(debtInput),
                interestRate: this.stringToNum(intInput),
                totalPayment: this.stringToNum(totalPaymentInput),
            },() => {
                this.afterSetState(); // updates that need debt and interestRate to complete before executing
            });

        }
       
    } 
    afterSetState = () => { 
        const {interestRate, debt} = this.state
        this.setState({
            interest: this.calculateInterest(debt, interestRate),
            principal: this.calcultePrincipal(debt),
            minPayment: this.calculateMinPayment(debt, interestRate),
            balance: debt
            
        })

    }


    handleTotalPayment = (event) => {
        const {debt, interest} = this.state
        const totalPayment = this.stringToNum(this.state.totalPaymentInput)

        event.preventDefault();
        //error checks
        if(totalPayment < this.state.minPayment){
            alert('Does not meet minimum payment requirements')
        }
        else if(isNaN(debt)){
            alert('Please enter debt amount')
        }
        else if(isNaN(interest)){
            alert('Please enter interest amount')
        }
        else
        {
            this.setState({
                totalPayment: totalPayment
            },() => {
                this.afterSetStatePay(); // updates that need debt and interestRate to complete before executing
            });
        }
    }
    afterSetStatePay = () => { 
        const {totalPayment, balance, interestRate, interest} = this.state


            const principalPaid = totalPayment - interest;
            this.setState((prev) => ({
                balance: this.stringToNum(((prev.balance) - (principalPaid))),
                principalPaid: this.calculatePrincipalPaid(totalPayment, interest)
            }))
            const newPayment = {
                interest: this.calculateInterest(balance, interestRate),
                minPayment:this.calculateMinPayment(balance, interestRate),
                principal:this.calcultePrincipal(balance),
                principalPaid: this.calculatePrincipalPaid(totalPayment, interest),
                balance: balance,
                totalPayment:totalPayment,
            }
            this.state.paymentList.push(newPayment)

        

      }


    handleMinPayment = (e) => {
        e.preventDefault();
        const { balance, interestRate, principal,} = this.state;
        const minPay = this.calculateMinPayment(balance, interestRate)
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
            totalPayment: minPay,
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
                minPayment: this.calculateMinPayment(balance, interestRate)
            }))
            if(balance <= 100){
                const p = balance * .01
                this.setState((prev)=> ({
                    minPayment: balance + p
                }))

            }

        } 
    }  ; 
    
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
                            <input className="btn"  type="submit" onClick={this.handleDebtSubmit} value="Submit" />
                    </div>
                </form>
                <br />
                <div className="payment-info-wrapper">
                    <div className="make-payment-wrapper">
                        <h2>Payment</h2>
                        <form action="make-payment-input">
                            <div>
                                <label>Enter Amount: </label>
                                <br />
                                <input
                                    className="base-input-field" 
                                    type="text"
                                    onChange={this.handleTotalPayChange}
                                    value={this.state.totalPaymentInput}/>
                                    <br />
                            </div>
                            <div>
                                <input className="btn" type="submit" onClick={this.handleTotalPayment} value="Make Payment" />
                            </div>
                            <div>
                                <h3>Or</h3>
                            </div>
                            <div>
                                <button  className="btn" onClick={this.handleMinPayment}>Make Minimum Payment</button>
                            </div>
                        </form>                        
                    </div>
                    <div className="next-payment-wrapper">
                        <h2>Next Payment</h2>
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