import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const ContactList = () => {
    const { store, dispatch } = useGlobalReducer();

    const handleDelete = (contactId) => {
        fetch(`https://playground.4geeks.com/contact/agendas/gaboasecas/contacts/${contactId}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) throw new Error("No se pudo eliminar el contacto");
        })
        .then(() => {
            dispatch({ type: "DELETE_CONTACT", payload: contactId });
        })
        .catch(error => console.error("Error al eliminar contacto:", error));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Lista de contactos</h1>
            <ul className="list-group">
                {store.contacts.length === 0 ? (
                    <li className="list-group-item text-muted">
                        No hay contactos. Agregar nuevos.
                    </li>
                ) : (
                    store.contacts.map((contact) => (
                        <li key={contact.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{contact.name}</strong><br />
                                <small>Email: {contact.email}</small><br />
                                <small>Dirección: {contact.address}</small><br />
                                <small>Teléfono: {contact.phone}</small>
                            </div>
                            <div className="btn-group">
                                <Link to={`/edit/${contact.id}`} className="btn btn-warning btn-sm">
                                    Editar
                                </Link>
                                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(contact.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};
