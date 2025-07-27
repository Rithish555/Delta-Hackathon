import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Login } from './components/Login.jsx'
import { Register } from './components/Register.jsx'
import { Dashboard } from './components/Dashboard.jsx'
import { ContextProvider } from './Context.jsx'
import { Items } from './components/Items.jsx'
import { Edit } from './components/Edit.jsx'

const MainRouter = ()=>{
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App />}>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/user/login' element={<Login />}></Route>
        <Route path='/user/register' element={<Register />}></Route>
        <Route path='/uploads/parent/:id' element={<Items />}></Route>
        <Route path='/uploads/editfile/:filename' element={<Edit />}></Route>
      </Route>
    )
  )
  return <RouterProvider router={route} />
} 

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <MainRouter />
  </ContextProvider>
)
