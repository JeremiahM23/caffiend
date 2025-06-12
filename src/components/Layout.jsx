import { useAuth } from "../context/AuthContext"
import Authentication from "./Authentication"
import Modal from "./Modal"
import { useState } from "react"

export default function Layout(props) {
    const {children} = props
    const [showModal, setShowModal] = useState(false)
    const {globalUser, logout} = useAuth()

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">CAFFIEND</h1>
                <p>For Coffee Insatiates</p>
            </div>
            {/* the on click allows us to click the sign up screen and pop up with the sign up screen*/}
            {globalUser ? (<button onClick={logout}>
                <p>Logout</p>
                
            </button>
            ) :  (
                <button onClick={() => {setShowModal(true)}}>
                <p>Sign up here</p>
                <i className="fa-solid fa-mug-hot"></i>
            </button>)}
        </header>
    )

    const footer = (
        <footer>
            <p><span className="text-gradient">Caffiend</span> was made by <a>Jeremiah Mackowski</a> <br /> using the <a href="https://www.fantacss.smoljames.com" target="_blank">FantaCSS</a> design Library.<br />Checkout the project on <a target="_blank" href=""></a>GitHub</p>
        </footer>
    )

    function handleCloseModal() {
        setShowModal(false)
    }

    return(
        <>
         {/* modal codes pop up the sign up screen and allows us to click off of it by clicking a the bbackground of the opage*/}
            {showModal && (
            <Modal handleCloseModal = {handleCloseModal} >
                <Authentication handleCloseModal={handleCloseModal}/>
            </Modal>)}
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}