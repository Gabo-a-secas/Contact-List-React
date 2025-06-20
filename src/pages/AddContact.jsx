import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContact = () => {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos a enviar:", { fullName, email, address, phone });

        const newContact = {
            name: fullName,
            email: email,
            address: address,
            phone: phone
        };

        fetch("https://playground.4geeks.com/contact/agendas/gaboasecas/contacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newContact)
        })
        .then(response => {
            if (!response.ok) throw new Error("No se pudo guardar el contacto");
            return response.json();
        })
        .then(data => {
            dispatch({ type: "ADD_CONTACT", payload: data });
            console.log("Contacto creado:", data);
            navigate("/");
        })
        .catch(error => console.error("Error al crear contacto:", error));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Agregar nuevo contacto</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Nombre completo:</label>
                    <input type="text" className="form-control"
                        value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Email:</label>
                    <input type="email" className="form-control"
                        value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Dirección:</label>
                    <input type="text" className="form-control"
                        value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Teléfono:</label>
                    <input type="tel" className="form-control"
                        value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Guardar contacto</button>
            </form>
        </div>
    );
};
