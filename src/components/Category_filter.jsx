import { useParams, useNavigate } from "react-router-dom"
import { useContext } from "react";
import { userNameContext } from "../utils/userNameContext";
import { useSelector } from "react-redux";
import { BookCard } from "./BookCard";
import "./CSS Styles/styleCategory.css"

export function Category_filter(){
    const Book_List = useSelector(store => store.Books_List.books);

     const data = useContext(userNameContext); //for Handling Full load
    
    const dynamic_parameter = useParams(); //Getting Parameter from URL
    const category_asked = dynamic_parameter.category; //Category from the URL

    const category = ["Fiction","Fantasy","Horror","Sci-Fi","Classics"];
    let FilteredBooks = [];

    if(category.includes(category_asked)){
        FilteredBooks = Book_List.filter((book)=>{
            if(category_asked == book.category){
                return book;
            }
        })
    }

    console.log("Category asked:",category_asked,"Filtered List",FilteredBooks);

    const navigateTo  = useNavigate();

    function handleReturn(){
        navigateTo("/");
    }

    
    
    if(!category.includes(category_asked) || data.application_user == ""){
        return(
            <>
                <div>
                    <button className="customBtn" onClick={handleReturn}>Back To Home</button>
                </div>
            </>
        )
    }
    if(category.includes(category_asked)){
        return(
            <>
                <div className="animatedHeading">
                    <h1>{category_asked.toUpperCase()} BOOKS</h1>
                </div>
                
                
                <div className="BookCardsList">
                    {FilteredBooks.map((book)=>{
                        return <BookCard key={book.id} book = {book} /> 
                        
                    })}
                </div>
                
            </>
        )
    }
    
}