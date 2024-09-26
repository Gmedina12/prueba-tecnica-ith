import { useState, useEffect } from 'react'
import PostUser from './Form/PostUser'


function App() {

  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data.slice(0, 5))
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchUsers()
  }, [])

  const fetchUsersbyId = async (id) => {
    setError('')
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      const data = await response.json();
      setUser(data)
    }
    catch (error) {
      setError('Error al obtener los usuarios', error)
      console.log(error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // const id = event.target.id.value
    fetchUsersbyId(userId)
  }
  const handleInputChange = (event) => {
    setUserId(event.target.value);
  };

  return (
    <>
      <div>
        <h1>Primeros 5 Usuarios</h1>
        <div>
          <ol>
            {
              users.map((user) => (
                <li key={user.id}>
                  Nombre: {user.name} <br/> Correo: {user.email} <br/> 
                  Teléfono: {user.phone} <br/> 
                  Dirección: {user.address.street}, {user.address.city}<br/><br/>
                </li>
              ))
            }
          </ol>
        </div>
          <br/>
          <div>
            <h1>Buscar usuario por ID</h1>
            <form onSubmit={handleSubmit}>
              <label>
                ID:
                <input type="texto" name="id" value={userId} onChange={handleInputChange}/>
              </label>
              <button type="submit">Buscar</button>
            </form>

            {error && <p>{error}</p>}
            {user && <p>Usuario encontrado: {user.name}</p>}
          </div>
          <br/>
          <div>
            <h1>Crear Usuario</h1>
          <PostUser/>
          </div>
          

      </div>

    </>
  )
}

export default App
