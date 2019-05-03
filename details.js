import { openDb, getContact, fetchContacts, deleteContact } from './db.js'

const detailsContact = document.getElementById('details-contact')

window.onload = function() {
    // Display the todo items.
    openDb(function(contact) {
        displayContact()
    })
}

// Update the list of contact items.
function displayContact() {
    const id = parseInt(localStorage.getItem('contact_id'));

    getContact(id, function(contact) {
        detailsContact.innerHTML = ''
        displayContactDetails(contact)
    })
}

// Update the list of contact items.
function refreshContacts() {
    fetchContacts(function(contacts) {
        contactList.innerHTML = ''

        for (let index = 0; index < contacts.length; index++) {
            // Read the contact items backwards (most recent first).
            const contact = contacts[contacts.length - 1 - index]
            addContact(index, contact)
        }
    })
}


function displayContactDetails(contact) {

    const listTitle = document.createElement('li')
    listTitle.className = 'list-group-item list-group-item-action list-group-item-secondary'
    listTitle.innerHTML = 'Contact'

    const liName = document.createElement('li')
    liName.id = 'contact-' + contact.timestamp
    liName.className = 'list-group-item'
    liName.innerHTML = 'Name: ' + contact.name

    const liEmail = document.createElement('li')
    liEmail.id = 'contact-' + contact.timestamp
    liEmail.className = 'list-group-item'
    liEmail.innerHTML = 'Email: ' + contact.email

    const liPhone = document.createElement('li')
    liPhone.id = 'contact-' + contact.timestamp
    liPhone.className = 'list-group-item'
    liPhone.innerHTML = 'Phone: ' + contact.phone

    // Create EDIT button
    const buttonEdit = document.createElement('button')
    buttonEdit.type = 'button'
    buttonEdit.innerHTML = 'EDIT'
    buttonEdit.className = 'btn btn-outline-warning right'
    buttonEdit.setAttribute('data-id', contact.timestamp)

    // Create DELETE button
    const buttonDelete = document.createElement('button')
    buttonDelete.type = 'button'
    buttonDelete.innerHTML = 'DELETE'
    buttonDelete.className = 'btn btn-outline-danger right'
    buttonDelete.setAttribute('data-id', contact.timestamp)

    const liButton = document.createElement('li')
    liButton.id = 'contact-' + contact.timestamp
    liButton.className = 'list-group-item list-group-item-action list-group-item-secondary'
    liButton.appendChild(buttonDelete)
    liButton.appendChild(buttonEdit)


    detailsContact.appendChild(listTitle)
    detailsContact.appendChild(liName)
    detailsContact.appendChild(liEmail)
    detailsContact.appendChild(liPhone)
    detailsContact.appendChild(liButton)

    // Delete a contact
    buttonDelete.addEventListener('click', function(e) {
        const id = parseInt(e.target.getAttribute('data-id'))
        if (confirm('Are you sure?')) {
            deleteContact(id, refreshContacts);
            window.location = 'index.html';
        }
    })


    // Edit contact
    buttonEdit.addEventListener('click', function(e) {
        const id = parseInt(e.target.getAttribute('data-id'))

        localStorage.setItem('contact_id', id);
        window.location = 'edit.html';
    })
}