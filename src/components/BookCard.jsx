import "./CSS Styles/styleBookCard.css"
import { Link } from "react-router-dom"
export function BookCard(props){
    return(
        <div className="Book-card">
            <div className="BookCardFirstHalf">
                {props.book.isNewlyAdded && <div className="newTag">Newly Added</div>}
                <img src={props.book.coverImage} alt="Book cover" width="250px" />
            </div>
           
           <div className="BookDetails">
                <h2>{props.book.title}</h2>
                <h4 className="BookAuthor"><i>By {props.book.author}</i></h4>
                <h4 className="BookRating">{props.book.rating}</h4>
                <p className="Book_description">{props.book.description}</p>
                <Link to={`/book/${props.book.id}`} key={props.book.id}>
                    <button className="viewDetails">View Details</button>
                </Link>
                
           </div>
        </div>
    )
}