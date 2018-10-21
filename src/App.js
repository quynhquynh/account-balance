import React from "react";
import { generateDate, generateTime } from "./utils";
import Transaction from "./components/Transaction/Transaction";
import Form from "./components/Form/Form";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incomes: [],
      expenses: [],
      balance: 0
    };
  }

  calculateBalance = (amount, type) => {
    let balance = this.state.balance;
    return (balance = type === "income" ? balance + amount : balance - amount);
  };

  addTransaction = (id, note, amount, type) => {
    const date = generateDate();
    const time = generateTime();
    const newNote = { id, note, amount, date, time, type };
    this.setState(prevState => {
      return type === "income"
        ? {
            incomes: [...prevState.incomes, newNote],
            balance: this.calculateBalance(amount, type)
          }
        : {
            expenses: [...prevState.expenses, newNote],
            balance: this.calculateBalance(amount, type)
          };
    });
  };

  updateNote = (id, type, edit_note, edit_amount) => {
    const incomes = [...this.state.incomes];
    const expenses = [...this.state.expenses];
    const update = arr => {
      const index = arr.findIndex(item => item.id === id);
      const prev_amount = arr[index].amount;
      arr[index].note = edit_note;
      arr[index].amount = edit_amount;
      arr[index].date = generateDate();
      arr[index].time = generateTime();
      this.setState(prevState => ({
        arr,
        balance:
          type === "income"
            ? this.calculateBalance(edit_amount, type) - prev_amount
            : this.calculateBalance(edit_amount, type) + prev_amount
      }));
    };
    update(type === "income" ? incomes : expenses);
  };

  removeAction = (id, type) => {
    let incomes = [...this.state.incomes];
    let expenses = [...this.state.expenses];
    this.setState(
      type === "income"
        ? { incomes: incomes.filter(trans => trans.id !== id) }
        : { expenses: expenses.filter(trans => trans.id !== id) }
    );
  };

  render() {
    const { incomes, expenses, balance } = this.state;
    return (
      <div className="App">
        <h1>Account Balance</h1>
        <Form submit={(...note) => this.addTransaction(...note)} />
        <div className="transaction">
          <div className="income">
            <p>Income</p>
            {incomes.map(income => {
              return (
                <Transaction
                  key={income.id}
                  onRemove={this.removeAction}
                  onEdit={this.updateNote}
                  {...income}
                />
              );
            })}
          </div>

          <div className="expense">
            <p>Expense</p>
            {expenses.map(expense => {
              return (
                <Transaction
                  key={expense.id}
                  onRemove={this.removeAction}
                  onEdit={this.updateNote}
                  {...expense}
                />
              );
            })}
          </div>
        </div>
        <div className="balance">
          <span>Balance: </span>
          <span>{balance}$</span>
        </div>
      </div>
    );
  }
}

export default App;
