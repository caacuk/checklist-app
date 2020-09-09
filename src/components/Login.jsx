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
import { login } from "./UserFunctions";

class Login extends Component {
  state = { username: "", password: "", loading: false, message: true };

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
        username: this.state.username,
        password: this.state.password,
      };

      // Call POST request for login
      login(user)
        .then((res) => {
          if (res.statusCode === 2110) {
            this.props.history.push(`/admin`);
          } else {
            this.setState({ loading: false });
            this.setState({ message: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  componentDidMount() {
    localStorage.setItem("activeItem", "login");
  }

  render() {
    return (
      <Segment>
        <Segment basic>
          <Header size="large">Login</Header>
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
              <label>Username</label>
              <Input
                onChange={this.onChange}
                value={this.state.name}
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
              Login
            </Button>
          </Form>
        </Segment>
      </Segment>
    );
  }
}

export default Login;
