import { Route, Routes } from 'react-router-dom'
import Dashboard from './layout/dashboard'
import Header from './components/header'
import SideBar from './components/sidebar/sideBar'
import Worker from './layout/worker'
import './style/app.scss'
import Login from './layout/login'
import { useEffect, useState } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

import dashboardIcon from "./assets/icon/category.svg"
import notificationsIcon from "./assets/icon/notification.svg"
import employesIcon from "./assets/icon/employmes.svg"
import noteIcon from "./assets/icon/note.svg"
import addWorksIcon from "./assets/icon/addWork.svg"
import Note from './layout/note'
import AddWorks from './layout/addWorks'
import AddWorkers from './layout/addWorkers'
import Notification from './layout/notification'

export const nav_data = [
  {
    title: "Main Menu",
    items: [
      {
        name: "Dashboard",
        icon: dashboardIcon,
        to: "/"
      },
      {
        name: "Notifications",
        icon: notificationsIcon,
        to: "/notifications"
      },
      {
        name: "Employes",
        icon: employesIcon,
        to: "/workers"
      },
    ],
    borderBottom: true
  },
  {
    title: "WORKS",
    items: [
      {
        name: "Notes",
        icon: noteIcon,
        to: "/notes"
      },
      {
        name: "Add works",
        icon: addWorksIcon,
        to: "/add works"
      }
    ],
    borderBottom: false
  },
]


function App() {
  const [logged, setLogged] = useState(true)
  const [userName, setUsername] = useState(" ")
  const [password, setPassword] = useState(" ")
  const [currentUser, setCurrentUser] = useState({})
  const [users, setUsers] = useState([])
  const [notes, setNotes] = useState([])
  const [permission, setPermission] = useState(true)

  const token = localStorage.getItem("token")

  useEffect(() => {
    token ? setLogged(true) : setLogged(false)
    if (token) {
      axios.get("https://crm-5l3k.onrender.com/user", {
        headers: {
          "Authorization": `Bearer ${JSON.parse(token).access_token}`
        }
      }).then((res) => {
        setUsers(res.data)
      })
      axios.get(`https://crm-5l3k.onrender.com/user/${jwtDecode(JSON.parse(token).access_token).sub}`, {
        headers: {
          "Authorization": `Bearer ${JSON.parse(token).access_token}`
        }
      }).then((res) => {
        setCurrentUser(res.data)
      })
      axios.get("https://crm-5l3k.onrender.com/notes", {
        headers: {
          "Authorization": `Bearer ${JSON.parse(token).access_token}`
        }
      }).then((res) => {
        setNotes(res.data)
      })
    }
  }, [])

  useEffect(()=>{
    if(currentUser.role === "worker"){
      setPermission(false)
    }
  }, [currentUser])

  return (
    <div className='main'>
      {logged ? <SideBar nav_data={nav_data} /> : null}
      <div className='rightSide'>
        {logged ? <Header user={currentUser} /> : null}
        <Routes>
          {logged ? <>
            <Route path='/' element={<Dashboard workers={users} currentUser={currentUser} setUsers={setUsers}/>} />
            <Route path='/notes' element={<Note user={currentUser} notes={notes} setNotes={setNotes}/>}/>
            <Route path='/workers' element={<Worker workers={users} currentUser={currentUser} permission={permission}/>} />
            <Route path='/add works' element={<AddWorks users={users} user={currentUser} setUsers={setUsers} permission={permission}/>}/>
            <Route path='/add workers' element={<AddWorkers users={users} user={currentUser} setUsers={setUsers} permission={permission}/>}/>
            <Route path='/notifications' element={<Notification users={users} user={currentUser} setUsers={setUsers}/>}/>
          </> : <Route path='/' element={<Login
            userName={userName}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword} />}
          />}
        </Routes>
      </div>
    </div>
  )
}

export default App
