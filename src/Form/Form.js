import React, { Component } from 'react';
import axios from 'axios';

export default class Form extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      vendor: '',
      date: '2020-02-02',
      amount: '',
      currency: '',
      tax_rate: '',
      tax_amount: '',
      category: '',
      paid_with: '',
      country: '',
      cost_center: '',  
      comments: '',
      selectedFile: null,
      fileLoaded: 0    
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChangeFileHandler = this.onChangeFileHandler.bind(this);
  }

  handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.name;
    
    this.setState({
      [stateField]: inputValue,
    });
    
    console.log(this.state);
  }

  onChangeFileHandler(event) {
    console.log(event.target.files[0])

    this.setState({
      selectedFile: event.target.files[0],
      fileLoaded: 0
    });
    
  }



  async handleSubmit(event) {
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    
    console.log(event);
    event.preventDefault();
    const { vendor, date, amount } = this.state;
    
    const data = new FormData();
    data.append('file', this.state.selectedFile);

    const obj = {
      date: date
    }
    data.append('date', JSON.stringify(obj));  
  
    console.log("file: " + JSON.stringify(this.state.selectedFile));

    const base = await toBase64(this.state.selectedFile)
    const base_encode = base.substring(base.indexOf(",")+1)

    console.log("base: " + base_encode)
    const data2 = {
      username: "react",
      vendor: vendor,
      date: date,
      amount: amount,
      file: base_encode
    }

    console.log("data: " + JSON.stringify(data));

    const config = {
      headers: { 
        'content-type': 'multipart/form-data' 
      }
    };

    /*
    await fetch('https://icxnpxnk6h.execute-api.eu-central-1.amazonaws.com/DEV/', {
      method: 'POST',
      body: data2,     
     })
      .then(response => response.json())
      .then(data => console.log(data));
*/
    
    await axios.post('https://icxnpxnk6h.execute-api.eu-central-1.amazonaws.com/DEV', data2)
    .then(res => {
      console.log(res.statusText)
    })
    .catch(err => {
      console.log(err.response);
    });

    
  }
  



  render() {
    const style = {
      border: '1px solid blue',
      textAlign: 'center',
      verticalAlign: 'middle'
    }

    return (
      <div style={style}>
        <form onSubmit={this.handleSubmit} >
          <label>vendor:</label>
          <input
            type="text"
            name="vendor"
            onChange={this.handleChange}
            value={this.state.vendor}
          /><br/>

          <label>date:</label>
          <input
            type="text"
            name="date"
            onChange={this.handleChange}
            value={this.state.date}
          /><br/>

          <label>amount:</label>
          <input
            type="text"
            name="amount"
            onChange={this.handleChange}
            value={this.state.amount}
          /><br/>

          <label>currency:</label>
          <input
            type="text"
            name="currency"
            onChange={this.handleChange}
            value={this.state.currency}
          /><br/>
          
          <label>tax_rate:</label>
          <input
            type="text"
            name="tax_rate"
            onChange={this.handleChange}
            value={this.state.tax_rate}
          /><br/>                      

          <label>tax_amount:</label>
          <input
            type="text"
            name="tax_amount"
            onChange={this.handleChange}
            value={this.state.tax_amount}
          /><br/>  

          <label>category:</label>
          <input
            type="text"
            name="category"
            onChange={this.handleChange}
            value={this.state.category}
          /><br/>  

          <label>paid_with:</label>
          <input
            type="text"
            name="paid_with"
            onChange={this.handleChange}
            value={this.state.paid_with}
          /><br/>  

          <label>country:</label>
          <input
            type="text"
            name="country"
            onChange={this.handleChange}
            value={this.state.country}
          /><br/>  

          <label>cost_center:</label>
          <input
            type="text"
            name="cost_center"
            onChange={this.handleChange}
            value={this.state.cost_center}
          /><br/> 

          <label>comments:</label>
          <input
            type="text"
            name="comments"
            onChange={this.handleChange}
            value={this.state.comments}
          /><br/>  

          <input 
            type="file" 
            name="file"
            onChange={this.onChangeFileHandler}

          /><br/> 
           


          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}