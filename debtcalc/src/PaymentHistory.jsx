import React, { Component } from 'react'


export class PaymentHistory extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }

listPayments = () => {
    const items = this.props.paymentList
    const listItems = items.map((item, index) => {
        return <ul key={index} >
                <li><h4>Payment #({index+1})</h4></li>
                <li >Balance: {item.balance}</li>
                <li >Interest: {item.interest}</li>
                <li >Principal: {item.principal}</li>
                <li >Minimum Payment: {item.minPayment}</li>
                <li >Total Payment: {item.totalPayment}</li>
                <li >Principal Paid: {item.principalPaid}</li>



            </ul>
    })
    return <div>{listItems}</div>

}
  render() {
    return (
        
        <div>
            <h4>Payment History</h4>
            {this.listPayments()}
        </div>
    )
  }
}

export default PaymentHistory