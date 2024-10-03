import { useState, useEffect } from "react";
import axios from "axios";
import './dashboard.css';

export default function UserManagementPage() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [updateCounter, setUpdateCounter] = useState(0);

    const [users, setUsers] = useState([]);

    // Fetch users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let fullUrl = "http://localhost:8080/users";
                const response = await axios.get(fullUrl); 
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, [updateCounter]);

    async function deleteSelectedUser(){
        if(selectedUser){
            try {
                let fullUrl = `http://localhost:8080/users/${selectedUser.id}`;
                const response = await axios.delete(fullUrl);
                setUpdateCounter(updateCounter + 1); 
            } catch (error) {
                console.error('Error fetching users:', error);
            }            
        }
    }


    function ListItem(props){
        return (
            <li className={(selectedUser === props.user)?"selected":""}
            onClick={()=>setSelectedUser(props.user)}>
            {props.user.id}, {props.user.username}, {props.user.password}, {props.user.type}
            </li>
        )
    }

    return (
        <div className="content">
            
                <h3 style={{textAlign:'left'}} >Manage Users</h3>
                {users.length > 0 ? (
                    <ul>
                        {users.map((user,index) => (
                            <ListItem key={user.id} user={user} />
                        ))}
                    </ul>
                ) : (
                    <p>Loading users...</p>
                )}
            <div style={{display:"inline-block",minHeight:35}}>
            <button 
                
                onClick={()=>deleteSelectedUser()}
                className={(selectedUser  === null)?"hidden":""}
                >Delete Selected User</button>
            </div>
        </div>
    )
}