// DYNAMIC COMPONENT FOR EVERY BOOK id passed in url
// import Hook to get parameter from url

import { useSelector } from "react-redux"
import "./CSS Styles/styleBookCard.css"
import { useNavigate ,useParams} from "react-router-dom";
import { useContext } from "react";
import { userNameContext } from "../utils/userNameContext";


export function BookDetails(){
    
    const data = useContext(userNameContext);

    const Books_data = useSelector(store => store.Books_List.books); //Books data


    //useParams HOOK: Returns an object of key/value pairs of the dynamic params from the current URL that were matched by the route path.
    const dynamic_urlParameter = useParams(); //key value pair
    const id = dynamic_urlParameter.id; //got the id from url

    // Filtering a Matching ID Book 
    const Book= Books_data.filter((book)=>{
        if(book.id == id){
            return book;
        }
    })
    const navigateTo = useNavigate();

    function handleReturn(){
        navigateTo("/");
    }

    function handleArrowClick(){
        navigateTo(-1);
    }

    // If Book id is not valid
    if(id <=0 || id>Books_data.length || data.application_user==""){
        return(
            <>
                <div>
                    <button className="customBtn" onClick={handleReturn}>Back To Home</button>
                </div>
            </>
        )
    }else{

        return(
            <>
                <br /><br />
                {/* Using the filtered book to get the values */}
                {Book.map((book)=>{
                    return (
                        <div className="BookDetailsPage">
                            <div className="backArrow" onClick={handleArrowClick}>
                                <img src="/left-arrow.png" alt="" width="60px" height="60px"/>
                            </div>
                            <div className="BookDetails-card" key={book.id}>
                                <div>
                                    {book.isNewlyAdded && <div className="newTag">Newly Added</div>}
                                    <img src={book.coverImage} alt="Book cover" height="380px"/>
                                </div>
                
                                <div className="Details">
                                        <h2>{book.title}</h2>
                                        <h4 className="BookAuthor"><i>By {book.author}</i></h4>
                                        
                                        <div className="Details_CR">
                                            <h4>Category : <span className="BookDetails_Category">{book.category}</span></h4>
                                            <h4 className="BookDetailsRating">{book.rating}</h4>
                                        </div>
                                
                                        <p className="BookDetails_description">{book.description}</p>
                                        <a href={book.url} target="/blank">
                                            <button className="Btn">Click to know more..</button>
                                        </a>
                                </div>
                            </div>
                        </div>
                        
                    )
                })}
            </>
        )
    }

    
}
