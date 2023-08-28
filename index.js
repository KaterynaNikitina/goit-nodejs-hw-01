import { program } from "commander";

import contactsServices from "./db/contacts.js";

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsServices.getAllContacts();
      return console.table (allContacts);

    case "getById":
      const oneContact = await contactsServices.getContactById(id);
      return console.log(oneContact);
    case "add":
      const newContact = await contactsServices.addContact({
        name,
        email,
        phone,
      });
      return console.log(newContact);
    case "updateById":
      const updateContact = await contactsServices.updateContactById( id,{ name, email, phone } );
      return console.log(updateContact);
    case "deleteContact":
      const deleteContact = await contactsServices.deleteContactById(id);
      return console.log(deleteContact);
      default:  
      console.log('Unknown action');
  }
};

program
.option("-a --action <type>") // -a or --action.
.option("-i --id <type>")
.option("-n --name <type>")
.option("-e --email <type>")
.option("-p --phone <type>");

program.parse();
const options = program.opts();
invokeAction(options);


// invokeAction({action: "getById", id: 'AeHIrLTr6JkxGE6SN-0Rw'});
// invokeAction({action: 'list'})
