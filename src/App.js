import "./App.css";
import { Route, Routes } from 'react-router-dom';
import { LoadScript } from "@react-google-maps/api";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  RedirectToSignIn
} from "@clerk/clerk-react";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import ToolsCarousel from "./components/ToolRoom";
import Footer from "./components/footer";
import WhyChooseUs from "./components/Whyus";
import ReadinessForm from "./components/ReadinessForm";
import ReadinessScore from "./components/ReadinessScore";
import TestimonialsSection from "./components/test";


const MAP_API_KEY = "AIzaSyAs69xs8PnRAYu14WB4MaCGhKQov-8jOFM";

function App() {
  return (
    <LoadScript googleMapsApiKey={MAP_API_KEY}>
      <div>
        {/* Auth Header */}
        <header className="p-4 bg-gray-800 text-white flex justify-end gap-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </header> 
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <AboutUs />
              <WhyChooseUs />
              <TestimonialsSection/>
              <ToolsCarousel />
              <Footer />
            </>
          } />

            <Route
              path="/readiness-form"
              element={
                <>
                  <SignedIn>
                    <ReadinessForm />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />

          {/* Add other routes here */}
  
                  <Route
          path="/readiness-score"
          element={
            <>
              <SignedIn>
                <ReadinessScore />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        </Routes>
      </div>
    </LoadScript>
  );
}

export default App;