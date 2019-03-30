import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Segment } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class TodoForm extends React.Component {
  state = {
    data: {
      text: "",
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data);
      this.setState({ loading: false });
    }
  };

  validate = data => {
    const errors = {};
    if (!data.text) errors.text = "Can't be blank";
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onSubmit} loading={loading}>
			<Form.Field error={!!errors.text}>
			  <input
				type="text"
				id="text"
				name="text"
				placeholder="text"
				value={data.text}
				onChange={this.onChange}
			  />
			  {errors.text && <InlineError text={errors.text} />}
			</Form.Field>
            <Button primary>Save</Button>
        </Form>
      </Segment>
    );
  }
}

TodoForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default TodoForm;
