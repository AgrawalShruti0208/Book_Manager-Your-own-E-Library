import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { userNameContext } from "../utils/userNameContext"
import "./CSS Styles/styleBrowsePage.css"
import { Category } from "./Category"
import { useSelector } from "react-redux"
import { BookCard } from "./BookCard"



export function BrowseBooks(){
    const data = useContext(userNameContext);
    const Book_List = useSelector(store=>store.Books_List.books);
    const navigateTo = useNavigate();

    function handleReturn(){
        navigateTo("/");
    }

    

    const [searchInput,setSearchInput] = useState("");
    const [BooksToPrint,setBooksToPrint] = useState(Book_List);
    const [Heading,setHeading] = useState("All Books");

    const searchHeading = document.getElementById("SearchHeading");
    

    function handleSearchButton(){
        if(searchInput!=""){
            setHeading("Filtered Books")
            const FilteredBooks = Book_List.filter((book)=>{
                if(book.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                        book.author.toLowerCase().includes(searchInput.toLowerCase())){
                    return book;
                }
            })
            setBooksToPrint(FilteredBooks);
        }
    }
    
    function handleEmptyInput(value){
        if(value.trim() == ""){
            setHeading("All Books");
            setBooksToPrint(Book_List);
        }
    }
    
    return(
        <div className="browseBookDiv">
            {data.application_user == "" && 
                <div>
                    <button className="customBtn" onClick={handleReturn}>Back To Home</button>
                </div>
            }
            {data.application_user && 
                <div className="BrowseBooksPage">
                    <div className="animatedHeading">
                        <h1>BROWSE BOOKS</h1>
                    </div>

                    <Category/>

                    <div className="SearchBar">
                        <input 
                            type="text" 
                            className="SearchField"
                            value={searchInput}
                            placeholder="Search By TITLE or AUTHOR" 
                            onChange={(e)=>setSearchInput(e.target.value)}
                            onKeyUp={(e)=>handleEmptyInput(e.target.value)}
                        /> 
                        <button type="submit" className="searchBtn" onClick={handleSearchButton}>SEARCH</button>
                    </div>

                    <p className="Textseperator">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium minima aliquid, dolorem consequatur magnam quo voluptatibus consequuntur adipisci ratione distinctio natus unde. Laudantium, dolore eius. Vitae magni provident doloremque mollitia inventore quod corrupti sint eius excepturi, </p>
                
                    
                    <h2 id="SearchHeading" className="AllBooksHeading">{Heading}</h2>
        
                
                    <div className="AllCardsList">
                        {BooksToPrint.map((book)=>{
                            return <BookCard key={book.id} book = {book} /> 
                            
                        })}
                    </div>
                    
                </div>
            }
        </div>
    )
}