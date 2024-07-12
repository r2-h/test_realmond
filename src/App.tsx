import { ChangeEvent, useEffect, useState } from "react"
import { Card } from "./components/Card"
import { User } from "./types"

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [usersName, setUsersName] = useState<string>("")
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setUsersName(e.target.value)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      fetch("https://fakestoreapi.com/users?limit=9")
        .then((res) => res.json())
        .then((json) => {
          setUsers(json)
          setFilteredUsers(json)
        })
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const lowercasedFilter = usersName.toLowerCase()
    const filteredData = users.filter((user) => user.username.toLowerCase().includes(lowercasedFilter))
    setFilteredUsers(filteredData)
  }, [usersName])

  return (
    <main className="min-h-screen px-4 py-5 sm:px-10 xl:px-20 mx-auto ">
      <h1 className="font-bold text-5xl text-center ">Users</h1>
      <input
        className="w-[300px] h-[40px] border border-slate-400 flex  my-8 mx-auto rounded-md px-4"
        onChange={handleSearch}
        value={usersName}
        placeholder="find user by name"
      />
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 justify-center mx-auto justify-items-center">
        {filteredUsers.map((user) => (
          <Card key={user.id} email={user.email} phone={user.phone} username={user.username} />
        ))}
      </section>
    </main>
  )
}

export default App