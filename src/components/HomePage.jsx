import { useContext, useState } from "react"
import { userNameContext } from "../utils/userNameContext"
import { useSelector } from "react-redux";
import { BookCard } from "./BookCard";
import { Category } from "./Category";
import { Link } from "react-router-dom";
import "./CSS Styles/styleHomePage.css"

export function HomePage(){
    const data = useContext(userNameContext);
    
    const {setUserName} = data;
    const [userInput,setUserInput] = useState("");
    const [err,setErr] = useState("");

    const Book_List = useSelector(store => store.Books_List.books);
    const PopularBooks = Book_List.filter((book)=>{
        return book.id % 2 == 0 ?(book):null;
    })
    

    function handleInputChange(evt){
        const value = evt.target.value;

        // Validate if the input is not empty
        if (!value.trim()) {
            setErr('This Input is Required!');
        } else {
            setErr('');
            setUserInput(value);
        }
        
    }
    function handleFormSubmit(e){
        e.preventDefault();

        if(!err){
            setUserName(userInput);
        }
        
    }
    
    return(
        <div className="HomePageDiv">
            {/* display input for first time user */}
            {data.application_user =='' && <div className="FormDiv">
                <h1>Hello User, Please Enter your Name to Begin. </h1>
                <form onSubmit={handleFormSubmit}>
                    <fieldset>
                        <legend><i>User Details</i></legend>
                        <input type="text" value={userInput} placeholder="Enter your Name here" onChange={handleInputChange} required/>
                        <button type="submit">Enter in the World of E-Books</button><br />
                        {err && <p className="error"><i>{err}</i></p>}
                    </fieldset>
                </form>
                
            </div>}

            {/* display Home page with now user name entered by User*/}
            {data.application_user &&
            <>
                <h1>Welcome <span className="UserName">{data.application_user}</span>  to Your Own E-Library - <span className="animate-charcter">BOOK MANAGER</span></h1>
                
                <Category />
                
                
                <p className="Textseperator">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium minima aliquid, dolorem consequatur magnam quo voluptatibus consequuntur adipisci ratione distinctio natus unde. Laudantium, dolore eius. Vitae magni provident doloremque mollitia inventore quod corrupti sint eius excepturi, </p>
                
                <div className="PopularBooks">
                    <h2>Some of the Popular Books:</h2>
                    <Link to="/browseBooks">
                        <h4>↪View More</h4>
                    </Link>
                </div>
                <div className="BookCardsList">
                    {PopularBooks.map((book)=>{
                        return <BookCard key={book.id} book = {book} /> 
                        
                    })}
                </div>
                


                
            
            </>}
            
        </div>
    )
}