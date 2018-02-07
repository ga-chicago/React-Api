import React, { Component }  from 'react';



class CreateFruit extends Component {
  constructor(){
    super()

    this.state = {
      name: '',
      color: '',
      amount: ''
    }
  }
  handleInput = (e) => {

    this.setState({[e.currentTarget.name]: e.currentTarget.value})
  }
  submitForm = (e) => {
    e.preventDefault();
    //
    this.props.createFruit(this.state)
  }
  render(){

    return (
        <form>
          <input name="name" placeholder="name" onChange={this.handleInput}/>
          <input name="color" placeholder="color" onChange={this.handleInput}/>
          <input name="amount" placeholder="amount" onChange={this.handleInput}/>
          <button onClick={this.submitForm}>Add Fruit</button>
        </form>

      )
  }
}

export default CreateFruit;
