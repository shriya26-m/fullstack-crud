import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddContact from "./pages/AddContact";
import ContactList from "./pages/ContactList";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddContact />} />
        <Route path="/contacts" element={<ContactList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;