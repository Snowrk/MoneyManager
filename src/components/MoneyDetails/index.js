// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {txt, amount, imgUrl, altTxt} = props
  return (
    <li className={`box ${txt.toLowerCase()}`}>
      <img src={imgUrl} alt={altTxt} className="img-sz" />
      <div className="txt">
        <p className="title">Your {txt}</p>
        <p className="amount" data-testid={`${txt.toLowerCase()}Amount`}>
          Rs {amount}
        </p>
      </div>
    </li>
  )
}

export default MoneyDetails
