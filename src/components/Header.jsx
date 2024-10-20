import {Link} from 'react-router-dom'
import "./CSS Styles/styleHeaderFooter.css"
import { useContext } from 'react'
import { userNameContext } from '../utils/userNameContext'

//import { useSelector } from 'react-redux' //Selector Hook to get data from REDUX STORE i.e. Subscribing to the Store




export function Header(){

    const data = useContext(userNameContext);

    // Getting List of Books from REDUX STORE WE CREATED using useSelector Hook
    // With the Help of props we passed to all the components with Provider we can get the Books Array 
    //useSelector(props containing our store => props.SLICE_NAME.ARRAY_NAME INSIDE State)
    // const Book_List = useSelector(store => store.Books_List.books);
    
    
    if(data.application_user !=""){
        return(
            <div className="Header">
                <ul>
                    <li>
                        <Link to={'/'} >Home</Link>
                    </li>
                    <li>
                        <Link to={'/browseBooks'} >Browse Books</Link>
                    </li>
                    <li>
                    <Link to={'/addBook'} >Add New Book</Link>
                    </li>
                        
                </ul>
                <div className="userNameDiv">
                    
                        {/* <div className="monitor-wrapper center"> */}
                            <div className="monitor center">
                                <p>Hey, {data.application_user}</p>
                            </div>
                        {/* </div> */}
                    
                </div>
                
            </div>
        )
    }
}