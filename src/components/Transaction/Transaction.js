import React from 'react'
import './index.css'
import PropTypes from 'prop-types'

class Transaction extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            isEditing: false,
            note: '',
            amount: ''
        }
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     return nextProps.id !== this.props.id
    // }

    componentDidMount(){
        this.setState({
            note: this.props.note,
            amount: this.props.amount
        })
    }

    editAction = () => {
        this.setState(prevState => ({isEditing: !prevState.isEditing}))
    }

    editNote = e => {
        e.target.style.color = e.target.value !== this.props.note ? 'black' : 'blue'
        this.setState({note: e.target.value})
    }

    editAmount = e => {
        this.setState({amount: e.target.value})
    }

    saveEditing = () => {
        const edit_note = this.state.note
        const edit_amount = parseFloat(this.state.amount)
        if(edit_note.length!==0 && edit_amount.length!==0 && edit_amount!== 0){
            const saveNew = () => this.props.onEdit(this.props.id, edit_note, edit_amount)
            saveNew()
            this.setState((prevState) => ({
                isEditing: !prevState.isEditing,
                note: '',
                amount: ''
            }))
        }
    }
    
    

    renderNormal(){
        console.log('render normal')
        const {note, id, amount, date, time} = this.props;
        return(
            <div className='transaction-row'>
                <p>{note}</p>
                <p>{amount}$</p>
                <p>{date}</p>
                <p>{time}</p>
                <p><button onClick={this.editAction}>edit</button></p>
                <p><button onClick={() => this.props.onRemove(id)}>del</button></p>
            </div>
        )
    }

    renderEditing(){
        console.log('render editing')
        const {id} = this.props;
        return(
            <div className='transaction-row'>
                <p><input type='text' value={this.state.note} onChange={this.editNote} style={{color: 'blue'}}  /></p>
                <p className='edit'><input type='text' value={this.state.amount} onChange={this.editAmount} /></p>
                <p className='edit'>{this.props.date}</p>
                <p>{this.props.time}</p>
                <p><button onClick={this.saveEditing}>save</button></p>
                <p><button onClick={() => this.props.onRemove(id)}>del</button></p>
            </div>
                
        )
    }

    render(){
        return this.state.isEditing ? this.renderEditing() : this.renderNormal();
    }

}




export default Transaction

Transaction.propTypes = {
    note: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
}