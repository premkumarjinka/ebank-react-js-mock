import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {userId: '', password: '', showErr: false, errMsg: ''}

  onInputChange = event => {
    this.setState({userId: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({showErr: true, errMsg: errorMsg})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {userId, password} = this.state
    const details = {user_id: userId, pin: password}
    console.log(details)
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {userId, password, showErr, errMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <div className="container">
          <div className="img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <form className="input-container" onSubmit={this.onFormSubmit}>
            <h1>Welcome Back</h1>
            <label htmlFor="userId">User Id</label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={this.onInputChange}
            />
            <label htmlFor="password">PIN</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={this.onPasswordChange}
            />
            <button type="submit">Login</button>
            {showErr && <p>{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
