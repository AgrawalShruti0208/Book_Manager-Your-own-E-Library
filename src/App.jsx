import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import {Outlet} from 'react-router-dom'
import { userNameContext } from './utils/userNameContext'
import { useState, useEffect, useContext } from 'react'
// to provide Redux store to the Application
import {Provider} from "react-redux"
import { bookStoreRedux } from './utils/bookStoreRedux' //redux store created by us

 

function App() {

  
  
   const [userName,setUserName] = useState("");

   
   
  return (
    <>
      {/* Overriding the default value of Context created in userNameContext */}
      {/* By providing an object having application_user as userName state and its update method to all the components */}
      {/* Now, all the components have access to the name of user and a method to dynamically update this name */}
      <Provider store = {bookStoreRedux}>
        {/* Wrapping up all the components inside Provider functionality to share created REDUX STORE among all the components */}
      
        <userNameContext.Provider value={{application_user : userName,setUserName}}>
          <Header  />
          <Outlet />
          
          <Footer />
        </userNameContext.Provider>
      
      </Provider>
      
    </>
  )
}

export default App
