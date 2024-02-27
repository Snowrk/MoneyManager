// Write your code here
import './index.css'

const TransactionItem = props => {
  const {itemDetails, onDel} = props
  const {title, amount, type, id} = itemDetails
  return (
    <li className="btx">
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{type}</p>
      <button className="delBtn" data-testid="delete" onClick={() => onDel(id)}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
