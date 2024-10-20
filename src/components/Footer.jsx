import "./CSS Styles/styleHeaderFooter.css"
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { userNameContext } from '../utils/userNameContext'

export function Footer(){
    const data = useContext(userNameContext);

    return(
        
        <div className="Footer">
            {data.application_user && 
                <>
                    <h2>Designed by SHRUTI AGRAWAL</h2>
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
                </>
            }
            
            
        </div>
            
    
    )
}