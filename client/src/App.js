import React from "react";
import Navbar from "./components/child_components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreatePosts from "./components/CreatePosts";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/crpost" element={<CreatePosts/>} />
        </Routes>{" "}
      </div>
    </Router>
  );
}

export default App;
