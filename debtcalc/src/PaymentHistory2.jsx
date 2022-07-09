import React, { Component } from 'react'


export class PaymentHistory2 extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }

listPayments = () => {
    const items = this.props.paymentList;

  const listItems = items.map((item, index) => {
    return <table key={index}>
      <thead>
        <tr className='headers-row'>
          <th>Payment #</th>
          <th>Balance</th>
          <th>Interest</th>
          <th>Principal</th>
          <th>Min. Payment</th>
          <th>Principal Paid</th>
          <th>Total Paid</th>
        </tr>
      </thead>
      <tbody>
      <tr>
          <th>{index+1}</th>
          <th>{item.balance}</th>
          <th>{item.interest}</th>
          <th>{item.principal}</th>
          <th>{item.minPayment}</th>
          <th>{item.principalPaid}</th>
          <th>{item.totalPayment}</th>
        </tr>

      </tbody>
    </table>
  })
    return <div>{listItems}</div>

}
  render() {
    return (
        
        <div className='payment-hist-wrapper'>
            <h4>Payment History</h4>
            {this.listPayments()}
        </div>
    )
  }
}

export default PaymentHistory2