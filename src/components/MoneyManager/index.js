import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {income: 0, expenses: 0, historyList: []}

  sub = event => {
    event.preventDefault()
    const titleVal = document.getElementById('title').value
    const amountVal = parseInt(document.getElementById('amount').value)
    const typeVal = document.getElementById('type').value
    const obj = {id: v4(), title: titleVal, amount: amountVal, type: typeVal}

    this.setState(prevState =>
      typeVal === 'INCOME'
        ? {
            income: prevState.income + amountVal,
            expenses: prevState.expenses,
            historyList: [...prevState.historyList, obj],
          }
        : {
            income: prevState.income,
            expenses: prevState.expenses + amountVal,
            historyList: [...prevState.historyList, obj],
          },
    )

    document.getElementById('title').value = ''
    document.getElementById('amount').value = ''
    document.getElementById('type').value = 'INCOME'
  }

  onDel = id => {
    this.setState(prevState => {
      const idx = prevState.historyList.findIndex(item => item.id === id)
      const typeVal = prevState.historyList[idx].type
      const amountVal = parseInt(prevState.historyList[idx].amount)
      const newList = [
        ...prevState.historyList.slice(0, idx),
        ...prevState.historyList.slice(idx + 1),
      ]
      const obj =
        typeVal === 'INCOME'
          ? {
              income: prevState.income - amountVal,
              expenses: prevState.expenses,
              historyList: newList,
            }
          : {
              income: prevState.income,
              expenses: prevState.expenses - amountVal,
              historyList: newList,
            }
      return obj
    })
  }

  render() {
    const {income, expenses, historyList} = this.state
    const balance = income - expenses
    return (
      <div className="bg">
        <div className="header">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <ul className="md-con">
          <MoneyDetails
            txt="Balance"
            key="BALANCE"
            amount={balance}
            imgUrl="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            altTxt="balance"
          />
          {transactionTypeOptions.map((item, idx) => (
            <MoneyDetails
              txt={item.displayText}
              key={item.optionId}
              amount={Object.values(this.state)[idx]}
              imgUrl={item.imgUrl}
              altTxt={item.displayText.toLowerCase()}
            />
          ))}
        </ul>
        <div className="footer">
          <div className="transactions">
            <h1>Add Transaction</h1>
            <form onSubmit={this.sub}>
              <label htmlFor="title">
                <p className="title-label">TITLE</p>
              </label>
              <input id="title" placeholder="TITLE" type="text" />
              <label htmlFor="amount">
                <p className="amount-label">AMOUNT</p>
              </label>
              <input id="amount" placeholder="AMOUNT" type="text" />
              <label htmlFor="type">
                <p className="type-label">TYPE</p>
              </label>
              <select id="type">
                <option value="INCOME">Income</option>
                <option value="EXPENSES">Expenses</option>
              </select>
              <br />
              <button className="btn" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="history">
            <h1>History</h1>
            <div className="hty-head">
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
            </div>
            <ul className="hty-con">
              {historyList.map(item => (
                <TransactionItem
                  itemDetails={item}
                  key={item.id}
                  onDel={this.onDel}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
