// import logo from './logo.svg';
import './App.css';
import Registeration from './Components/Registeration';
import Login from './Components/Login';
import { Routes, Route } from "react-router-dom";
import ProfileForm from './Components/profile';
import CreateEventForm from './Components/CreateEventForm';
import Protectedroute from './Components/Auth/Protectedroute';
function App() {
  return (
    <div className="App">
         <Routes>
  <Route path="/" element={<Registeration />} />
    <Route path="/login" element={<Login />} />

     <Route element={<Protectedroute />}>
  <Route path="/profile" element={<ProfileForm />} />
</Route>

     
      <Route path="/CreateEvent" element={<CreateEventForm />} />
      </Routes>
  
    </div>
  );
}

export default App;
