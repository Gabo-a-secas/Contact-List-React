const API_BASE = "https://playground.4geeks.com/contact";
const AGENDA_SLUG = "gaboasecas";

async function ensureAgenda() {
  const res = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}`);
  if (res.ok) return true;
  const createRes = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}`, { method: "POST" });
  if (!createRes.ok) throw new Error("No se pudo crear la agenda");
  return true;
}

export async function getContacts(dispatch) {
  await ensureAgenda();
  const res = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts`);
  if (!res.ok) throw new Error("No se pudo cargar la lista de contactos");
  const data = await res.json();
  const contacts = data.contacts ?? data ?? [];
  dispatch({ type: "SET_CONTACTS", payload: { contacts } });
  return contacts;
}

export async function createContact(dispatch, contact) {
  await ensureAgenda();
  const res = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact)
  });
  if (!res.ok) throw new Error("No se pudo guardar el contacto");
  const created = await res.json();
  dispatch({ type: "ADD_CONTACT", payload: created });
  return created;
}

export async function updateContact(dispatch, contactId, contact) {
  await ensureAgenda();
  const res = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${contactId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact)
  });
  if (!res.ok) throw new Error("No se pudo actualizar el contacto");
  const updated = await res.json();
  dispatch({ type: "UPDATE_CONTACT", payload: updated });
  return updated;
}

export async function deleteContact(dispatch, contactId) {
  await ensureAgenda();
  const res = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${contactId}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("No se pudo eliminar el contacto");
  dispatch({ type: "DELETE_CONTACT", payload: contactId });
  return true;
}
