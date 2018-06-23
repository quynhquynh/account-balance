import React from 'react';
import Transaction from './components/Transaction/Transaction'
import Form from './components/Form/Form'

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      incomes: [{id: 0, note: 'Salary', amount: 3500, date: '13/6/2018', time: '9:30', type: 'income'}],
      expenses: [{id: 1, note: 'Transportation', amount: 200, date: '10/6/2018', time: '5:15', type: 'expense'}],
      balance : 3300
    }
  }

  calculateBalance = (amount, type) => {
    let balance = this.state.balance
    return balance = type === 'income' ?  balance + amount : balance - amount
  }

  generateDate = () => {
    const [day, month, year] = [
        new Date().getDate(),
        new Date().getMonth() + 1,
        new Date().getFullYear()
    ]
    const date = `${day}/${month}/${year}`
    return date
  }

  generateTime = () => {
      const timeStr = new Date().toTimeString()
      const spaceIndex = timeStr.indexOf(' ')
      const time = timeStr.substr(0, spaceIndex -3)
      return time
  }


  addTransaction = (id, note, amount, type) => {
    const date = this.generateDate()
    const time = this.generateTime()
    const newNote = {id, note, amount, date, time, type}
    this.setState(prevState => {
      return type === 'income' ? ({incomes: [...prevState.incomes, newNote], balance: this.calculateBalance(amount, type)}) 
                          : ({expenses: [...prevState.expenses, newNote], balance: this.calculateBalance(amount, type)})
    })
  }


  updateNote = (note, edit_note, edit_amount) => {
    const incomes = [...this.state.incomes]
    const expenses = [...this.state.expenses]
    const update = (arr) => {
      const index = arr.findIndex(item => item.id === note.id)
      const prev_amount = arr[index].amount
      arr[index].note = edit_note
      arr[index].amount = edit_amount
      arr[index].date = this.generateDate()
      arr[index].time = this.generateTime()
      this.setState(prevState => ({
          arr,
          balance: note.type === 'income' ? this.calculateBalance(edit_amount, note.type) - prev_amount : this.calculateBalance(edit_amount, note.type) + prev_amount
      }))
    }
    update(note.type === 'income' ? incomes : expenses)
  }


  // handleRemove = (note) => () => this.removeAction(note)

  removeAction = (param) => {
    let incomes = [...this.state.incomes]
    let expenses = [...this.state.expenses]
    this.setState(
      param.type === 'income' ? {incomes: incomes.filter(note => note.id !== param.id)} : {expenses: expenses.filter(note => note.id !== param.id)}
    )
  }

  render() {
    return (
      <div className="App">
        <h1>Account Balance</h1>
        <Form submit={(...note) => this.addTransaction(...note)} />
        <div className='transaction'>
          <div className='income' >
            <p>Income</p>
            {this.state.incomes.map(income => {
              return (
                <Transaction 
                  key={income.id}
                  id={income}
                  note={income.note}
                  amount={income.amount}
                  date={income.date}
                  time={income.time}
                  // onRemove={this.handleRemove(note)}
                  onRemove={this.removeAction}
                  // onEdit={(...edit) => this.updateNote(income, ...edit)} 
                  onEdit={this.updateNote}
                  />
              )
            })}
          </div>

          <div className='expense'>
            <p>Expense</p>
            {this.state.expenses.map(expense => {
              return (
                <Transaction 
                  key={expense.id}
                  id={expense}
                  note={expense.note}
                  amount={expense.amount}
                  date={expense.date}
                  time={expense.time}
                  onRemove={this.removeAction}
                  // onEdit={(...edit) => this.updateNote(expense, ...edit)} 
                  onEdit={this.updateNote}
                  />
              )
            })}
          </div>
        </div>
        <div className='balance'>
            <span>Balance: </span>
            <span>{this.state.balance}$</span>
        </div>
      </div>
    );
  }
}

export default App;
