
import { useState, useContext} from "react";
import { userNameContext } from "../utils/userNameContext";
import "./CSS Styles/styleForm.css"
import { Slider } from 'rsuite'; //for styling slider

// Hook from react-redux to basically invoke the respective reducer function of the action inside Slice
import { useDispatch } from "react-redux"; 

// We have to import the action we have defined in the Slice to invoke it from here using useDispatch hook
import { addBook } from "../utils/bookDataSlice"; //addBook action from SLICE

import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';



export function AddBookForm(){
    const data = useContext(userNameContext);
    const Book_List = useSelector(store => store.Books_List.books);
    const [BookId,setBookId] = useState(Book_List.length+1);
    const [sliderValue,setSliderValue] = useState(0);
    const [coverImage,setCoverImage] = useState("");
    const [state, setState] = useState({
        category:"Fiction",
        title: "",
        author: "",
        description:""

      })
    
    
    
    const [err,setError] = useState('');

    const dispatch = useDispatch();
    
    const navigateTo = useNavigate();
    
    const labels = ['☆','⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐','⭐⭐⭐⭐⭐'];

    function handleFormSubmit(e){
        e.preventDefault()

       if(!err){
            const obj = state;
            obj.id = Book_List.length+1;
            setBookId(Book_List.length+1);
            setState({
                ...state,
                title :"",
                author:"",
                description :"",
                category:"Fiction"
            });

            const fileInput = document.querySelector('#fileUpload');
            const files = fileInput.files;
            
            let coverImage;

            if(files.length!=0){
                coverImage = URL.createObjectURL(files[0]);
            }else{
                switch (obj.category) {
                    case "Sci-Fi":
                        coverImage = "/Sci FI Book Cover.jpg";
                        break;
    
                    case "Fantasy":
                        coverImage = "/Fantasy Book Cover.jpg";
                        break;
    
                    case "Horror":
                        coverImage = "/Horror Book Cover.jpg";
                        break;
    
                    case "Classics":
                        coverImage = "/Classic Book Cover.jpg";
                        break;
                        
                    default:
                        coverImage = "/Fiction Book Cover.jpg";
                }
            }
            obj.coverImage = coverImage;
            
            obj.isNewlyAdded= true
            obj.rating = labels[sliderValue]+" "+sliderValue;

            obj.url = "https://www.goodreads.com/search/"
            console.log("Book Deatils of New Book: ",obj);

            dispatch(addBook(obj));

            navigateTo("/browseBooks");
       }

    }

    function handleAllChanges(evt){
        const value = evt.target.value;
        // Validate if the input is not empty
        if (!value.trim()) {
            setError('Input Required for all Inputs!');
        } else {
            setError('');
            setState({
                ...state,
                [evt.target.name]: value
            });
        }
        
    }


    function handleReturn(){
        navigateTo("/");
    }
 
    return(
        
        <div className="AddBookDiv">
            {data.application_user == "" && 
            <div>
                <button className="customBtn" onClick={handleReturn}>Back To Home</button>
            </div>
            }
            {data.application_user && 
            <>
                <div className="animatedHeading">
                    <h1>Add a Book to Your E-Library</h1>
                </div>
                
                <form className="AddBookForm" onSubmit={handleFormSubmit}>
                    <label><span className="FormHeadings">Book ID: </span>
                        <input className="BookID" type="text" name="id" value={BookId} readOnly />
                    </label> <br />

                    <label><span className="FormHeadings">Select Category: </span>
                        <select value={state.category} name="category" onChange={handleAllChanges}>
                            <option value="Fiction">Fiction</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Horror">Horror</option>
                            <option value="Classics">Classics</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                        </select>
                    </label> <br />

                    <label><span className="FormHeadings">Book Title: </span>
                        <input type="text" name="title" value={state.title} placeholder="Please Enter Title of the Book" required onChange={handleAllChanges}/>
                    </label> <br />

                    <label><span className="FormHeadings">Book Author: </span>
                        <input type="text" name="author" value={state.author} placeholder="Please Enter Author of the Book" required onChange={handleAllChanges}/>
                    </label> <br />

                    <label><span className="FormHeadings">Book Description: </span></label> <br />
                    <textarea 
                        name="description" 
                        value={state.description} 
                        placeholder="Please Enter Description for the Book" 
                        cols="30" 
                        rows="5" 
                        minLength={2} 
                        maxLength={150} 
                        required
                        onChange={handleAllChanges}
                    >
                    </textarea>

                    <br />
                    <label><span className="FormHeadings">Give Rating for the Book: </span></label>
                    <div style={{ width: 500, marginLeft: 20 }}>
                        {/* Slider Component from React suite package */}
                        <Slider 
                            min={0}
                            max={labels.length-1}
                            value={sliderValue}
                            className="custom-slider"
                            handleStyle={{
                            borderRadius: 10,
                            color: '#000',
                            fontSize: 20,
                            width: 'auto',
                            height: 40,
                            padding:5
                            }}
                            graduated
                            tooltip={true}
                            handleTitle={labels[sliderValue]}
                            onChange={setSliderValue}
                        />
                    </div>
                    <br /><br />
                    <label><span className="FormHeadings">If you wish,Please upload Book Cover: </span></label> <br />
                    <input type="file" id="fileUpload" accept="image/png, image/jpeg" />

                    {err && <p className="Error">{err}</p>}
                    <br /><button id="submitBtn" className="customBtn" type="submit">Add Book to the Library</button>

                </form>
            </>}
            
        </div>
    )
}