import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactList } from "./ContactList";
import { getContacts } from "../contactActions.jsx";

export const Contacts = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        getContacts(dispatch).catch(error => console.error("Error al obtener contactos:", error));
    }, [dispatch]);

    console.log("El componente Contacts se está montando");
    return (
        <div>
            <ContactList />
        </div>
    );
};
