import { useEffect, useState } from "react";
import { baseUrl } from "../axiosInstance";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    relation: "",
    phone: "",
  });

  const [contacts, setContacts] = useState([]);
  const [editId, setEditId] = useState(null);

  // GET
  const getAllcontactList = async () => {
    try {
      const res = await baseUrl.get("/contact/contactlists");

      const formatted = res.data.ContactList.map((c) => ({
        _id: c._id,
        firstName: c.FirstName,
        lastName: c.LastName,
        relation: c.Relation,
        phone: c.PhoneNum,
      }));

      setContacts(formatted);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllcontactList();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD / UPDATE
  const handleSubmit = async () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.relation ||
      !form.phone
    ) {
      alert("All fields required");
      return;
    }

    try {
      if (editId) {
        await baseUrl.put(`/contact/update/${editId}`, {
          FirstName: form.firstName,
          LastName: form.lastName,
          Relation: form.relation,
          PhoneNum: form.phone,
        });
        setEditId(null);
      } else {
       await baseUrl.post("/contact/addcontact", {
          FirstName: form.firstName,
          LastName: form.lastName,
          Relation: form.relation,
          PhoneNum: form.phone,
        });
      }

      setForm({
        firstName: "",
        lastName: "",
        relation: "",
        phone: "",
      });

      getAllcontactList(); // ✅ refresh from DB
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    await baseUrl.delete(`contact/delete/${id}`);
    getAllcontactList();
  };

  // EDIT
  const handleEdit = (c) => {
    setForm(c);
    setEditId(c._id);
  };

  return (
    <div className="container">
      <h1>Contact Manager</h1>

      <input
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
      />
      <input
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
      />
      <input
        name="relation"
        placeholder="Relation"
        value={form.relation}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        {editId ? "Update Contact" : "Add Contact"}
      </button>

      <h3>Total Contacts: {contacts.length}</h3>

      <table border="1">
        <thead>
          <tr>
            <th>#</th>
            <th>First</th>
            <th>Last</th>
            <th>Relation</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan="6">No Contacts Found</td>
            </tr>
          ) : (
            contacts.map((c, i) => (
              <tr key={c._id}>
                <td>{i + 1}</td>
                <td>{c.firstName}</td>
                <td>{c.lastName}</td>
                <td>{c.relation}</td>
                <td>{c.phone}</td>
                <td>
                  <button onClick={() => handleEdit(c)}>Edit</button>
                  <button onClick={() => handleDelete(c._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;