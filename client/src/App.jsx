import { Header } from "./components/Header"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex-grow">
      <Outlet />
      </div>
    </div>
  )
}

export default App
