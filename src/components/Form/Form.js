import React from "react";
import "./index.css";
import PropTypes from "prop-types";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      note: "",
      amount: "",
      type: "income"
    };
  }

  insertNote = e => {
    this.setState({ note: e.target.value });
  };

  insertAmount = e => {
    this.setState({ amount: e.target.value || "" });
  };

  insertType = e => {
    this.setState({ type: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { id, note, amount: amt, type } = this.state;
    const amount = parseFloat(amt);
    if (note.length !== 0 && amount.length !== 0 && amount !== 0) {
      this.props.submit(id, note, amount, type);
      this.setState(prevState => ({
        id: prevState.id + 1,
        note: "",
        amount: ""
      }));
    }
  };

  validate = amount => {
    return amount > 0 || !amount ? "" : "*Please insert a positive number";
  };

  render() {
    const { note, amount } = this.state;
    return (
      <form>
        <input
          type="text"
          value={note}
          onChange={this.insertNote}
          placeholder="Enter note"
          required
        />
        <input
          type="text"
          value={amount}
          onChange={this.insertAmount}
          placeholder="Enter amount"
          required
        />
        <select value={this.state.type} onChange={this.insertType}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input type="submit" onClick={this.handleSubmit} value="Add" />
        {this.validate(amount) && <p>{this.validate(amount)}</p>}
      </form>
    );
  }
}

export default Form;

Form.propTypes = {
  submit: PropTypes.func.isRequired
};
