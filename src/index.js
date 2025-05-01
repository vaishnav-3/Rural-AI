import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

const clerk_key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
console.log("Clerk Key:", clerk_key);

if (!clerk_key) {
  throw new Error("Missing REACT_APP_CLERK_PUBLISHABLE_KEY in .env file");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode> 
    <BrowserRouter>
    <ClerkProvider publishableKey={clerk_key}>
      <App />
    </ClerkProvider>
     
    </BrowserRouter>
  </React.StrictMode>
);
