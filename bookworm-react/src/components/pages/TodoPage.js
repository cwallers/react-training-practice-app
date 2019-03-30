import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { allTodoSelector } from "../../reducers/todo";
import { fetchTodo, createTodo, deleteTodo } from "../../actions/todo";
import TodoForm from "../forms/TodoForm";
import TodoItems from "./components/TodoItems"

class TodoPage extends React.Component {
  state = {
    todoList: []
  };
  
  deleteItem = id => {
    const filteredItems = this.state.todoList.filter(item => {
	  if(item.id !== id){
		this.props.deleteTodo(item)
	  }
      return item.id !== id
    })
    this.setState({
      todoList: filteredItems,
    })
  }
  
  addItem = e => {
    const newItem = {text: e.text, complete: false, id: this.generateID(),  userEmail: this.props.userEmail }
    if (newItem.text !== '') {
	  this.props.createTodo(newItem).then( res => { 
		  const todoList = [...this.state.todoList, Object.values(res.data.entities.todo)[0]]
		  this.setState({ todoList })
	  })
    }
  }
  
  generateID = () => {
	var ts = (+new Date()).toString();
	var parts = ts.split( "" ).reverse();
	var id = "";

	for( var i = 0; i < 8; ++i ) {
		var index = Math.floor( Math.random() * ( (parts.length - 1) - 0 + 1 ) ) + 0;
		id += parts[index];	 
	}

	return id;
  }
  
  componentDidMount = () => this.onInit(this.props);

  onInit = props => props.fetchTodo(this.props.userEmail).then(res => this.setState({ todoList: res.data.entities }));

  render() {
    return (
      <div>
		<TodoForm submit={this.addItem} />
		<TodoItems entries={this.state.todoList} deleteItem={this.deleteItem} />
      </div>
    );
  }
}

TodoPage.propTypes = {
  userEmail: PropTypes.string.isRequired,
  fetchTodo: PropTypes.func.isRequired,
  createTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  /*todo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired*/
};

function mapStateToProps(state) {
  return {
	userEmail: state.user.email,
    todo: allTodoSelector(state)
  };
}

export default connect(mapStateToProps, { fetchTodo, createTodo, deleteTodo })(TodoPage);
