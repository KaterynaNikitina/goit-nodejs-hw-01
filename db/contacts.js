import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { constants } from "buffer";

const contactsPath = path.resolve("db", "contacts.json");
console.log("contactsPath :>> ", contactsPath);

const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

export const getContactById = async (id) => {
  const contacts = await getAllContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

export const addContact = async ({ name, email, phone }) => {
  const contacts = await getAllContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

export const updateContactById = async (id, data) => {
  const contacts = await getAllContacts();
  const contactIndex = contacts.findIndex((item) => item.id === id);

  if (contactIndex === -1) {
    return null;
  }

  contacts[contactIndex] = { id, ...data };

  await updateContacts(contacts);
  return contacts[contactIndex];
};

export const deleteContactById = async (id) => {
  const contacts = await getAllContacts();
  const indexToDelete = contacts.findIndex((item) => item.id === id);
  if (indexToDelete === -1) {
    return null;
  }
  const [result] = contacts.splice(indexToDelete, 1);
  await updateContacts(contacts);
  return result;
};

export default {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
};
