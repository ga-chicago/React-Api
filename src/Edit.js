import React, {Component} from 'react';


class Edit extends Component {
    constructor(props){
    super(props)

    this.state = {
      id: this.props.editedFruit.id,
      name: this.props.editedFruit.name,
      color: this.props.editedFruit.color,
      amount: this.props.editedFruit.amount
    }
  }
  handleInput = (e) => {

    this.setState({[e.currentTarget.name]: e.currentTarget.value})
  }
  submitForm = (e) => {
    e.preventDefault();
    this.props.editCall(this.state)
  }
  render(){
    return (
         <form>
          <input name="name" value={this.state.name} onChange={this.handleInput}/>
          <input name="color" value={this.state.color}  onChange={this.handleInput}/>
          <input name="amount" value={this.state.amount}  onChange={this.handleInput}/>
          <button onClick={this.submitForm}>Add Fruit</button>
        </form>

      )
  }
}


export default Edit;
