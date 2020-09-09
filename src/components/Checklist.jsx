import React, { Component } from "react";
import {
  Table,
  Button,
  Segment,
  Header,
  Dimmer,
  Loader,
  Form,
  Input,
} from "semantic-ui-react";

// API request function
import { getChecklist } from "./ChecklistFunctions";
import { deleteChecklist } from "./ChecklistFunctions";
import { postChecklist } from "./ChecklistFunctions";
import { postItem } from "./ItemFunctions";

class Checklist extends Component {
  state = {
    checklists: [],
    name: "",
    checklistId: 0,
    itemName: "",
    loading: true,
    loadingButton: false,
  };

  // Call GET request checklists
  getChecklistData() {
    getChecklist().then((res) => {
      this.setState({ checklists: res });
      this.setState({ loading: false });
    });
  }

  componentDidMount() {
    this.getChecklistData();
  }

  // Button delete clicked
  handleDeleteComodity = (d) => {
    this.setState({ loadingButton: true });

    // Commodity data
    const deleteChecklistData = {
      id: d.id,
    };

    // Call POST request for delete commodity
    deleteChecklist(deleteChecklistData).then((res) => {
      this.getChecklistData();
      this.setState({ loadingButton: false });
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePostChecklist = (e) => {
    // Check input
    if (this.state.name !== "") {
      const checklistData = {
        name: this.state.name,
      };

      // Call POST request for login
      postChecklist(checklistData)
        .then((res) => {
          this.getChecklistData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handlePostItem = (e) => {
    // Check input
    if (this.state.checklistId !== "") {
      const itemData = {
        checklistId: this.state.checklistId,
        itemName: this.state.itemName,
      };

      // Call POST request for login
      postItem(itemData)
        .then((res) => {
          this.getChecklistData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <Segment>
        <Segment basic>
          <Header size="large">Admin</Header>
        </Segment>
        <Segment>
          {/* Loading */}
          <Dimmer active={this.state.loading} inverted>
            <Loader>Loading</Loader>
          </Dimmer>

          {/* Table of checklists */}
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width="5">id</Table.HeaderCell>
                <Table.HeaderCell width="5">name</Table.HeaderCell>
                <Table.HeaderCell width="5">items</Table.HeaderCell>
                <Table.HeaderCell width="5">
                  checklistCompletionStatus
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.checklists
                ? this.state.checklists.map((d, i) => (
                    <Table.Row key={`${d.id}-${i}`}>
                      {/* Name */}
                      <Table.Cell>{d.id}</Table.Cell>

                      {/* Price */}
                      <Table.Cell>{d.name}</Table.Cell>
                      <Table.Cell>
                        {d.items
                          ? d.items.map((dd, ii) => (
                              <p key={dd.id}>{dd.name}</p>
                            ))
                          : "loading"}
                      </Table.Cell>

                      {/* Status */}
                      <Table.Cell>
                        <Button
                          icon="checkmark"
                          positive={d.checklistCompletionStatus === 1}
                          loading={this.state.loadingButton}
                          key={d.id}
                        ></Button>
                      </Table.Cell>

                      {/* Delete Button */}
                      <Table.Cell>
                        <Button
                          icon="close"
                          negative
                          key={d.id}
                          onClick={() => this.handleDeleteComodity(d)}
                        ></Button>
                      </Table.Cell>
                    </Table.Row>
                  ))
                : "loading"}
            </Table.Body>
          </Table>
        </Segment>

        <Segment>
          {/* Checklist input */}
          <Form>
            <Form.Field>
              <label>Name</label>
              <Input
                onChange={this.onChange}
                value={this.state.name}
                placeholder="Name"
                name="name"
                type="text"
                fluid
                required
              />
            </Form.Field>
            <Button type="submit" onClick={this.handlePostChecklist}>
              Input Checklist
            </Button>
          </Form>
        </Segment>

        <Segment>
          {/* Checklist input */}
          <Form>
            <Form.Field>
              <label>checklistId</label>
              <Input
                onChange={this.onChange}
                value={this.state.checklistId}
                placeholder="checklistId"
                name="checklistId"
                type="text"
                fluid
                required
              />
            </Form.Field>
            <Form.Field>
              <label>itemName</label>
              <Input
                onChange={this.onChange}
                value={this.state.itemName}
                placeholder="itemName"
                name="itemName"
                type="text"
                fluid
                required
              />
            </Form.Field>
            <Button type="submit" onClick={this.handlePostItem}>
              Input Item
            </Button>
          </Form>
        </Segment>
      </Segment>
    );
  }
}

export default Checklist;
