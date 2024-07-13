import {ChangeEvent, useEffect, useState} from 'react'
import {Card} from './components/Card'
import {User} from './types'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTitle, setSearchTitle] = useState<string>('')
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [active, setActive] = useState('')

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value)
  }

  const cardHandler = (username: string) => {
    setActive(username)
  }

  useEffect(() => {
    setLoading(true)
    const fetchUsers = () => {
      fetch('https://fakestoreapi.com/users?limit=9')
        .then((res) => res.json())
        .then((json) => {
          setUsers(json)
          setFilteredUsers(json)
        })
        .catch((e) => console.error('error', e))
        .finally(() => setLoading(false))
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const filteredData = users.filter((user) => {
      const filter = user.username.toLowerCase().includes(searchTitle)
      const phone = user.phone.toLowerCase().includes(searchTitle)
      const email = user.email.toLowerCase().includes(searchTitle)
      return filter || phone || email
    })
    setFilteredUsers(filteredData)
  }, [searchTitle, users])

  return (
    <main className="min-h-screen px-4 py-5 sm:px-10 xl:px-20 mx-auto ">
      <h1 className="font-bold text-5xl text-center ">Users</h1>
      <input
        className="w-[300px] h-[40px] border border-slate-400 flex my-8 mx-auto rounded-md px-4"
        onChange={handleSearch}
        value={searchTitle}
        placeholder="find user by name"
      />

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 mx-auto justify-items-center">
        {filteredUsers.map((user) => (
          <Card
            className={`${user.username === active && 'bg-red-300'}`}
            key={user.id}
            email={user.email}
            phone={user.phone}
            username={user.username}
            cardHandler={cardHandler}
          />
        ))}
      </section>
      {loading ? (
        <div className="flex justify-center">Loading...</div>
      ) : (
        filteredUsers.length === 0 && (
          <div className="flex justify-center">there are no users with this name</div>
        )
      )}
    </main>
  )
}

export default App
