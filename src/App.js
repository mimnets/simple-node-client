import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])

  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])

const handleAddUser = (event)=>{
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const user = {name, email};
  console.log(user);
  form.reset();
}


  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <input type="text" name="name"/>
        <br/>
        <input type="email" name="email"/>
        <br/>
        <button>Add User</button>
      </form>
      {
        users.map(user => <p key={user.id}>{user.name}</p>)
      }
    </div>
  );
}

export default App;
