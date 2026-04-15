import { useEffect, useState } from "react";
import { baseUrl } from "../axiosInstance";
import { useNavigate } from "react-router-dom";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const getAllcontactList = async () => {
    try {
      const res = await baseUrl.get("/contact/contactlists");

      const formatted = res.data.ContactList.map((c) => ({
        _id: c._id,
        firstName: c.FirstName,
        lastName: c.LastName,
        relation: c.Relation,
        phone: c.PhoneNum,
        image: c.Image,
      }));

      //Debug
      formatted.forEach((item) => {
        console.log("Image:", item.image);
      });

      setContacts(formatted);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllcontactList();
  }, []);

  const handleDelete = async (id) => {
    await baseUrl.delete(`/contact/delete/${id}`);
    getAllcontactList();
  };

  const handleEdit = (contact) => {
    navigate("/", { state: contact });
  };

  return (
    <div>
      <h1>Contact List</h1>

      <button onClick={() => navigate("/")}>+ Add New</button>

      <table border="1">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
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
              <td colSpan="7">No Contacts Found</td>
            </tr>
          ) : (
            contacts.map((c, i) => (
              <tr key={c._id}>
                <td>{i + 1}</td>

                <td>
                  <img
                    src={
                      c.image
                        ? `http://localhost:3000/uploads/${c.image}`
                        : "https://via.placeholder.com/50"
                    }
                    width="50"
                    height="50"
                    alt="contact"
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </td>

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

export default ContactList;
