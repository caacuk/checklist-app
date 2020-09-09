import React, { Component } from "react";
import {
  Input,
  Form,
  Button,
  Segment,
  Header,
  Dimmer,
  Loader,
  Message,
} from "semantic-ui-react";

// POST request function
import { register } from "../functions/UserFunctions";

class Register extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    loading: false,
    message: true,
  };

  // Set state when input change
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Button submit
  onSubmit = (e) => {
    this.setState({ loading: true });
    this.setState({ message: true });
    // Check input
    if (this.state.name !== "") {
      const user = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      };

      // Call POST request for login
      register(user)
        .then((res) => {
          if (res !== "error") {
            // Redirect to admin or login page
            localStorage.setItem("activeItem", "login");
            this.props.history.push(`/login`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  componentDidMount() {
    localStorage.setItem("activeItem", "register");
  }

  render() {
    return (
      <Segment>
        <Segment basic>
          <Header size="large">Register</Header>
        </Segment>

        <Segment>
          {/* Error message */}
          <Message
            negative
            header="Error"
            content="Invalid password or username"
            hidden={this.state.message}
          />

          {/* Loading */}
          <Dimmer active={this.state.loading} inverted>
            <Loader>Loading</Loader>
          </Dimmer>

          {/* Form login */}
          <Form>
            <Form.Field>
              <label>Email</label>
              <Input
                onChange={this.onChange}
                value={this.state.email}
                placeholder="email"
                name="email"
                type="text"
                fluid
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Username</label>
              <Input
                onChange={this.onChange}
                value={this.state.username}
                placeholder="Username"
                name="username"
                type="text"
                fluid
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input
                onChange={this.onChange}
                value={this.state.password}
                placeholder="Password"
                name="password"
                type="password"
                fluid
                required
              />
            </Form.Field>
            <Button type="submit" onClick={this.onSubmit}>
              Register
            </Button>
          </Form>
        </Segment>
      </Segment>
    );
  }
}

export default Register;
