// import logo from './logo.svg';
import "./App.css";
import Registeration from "./Components/Registeration";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import ProfileForm from "./Components/profile";
import CreateEventForm from "./Components/CreateEventForm";
import Protectedroute from "./Components/Auth/Protectedroute";
import HomePage from "./Components/HomePage";
import DetailEventPage from "./Components/DetailEventPage";
import BookMeetingForm from "./Components/BookMeetingForm";
import MyClender from "./Components/MyClender";
import VendorDetailPage from "./Components/VendorDetailPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Registeration />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Protectedroute />}>
          <Route path="/profile" element={<ProfileForm />} />
        </Route>
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/CreateEvent" element={<CreateEventForm />} />
        <Route path="/EventDetail/:id" element={<DetailEventPage />} />
          <Route path="/vendordetailpage/:id" element={<VendorDetailPage />} />
        <Route path="/BookMeetingForm/:EventId/:UserId" element={<BookMeetingForm />} />
         <Route path="/MyClender" element={<MyClender />} />
      </Routes>
    </div>
  );
}

export default App;
