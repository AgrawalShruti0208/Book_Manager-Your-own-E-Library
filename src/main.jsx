import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";

import { HomePage } from './components/HomePage.jsx';
import { BrowseBooks } from './components/BrowseBooks.jsx';
import { AddBookForm } from './components/AddBookForm.jsx';
import { ErrorPage } from './components/ErrorPage.jsx';

// Dynamic component for every book click
import { BookDetails } from './components/BookDetails.jsx';

// Dynamic componet for book filtering based on category
import { Category_filter } from './components/category_filter.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    errorElement: <ErrorPage />,
    children:[
      {
        path:'/',
        element: <HomePage/>
      },
      {
        path:'/browseBooks',
        element: <BrowseBooks />
      },
      {
        path:'/addBook',
        element:<AddBookForm />
      },
      {
        // Dynamic Route for each book 
        path:'/book/:id',
        element: <BookDetails />,
      },
      {
        //Dynamic Route for each category
        path: '/books/:category',
        element: <Category_filter />
      }

    ]
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
