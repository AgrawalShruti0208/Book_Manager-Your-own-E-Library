// Slice for storing Book Data List to be shared with all the components
import {Books_Data} from "./mockData.js"
import {createSlice} from '@reduxjs/toolkit'
// createSlice provided by redux 

// YOU CANNOT DIRECTLY NAME EXPORT THE SLICE,
const bookDataSlice = createSlice(
    {
        // Slice is being created using createSlice built-in function whcih takes an object inside it
        name: "Books_List",//name for the slice
        initialState:{
            books: Books_Data , //initial state of the data we want to share
        },
        reducers:{
            // Reducers tell us what actions you can perform on the data
            addBook:(state,action) =>{
                // Here, addBook is a action that we can perform
                //And this action is performed by calling a helper function i.e. reducer function
                // Reducer function takes 2 things as parameter:
                        // 1. State: The state of the data 
                        // 2. action: The action has a payload props which brings us the data we need to update here just like set___ Methods of useState
                 state.books.unshift(action.payload); 
                //  We will be pushing the data inside the book list, whenever user adds a new book

            }
        }

    }
);
// REDUX Syntax needs you to export actions and reducer functions explicitly to store that in Store
/**Redux wants the above data in this form:
 * 
 * Reducer functions{
 * },
 * 
 * actions{
 * }
 */
// Exporting all the actions and Reducer props


export const {addBook} = bookDataSlice.actions;
export default bookDataSlice.reducer; //redux syntax that you need to export reducer props that consist of reducer functions explicitly

// Now add this Slice into Redux store