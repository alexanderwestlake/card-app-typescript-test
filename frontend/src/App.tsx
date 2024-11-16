import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";
import { EntryProvider } from "./utilities/globalContext";
import Cookies from "universal-cookie";

function App() {
  //Cookie shenanigans to allow for theme persistence
  let cookies = new Cookies();
  document.documentElement.setAttribute("theme", cookies.get("theme"));
  let themeLabelInitValue = "default";
  if(cookies.get("theme") !== undefined) themeLabelInitValue = cookies.get("theme")
  const [theme, setTheme] = useState(themeLabelInitValue);

  //Function to toggle theme and set cookie
  function toggleTheme() {
    if (theme == "default") {
      setTheme("dark");
      cookies.set("theme", "dark", {path: "/", sameSite: "lax", maxAge: 31557600})
      document.documentElement.setAttribute("theme", cookies.get("theme"));
    } else {
      setTheme("default");
      cookies.set("theme", "default", {path: "/", sameSite: "lax", maxAge: 31557600})
      document.documentElement.setAttribute("theme", cookies.get("theme"));
    }
  }


  return (
    <section className="bg-bg min-h-screen">
      <Router>
        <EntryProvider>
          <NavBar theme={theme} setTheme={toggleTheme}></NavBar>
          <Routes>
            <Route path="/" element={<AllEntries />}></Route>
            <Route path="create" element={<NewEntry />}></Route>
            <Route path="edit/:id" element={<EditEntry />}></Route>
          </Routes>
        </EntryProvider>
      </Router>
    </section>
  );
}
export default App;
