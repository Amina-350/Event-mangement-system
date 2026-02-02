// import logo from './logo.svg';
import './App.css';
import Registeration from './Components/Registeration';
import Login from './Components/Login';
import { Routes, Route } from "react-router-dom";
import ProfileForm from './Components/profile';
function App() {
  return (
    <div className="App">
         <Routes>
  <Route path="/" element={<Registeration />} />
    <Route path="/login" element={<Login />} />
     <Route path="/profile" element={<ProfileForm />} />
      </Routes>
  
    </div>
  );
}

export default App;
