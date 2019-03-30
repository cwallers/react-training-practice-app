import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allBooksSelector } from "../../reducers/books";
import AddBookCta from "../ctas/AddBookCta.js";
import { fetchBooks } from "../../actions/books";
import { confirmEmail } from "../../actions/users";

class DashboardPage extends React.Component {
  componentDidMount = () => this.onInit(this.props);
  
  sendConfirmationEmail = () =>
    this.props.confirmEmail(this.props.userEmail);

  onInit = props => props.fetchBooks();

  render() {
    const { isConfirmed, books } = this.props;
    return (
      <div>
        {!isConfirmed && <div onClick={this.sendConfirmationEmail}><ConfirmEmailMessage /></div>}

        {books.length === 0 ? <AddBookCta /> : <p>You have books!</p>}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  userEmail: PropTypes.string.isRequired,
  confirmEmail: PropTypes.func.isRequired,
  fetchBooks: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
	userEmail: state.user.email,
    books: allBooksSelector(state)
  };
}

export default connect(mapStateToProps, { fetchBooks, confirmEmail })(DashboardPage);
