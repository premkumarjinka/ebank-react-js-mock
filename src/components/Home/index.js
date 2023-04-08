import './index.css'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Home = props => {
  console.log('prem in home')
  const {history} = props

  const onLogout = () => {
    console.log('clicked on logout')
    Cookies.remove('jwt_token')

    history.replace('/ebank/login')
  }

  return (
    <div className="home-container">
      <nav className="nav-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      </nav>
      <h1>Your Flexibility, Our Excellence</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
      />
    </div>
  )
}
export default withRouter(Home)
