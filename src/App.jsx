import { useState } from 'react'
import './index.css'

function App() {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    account: ''
  })

  const [error, setError] = useState({
    username: '',
    phone: '',
    account: ''
  })

  //實時檢查
  const getErrorMessage = (name, value) => {
    const val = value.trim(); // 去除空白

    switch (name) {
      case 'username':
        if (!val) return 'Please enter your name'; // true
        return ''; // false

      case 'phone':
        if (!val) return 'Please enter your phone number';
        if (isNaN(val)) return 'Phone number must be numeric';
        if (val.length < 8) return 'Phone number must be at least 8 digits';
        return '';

      case 'account':
        if (!val) return 'Please enter your Dulux account';
        return '';

      default:
        return '';
    }
  }

  const handleChange = (event) => {
    const { id, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value
    }))

    // 在輸入的時候就檢查
    const errorMsg = getErrorMessage(id, value);

    // 如果有錯，errorMsg 就是字串 -> 顯示紅字
    // 如果沒錯，errorMsg 就是空字串 -> 紅字消失
    setError((prev) => ({
      ...prev,
      [id]: errorMsg
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // for 一些人直接就點submit了，所以在檢查一次
    const usernameError = getErrorMessage('username', formData.username);
    const phoneError = getErrorMessage('phone', formData.phone);
    const accountError = getErrorMessage('account', formData.account);

    // “” 這個會當false的
    if (usernameError || phoneError || accountError) {
      setError({
        username: usernameError,
        phone: phoneError,
        account: accountError
      });
      return; // 停止發送
    }

    // 用的假的api，無論什麼都是ok
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert("Sign up successful !")
        // 清空表單
        setFormData({ username: '', phone: '', account: '' });
        setError({ username: '', phone: '', account: '' });
      } else {
        alert("Failed to submit.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Network error.")
    }
  };

  return (
    <div className="app-wrapper">
      <div className="container">
        <div className="left-session">
          <h1><span>Welcome to Paint Quote System</span></h1>
          <p>Consequat adipiscing ea do labore irure adipiscing<br />occaecat cupidatat excepteur duis mollit est.</p>
        </div>

        <div className="right-session">
          <div className="card">
            <h2>Sign Up</h2>
            <p className="subtitle">Enter details to create your account</p>

            <form id="signupform" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="username">Your Name</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your name"
                  value={formData.username}
                  onChange={handleChange}
                  style={{ borderColor: error.username ? 'red' : '#e0e0e0' }}
                />
                {error.username && <span className="error-message">{error.username}</span>}
              </div>

              <div className='input-group'>
                <label htmlFor="phone">Phone number</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ borderColor: error.phone ? 'red' : '#e0e0e0' }}
                />
                {error.phone && <span className="error-message">{error.phone}</span>}
              </div>

              <div className='input-group'>
                <label htmlFor="account">Dulux account</label>
                <input
                  type="text"
                  id="account"
                  placeholder="Enter your Dulux account"
                  value={formData.account}
                  onChange={handleChange}
                  style={{ borderColor: error.account ? 'red' : '#e0e0e0' }}
                />
                {error.account && <span className="error-message">{error.account}</span>}
              </div>

              <button type="submit">Sign Up</button>
            </form>

            <p className="signin-text">Already have your Account? <a href="#">Sign in</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App