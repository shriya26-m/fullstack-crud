import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../axiosInstance";

function AddContact() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    relation: "",
    phone: "",
    image: "",
  });

  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ FIXED EDIT PREFILL
  useEffect(() => {
    if (location.state) {
      setForm({
        firstName: location.state.firstName,
        lastName: location.state.lastName,
        relation: location.state.relation,
        phone: location.state.phone,
        image: location.state.image || location.state.Image || "",
      });
      setEditId(location.state._id);
    }
  }, [location.state]);

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.relation || !form.phone) {
      alert("All fields required");
      return;
    }

    const data = new FormData();

    data.append("FirstName", form.firstName);
    data.append("LastName", form.lastName);
    data.append("Relation", form.relation);
    data.append("PhoneNum", form.phone);

    if (image) {
      data.append("image", image); // ✅ MUST MATCH multer
    }

    try {
      if (editId) {
        await baseUrl.put(`/contact/update/${editId}`, data);
      } else {
        // ✅ FIXED API
        await baseUrl.post("/contact/add", data);
      }

      navigate("/contacts");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>{editId ? "Edit Contact" : "Add Contact"}</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      {/* ✅ FIXED IMAGE PREVIEW */}
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          width="80"
          height="80"
          alt="preview"
        />
      ) : form.image ? (
        <img
          src={`http://localhost:3000/uploads/${form.image}`}
          width="80"
          height="80"
          alt="old"
        />
      ) : null}

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
    </div>
  );
}

export default AddContact;