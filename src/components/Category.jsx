import { Link } from "react-router-dom";
import "./CSS Styles/styleCategory.css"
export function Category(){
    const category = ["Fiction","Fantasy","Horror","Sci-Fi","Classics"];

    return(
        <div className="CategoryDiv">
            <p className="CategoryHeading">Choose your favourible genre:</p>
            <div className="Categories_Btn">
                
                {category.map((data)=>{
                    return(
                        <Link to={`/books/${data}`} key={data}>
                            <button className="customBtn">{data}</button>
                        </Link>
                    )
                })}
            </div>
            
        </div>
    )
}