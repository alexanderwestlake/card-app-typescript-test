import React, {useEffect, useState} from "react";
import NavBar from './components/NavBar'
import AllEntries from './routes/AllEntries'
import NewEntry from './routes/NewEntry'
import EditEntry from './routes/EditEntry'
import { EntryProvider } from './utilities/globalContext'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [theme , setTheme] = useState("default");
  function toggleTheme() {
    if(theme=="default"){
      setTheme("dark")
    } else setTheme("default")
  }

  useEffect(() => {
    document.documentElement.setAttribute("theme", theme);
  }, [theme])

  return (
    <section className="bg-bg h-screen">
  <Router>
    <EntryProvider>
    <NavBar theme={theme} setTheme={toggleTheme}></NavBar>
      <Routes>
        <Route path="/" element={<AllEntries/>}>
        </Route>
        <Route path="create" element={<NewEntry/>}>
        </Route>
        <Route path="edit/:id" element={<EditEntry/>}>
        </Route>
      </Routes>
    </EntryProvider>
    </Router>
    </section>
    
  );
}
export default App;
