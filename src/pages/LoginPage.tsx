import { FormEvent, useState } from "react"
import { useHistory } from "react-router-dom"


// import heroImg from "../assets/images/hero-login.svg"
import facebookImg from "../assets/images/facebook.svg"
import twitterImg from "../assets/images/twitter.svg"
import googleImg from "../assets/images/google-plus.svg"
// import logo from "../assets/images/logo.svg"

import "../styles/loginPage.scss"
import { useAuth } from "../hooks/useAuth"

export function LoginPage(){
  const history = useHistory()
  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const {signInWithEmailPassword} = useAuth()

  const  handleLoginWithEmail = async (event: FormEvent) => {
    event.preventDefault()
    if(emailInput.trim() === ""){
      return
    }

    if(passwordInput.trim() === ""){
      return
    }

    try {
      await signInWithEmailPassword(emailInput, passwordInput)
    } catch (err) {
      console.log(err)
    }

  }
  
  async function handleLoginWIthGoogle() {
      try {
        // await signInWithGoogle()
      } catch (error) {
        return console.error(error)
      } 
    // history.push("/dashboard")
  }
  
  return(
    <div id="page-login">
      <header>
        <div className="logo">
          <img src={""} alt="logo" />
        </div>
      </header>
      <main>
          <div className="grid">
          <div className="login">
   
              <h2>Login to your account</h2>

            <div className="form-wrapper">
              <form onSubmit={event => handleLoginWithEmail(event)}>
                <div className="inputs">
                  <input
                  value={emailInput}
                  onChange={(event) => setEmailInput(event.target.value)}
                  placeholder="your email"
                  type="email"
                  autoComplete="username"
                  />
                  <input
                  value={passwordInput}
                  onChange={(event) => setPasswordInput(event.target.value)}
                  type="password"
                  placeholder="password"
                  autoComplete="password"
                  />
                </div>
                <button type="submit">Login</button>
              </form>
              <div>
                <span>or</span>
                <div className="row">
                    <button disabled>
                      <img src={twitterImg} alt="twitter login" />
                    </button>
                    <button disabled>
                      <img src={facebookImg} alt="facebook login" />
                    </button>
                    <button onClick={handleLoginWIthGoogle}>
                      <img src={googleImg} alt="google login" />
                    </button>
                </div>
              </div>
            </div>
          </div>
          <div className="hero">
            <img src={"heroImg"} alt="Hero" />
          </div>
        </div>
      </main>
    </div>
  )
}