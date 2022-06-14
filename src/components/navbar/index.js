import React from "react";
import { Link } from "react-router-dom";
import './style.css'


export default function NavBar(){

    return(
        <div className="NavBar">
            <Link className="Links" to='/'>Home</Link>
        </div>
    )
}