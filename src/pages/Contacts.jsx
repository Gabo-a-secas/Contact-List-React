import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactList } from "./ContactList";

export const Contacts = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() =>{
        fetch("https://playground.4geeks.com/contact/agendas/gaboasecas/contacts")
        .then(response => {
            console.log("Respuesta completa:", response);
            if (!response.ok) throw new Error("No se pudo cargar la lista de contactos");
            return response.json();
        })
        .then(data => {
            console.log("Datos obtenidos:", data);
            dispatch({ type: "SET_CONTACTS", payload: data });

        })
        .catch(error => console.error("Error al obtener contactos:", error));

    }, []);
    console.log("El componente Contacts se está montando");
    return (
        <div>
            <ContactList />
        </div>
    )

    
};
