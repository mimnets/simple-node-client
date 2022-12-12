import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])


  //Get data form node js server
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])

  //Post data to the node js server
const handleAddUser = (event)=>{
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const user = {name, email};
  console.log(user);
  fetch('http://localhost:5000/users',{
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user),
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    const newUser = [...users, data];
    setUsers(newUser);
  })
  .catch(err => console.error(err));
  form.reset();
}


  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder='Name'/>
        <br/>
        <input type="email" name="email" placeholder='Email'/>
        <br/>
        <button>Add User</button>
      </form>
      {
        users.map(user => <p key={user.id}>{user.name} {user.email}</p>)
      }
    </div>
  );
}

export default App;
