import React from 'react'
import MaskedInput from 'react-maskedinput'

export default function MarkedInputTest() {
    const [state,setState] = React.useState({
            card: '',
            expiry: '',
            ccv: ''
        });

 

  const onChange = (e) => {
    setState({[e.target.name]: e.target.value})
  }

  
    return (<div className="CreditCardDetails">
      <label>
        Card Number:{' '}
        <MaskedInput mask="1111 1111 1111 1111" name="card" size="20" onChange={onChange}/>
      </label>
      <label>
        Expiry Date:{' '}
        <MaskedInput mask="11/1111" name="expiry" placeholder="mm/yyyy" onChange={onChange}/>
      </label>
      <label>
        CCV:{' '}
        <MaskedInput mask="111" name="ccv" onChange={onChange}/>
      </label>
    </div>)
  
}