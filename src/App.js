import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import request from 'superagent';
import AllFruits from './AllFruits';
import CreateFruit from './CreateFruit'
import Edit from './Edit'

class App extends Component {
  constructor(){
    super();

    this.state = {
      allFruits: [],
      editedFruit: ''
    }
  }
  componentDidMount() {

    request
      .get('http://localhost:9292/fruits')
      .end((err, res) => {
          console.log(err, res)
          const parsedFruits = JSON.parse(res.text);

          this.setState({allFruits: [...parsedFruits]})

          // JSON.parse to get your object out of res.text
      })

  }
  createFruit = (formData) => {
    // Where we will make the post request for the new fruit
    console.log(formData, ' formData')
    // superAgent post request
    request
      .post('http://localhost:9292/fruits')
      .send(formData)
      .set('accept', 'json')
      .end((err, createFruit) => {
        console.log(createFruit, ' this should be our response from our post route')
        const parsedFruit = JSON.parse(createFruit.text)

        this.setState({allFruits: [parsedFruit, ...this.state.allFruits ]});
      })

  }
  deleteFruit = (e) => {

    console.log(e.currentTarget.id, ' id of fruit')
    const id = e.currentTarget.id
    console.log(id, ' id')
    request
      .delete('http://localhost:9292/fruits/' + id)
      .end((err, deletedFruit) => {
        console.log(deletedFruit)
        if(deletedFruit){
          const filterArray =  this.state.allFruits.filter(fruit => fruit.id != id  )
          this.setState({allFruits: filterArray})
        }
      })
  }
  handleEdit = (e) => {
    console.log(e.currentTarget.children[0].id)
    const id = e.currentTarget.children[0].id



    const fruitToEdit = this.state.allFruits.forEach((fruit) => {

      if(fruit.id === parseInt(id)){

        this.setState({editedFruit: fruit})
        return;
      }
    })



  }
  editCall = (editedFruit) => {
    console.log(editedFruit)
    request
      .put('http://localhost:9292/fruits/' + editedFruit.id)
      .send(editedFruit)
      .end((err, fruit) => {
        console.log(fruit)
        const parsedFruit = JSON.parse(fruit.text)

        this.state.allFruits.forEach((fruit, i) => {
          if(fruit.id === parsedFruit.id){
          const state = this.state;
          state.allFruits.splice(i, 1, parsedFruit)
          this.setState(state)


          }
        })

      })
  }
  render() {


    return (
      <div className="App">
        <AllFruits allFruits={this.state.allFruits} deleteFruit={this.deleteFruit} handleEdit={this.handleEdit}/>
        <CreateFruit createFruit={this.createFruit}/>
        {this.state.editedFruit != '' ? <Edit editedFruit={this.state.editedFruit} editCall={this.editCall}/> : null}
      </div>
    );
  }
}

export default App;
