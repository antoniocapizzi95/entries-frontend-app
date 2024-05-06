import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateEntryPage from "./pages/CreateEntryPage";
import EditEntryPage from "./pages/EditEntryPage";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create-entry">Create Entry</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/create-entry" element={<CreateEntryPage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/edit-entry/:entryId" element={<EditEntryPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;