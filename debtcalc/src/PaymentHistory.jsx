import React, { Component } from 'react'


export class PaymentHistory extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }

listPayments = () => {
    const items = this.props.paymentList
    const listItems = items.map((item) => {
        return <li key={item.toString()}>
            <div>Balance: {item.balance}</div>
            <div>Interest: {item.interest}</div>
            <div>Minimum Payment: {item.minPayment}</div>
            <div>Principal: {item.principal}</div>
                </li>
    })
    return <ul>{listItems}</ul>

}
  render() {
    return (
      
        <div>
            {this.listPayments()}
        </div>
    )
  }
}

export default PaymentHistory