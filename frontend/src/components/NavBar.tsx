import {NavLink} from 'react-router-dom'
import React from "react";

export default function NavBar(props:{theme:string; setTheme: React.MouseEventHandler<HTMLButtonElement> | undefined}){
    return(
      <nav className="flex justify-center gap-5">
        <NavLink className="m-3 p-4 text-xl bg-buttons hover:bg-hover rounded-md font-medium text-text" to={'/'}>All Entries</NavLink>
        <NavLink className="m-3 p-4 text-xl bg-buttons hover:bg-hover rounded-md font-medium text-text" to={'/create'}>New Entry</NavLink>
        <button className="m-3 p-4 text-xl bg-buttons hover:bg-hover rounded-md font-medium text-text" onClick={props.setTheme}>Toggle theme (current: {props.theme})</button>
      </nav>
    )
}