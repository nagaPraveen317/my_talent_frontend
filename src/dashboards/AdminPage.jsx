import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import './dashboard.css';

export default function AdminPage() {
    const text = `
    This "Administrator's Dashboard" page needs to be developed!
  
    This page should include:
    - Link to the "User Management Page" to manage login accounts 
    - Links to similar CRUD pages for direct editing of database table contents
    - List of application tables and rowcounts
    `;
    return (
      <div>
          <div className="content">
          <pre>{text}</pre>
          Links:<br/>
          <Link to={'/usermanagement'}>Manage Users</Link><br/>
          <Link onClick={()=>{alert("not implemented yet...")}} >Manage Job Openenings</Link><br/>
          <Link onClick={()=>{alert("not implemented yet...")}} >Manage Applications</Link><br/>
          ...
          </div>
      </div>
    )
}