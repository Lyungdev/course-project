import { openDb, getContact, fetchContacts, createContact, deleteContact, updateContact } from './db.js'

// Get references to the form elements.
const newContactForm = document.getElementById('new-contact-form')
const newContactName = document.getElementById('name')
const newContactEmail = document.getElementById('email')
const newContactPhone = document.getElementById('phone')
const contactList = document.getElementById('contact-items')

window.onload = function() {
    // Display the contact info.
    openDb(function(contact) {
        populateContact()
            //doesn't do anything
    })
}

// Update the list of contact items.
function populateContact() {
    const id = parseInt(localStorage.getItem("contact_id"));
    getContact(id, function(contact) {
        // detailsContact.innerHTML = ''
        populate(contact)
    })
}

function populate(contact) {
    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const phone = document.getElementById('phone')

    name.value = contact.name;
    email.value = contact.email;
    phone.value = contact.phone;

    var id = contact.timestamp;

    // Handle new todo item form submissions.
    newContactForm.onsubmit = function() {

        // Get the contact information.
        const name = newContactName.value
        const email = newContactEmail.value
        const phone = newContactPhone.value

        // Check to make sure the text is not blank (or just spaces).
        if (name.replace(/ /g, '') !== '') {
            // Create the todo item.
            updateContact(id, name, email, phone, function(contact) {
                //after editing, go back to main page
                window.location = 'index.html';
            })
        }

        // Don't send the form.
        return false
    }
}