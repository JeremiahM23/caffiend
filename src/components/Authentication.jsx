import { useState } from "react"
import { useAuth } from "../context/AuthContext"


export default function Authentication(props) {
    const { handleCloseModal } = props
    const [isRegistration, setIsRegistration] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [err, setError] = useState(null)

    const { signup, login } = useAuth()

    async function handleAuthentication() {
        if (!email || !email.includes('@') || !password || password.length < 6 || isAuthenticating) { return }
        try {
            setIsAuthenticating(true)
            setError(null)
            if (isRegistration) {
                // register a user
                await signup(email, password)
            } else {
                // log in a user
                await login(email, password)
            }
            handleCloseModal()
        } catch (error) {
            console.log(error.message)
            setError(error.message)
        } finally {
            setIsAuthenticating(false)
        }
    }
    return (
        <>
            {/* code below here switches between sign up and login page at the top of the authentication popup*/}
            <h2 className="sign-up-text">{isRegistration ? 'Sign Up' : 'Login'}</h2>
            <p>{isRegistration ? 'Create an account!' : 'Sign in to your account!'}</p>
            {err && (
                <p>❌ {err}</p>
            )}
            <input value={email} onChange={(event) => { setEmail(event.target.value) }} placeholder="Email" />
            <input value={password} onChange={(event) => { setPassword(event.target.value) }} placeholder="********" type="password" />
            <button onClick={handleAuthentication}><p>{isAuthenticating ? 'Authenticating...' : 'Submit'}</p></button>
            <hr />
            <div className="register-content">
                <p>{isRegistration ? 'Already have an account?' : 'Don\'t have an account?'}</p>
                {/* thet code below allows when clicking sign up or sign in to switch between the sign up screen and login screen*/}
                <button onClick={() => { setIsRegistration(!isRegistration) }}><p>{isRegistration ? 'Sign In' : 'Sign Up'}</p></button>
            </div>
        </>
    )
}