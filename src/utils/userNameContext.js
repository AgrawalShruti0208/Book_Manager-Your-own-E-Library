// creating context for user name using createContext built-in function
import { createContext } from "react";

export const userNameContext = createContext({
    // it takes an object with all the key,value pair you want to share with all the components
     application_user : ""
});