import React, { Component } from 'react'



class AllFruits extends Component {

  render(){

    const allFruits = this.props.allFruits.map((fruit, i) => {
      return <li key={i}  onClick={this.props.handleEdit}>{fruit.name} <button id={fruit.id} onClick={this.props.deleteFruit}>delete</button></li>
    })
    console.log(this.props, allFruits)
    return (
        <ul>
          {allFruits}
        </ul>
      )
  }


}


export default AllFruits;
