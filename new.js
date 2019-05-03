import { openDb, createContact } from './db.js'

// Get references to the form elements.
const newContactForm = document.getElementById('new-contact-form')
const newContactName = document.getElementById('name')
const newContactEmail = document.getElementById('email')
const newContactPhone = document.getElementById('phone')

window.onload = function() {
    openDb(function() {
        //doesn't do anything
    })

    // Handle new todo item form submissions.
    newContactForm.onsubmit = function() {

        // Get the contact information.
        const name = newContactName.value;
        const email = newContactEmail.value;
        const phone = newContactPhone.value;

        // Check to make sure the text is not blank (or just spaces).
        if (name.replace(/ /g, '') !== '') {
            // Create the todo item.
            createContact(name, email, phone, function(contact) {
                //after creation, go back to main page
                window.location = 'index.html';
            })
        }

        // Don't send the form.
        return false
    }
}