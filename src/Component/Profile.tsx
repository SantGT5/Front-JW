import api from "../api/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHistory } from "react-router"

interface profile {
  name: string;
  email: string;
  role: string;
  _id: number;
}

export const Profile = () => {
    const history = useHistory()
  const [profile, setProfile] = useState<profile>({
    name: "",
    email: "",
    role: "",
    _id: 0,
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response: any = await api.get("/profile");

        setProfile({ ...response.data });
      } catch (err: any) {
        console.log(err.response);
      }
    }
    fetchProfile();
  }, []);


  const handleLogout = () => {
    window.localStorage.clear();
    history.push("/login");
    window.location.reload(); 
  };




  return (
    <div className="center fit">
      <div className="profile">
        <h3 className="profileTitle">Nombre</h3>
        <p className="profileInfo">{profile.name}</p>

        <h3 className="profileTitle">Correo</h3>
        <p className="profileInfo">{profile.email}</p>

        <h3 className="profileTitle">Role</h3>
        <p className="profileInfo">{profile.role}</p>
      </div>

      <div className="btnProfile">
          <div className="spaceBTN">
          <Link
          to={`/edite/${profile._id}`}
          type="button"
          className="btn btn-primary"
        >
          Editar
        </Link>
          </div>
        
          <div className="spaceBTN">
        <button type="button" className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
        </div>
      </div>
    </div>
  );
};
