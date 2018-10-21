import React from "react";
import "./index.css";
import PropTypes from "prop-types";

class Transaction extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      note: "",
      amount: ""
    };
  }

  //   shouldComponentUpdate(nextProps, nextState){
  //       return nextProps.id !== this.props.id
  //   }

  componentDidMount() {
    this.setState({
      note: this.props.note,
      amount: this.props.amount
    });
  }

  editAction = () => {
    this.setState(prevState => ({ isEditing: !prevState.isEditing }));
  };

  editNote = e => {
    e.target.style.color =
      e.target.value !== this.props.note ? "black" : "blue";
    this.setState({ note: e.target.value });
  };

  editAmount = e => {
    this.setState({ amount: e.target.value });
  };

  saveEditing = () => {
    const { onEdit, type, id } = this.props;
    const { note, amount } = this.state;
    const edit_note = note;
    const edit_amount = parseFloat(amount);
    if (
      edit_note.length !== 0 &&
      edit_amount.length !== 0 &&
      edit_amount !== 0
    ) {
      const saveNew = () => onEdit(id, type, edit_note, edit_amount);
      saveNew();
      this.setState(prevState => ({
        isEditing: !prevState.isEditing,
        note: "",
        amount: ""
      }));
    }
  };

  renderNormal() {
    console.log("render normal");
    const { note, id, amount, date, time, type, onRemove } = this.props;
    return (
      <div className="transaction-row">
        <p>{note}</p>
        <p>{amount}$</p>
        <p>{date}</p>
        <p>{time}</p>
        <p>
          <button onClick={this.editAction}>edit</button>
        </p>
        <p>
          <button onClick={() => onRemove(id, type)}>del</button>
        </p>
      </div>
    );
  }

  renderEditing() {
    console.log("render editing");
    const { id, type, date, time, onRemove } = this.props;
    const { note, amount } = this.state;
    return (
      <div className="transaction-row">
        <p>
          <input
            type="text"
            value={note}
            onChange={this.editNote}
            style={{ color: "blue" }}
          />
        </p>
        <p className="edit">
          <input type="text" value={amount} onChange={this.editAmount} />
        </p>
        <p className="edit">{date}</p>
        <p>{time}</p>
        <p>
          <button onClick={this.saveEditing}>save</button>
        </p>
        <p>
          <button onClick={() => onRemove(id, type)}>del</button>
        </p>
      </div>
    );
  }

  render() {
    return this.state.isEditing ? this.renderEditing() : this.renderNormal();
  }
}

export default Transaction;

Transaction.propTypes = {
  note: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired
};
