import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const EditContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const { contactId } = useParams();
    const navigate = useNavigate();

    const contact = store.contacts.find(c => c.id === parseInt(contactId));

    if (!contact) return <p className="text-center mt-5">Cargando contacto...</p>;

    const [fullName, setFullName] = useState(contact.name);
    const [email, setEmail] = useState(contact.email);
    const [address, setAddress] = useState(contact.address);
    const [phone, setPhone] = useState(contact.phone);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedContact = {
            name: fullName,
            email: email,
            address: address,
            phone: phone
        };

        fetch(`https://playground.4geeks.com/contact/agendas/gaboasecas/contacts/${contactId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedContact)
        })
            .then(response => {
                if (!response.ok) throw new Error("No se pudo actualizar el contacto");
                return response.json();
            })
            .then(() => {
                fetch("https://playground.4geeks.com/contact/agendas/gaboasecas/contacts")
                    .then(response => response.json())
                    .then(data => {
                        dispatch({ type: "SET_CONTACTS", payload: data.contacts });
                        navigate("/");
                    });
            })
            .catch(error => console.error("Error al actualizar:", error));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Editar contacto</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Nombre completo:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Dirección:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Teléfono:</label>
                    <input
                        type="tel"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">
                    Guardar cambios
                </button>
            </form>
        </div>
    );
};
