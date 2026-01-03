import NavBar from "../../components/admin/NavBar/NavBar"
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div>
        <NavBar />
        <Outlet />
    </div>
  )
}

export default Admin