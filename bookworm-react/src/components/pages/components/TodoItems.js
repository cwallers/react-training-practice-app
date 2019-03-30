import React, { Component } from 'react'

class TodoItems extends Component {
  createTasks = item => {
    return (
      <li key={item.id.toString()} onClick={() => this.props.deleteItem(item.id)}>
        {item.text}
      </li>
    )
  }
  render() {
    const todoEntries = Array.from(this.props.entries)
    const listItems = todoEntries.map(this.createTasks)

    return <ul className="theList">{listItems}</ul>
  }
}

export default TodoItems