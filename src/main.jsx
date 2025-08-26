import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // Global styles for your application
import { RouterProvider } from "react-router-dom";  // Import RouterProvider to use the router
import { router } from "./routes";  // Import the router configuration
import { StoreProvider } from './hooks/useGlobalReducer';  // Import the StoreProvider for global state management
import useGlobalReducer from './hooks/useGlobalReducer'
import { getContacts } from './contactActions.jsx'

const AppBootstrap = ({ children }) => {
    const { dispatch } = useGlobalReducer()
    useEffect(() => {
        getContacts(dispatch).catch(err => console.error("Bootstrap error:", err))
    }, [dispatch])
    return children
}

const Main = () => {
    return (
        <React.StrictMode>  
            {/* Provide global state to all components */}
            <StoreProvider> 
                {/* Set up routing for the application */} 
                <AppBootstrap>
                    <RouterProvider router={router}>
                    </RouterProvider>
                </AppBootstrap>
            </StoreProvider>
        </React.StrictMode>
    );
}

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
