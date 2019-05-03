import { openDb, fetchContacts, deleteContact } from './db.js'

// Get references to the form elements.
const contactList = document.getElementById('contact-items')


window.onload = function() {
    // Display the todo items.
    openDb(function(contact) {
        refreshContacts()
    })
}

// Update the list of contact items.
function refreshContacts() {
    fetchContacts(function(contacts) {
        contactList.innerHTML = ''

        for (let index = 0; index < contacts.length; index++) {
            // Read the contact items backwards (most recent first).
            const contact = contacts[contacts.length - 1 - index]
            displayContacts(index, contact)
        }
    })
}

function displayContacts(index, contact) {
    const tr = document.createElement('tr')
    tr.id = 'contact-' + contact.timestamp

    const tdIndex = document.createElement('td')
    tdIndex.className = 'contact-td'
    tdIndex.setAttribute('data-id', contact.timestamp)
    tdIndex.innerHTML = index

    const tdName = document.createElement('td')
    tdName.className = 'contact-td'
    tdName.setAttribute('data-id', contact.timestamp)
    tdName.innerHTML = contact.name

    const tdEmail = document.createElement('td')
    tdEmail.className = 'contact-td'
    tdEmail.setAttribute('data-id', contact.timestamp)
    tdEmail.innerHTML = contact.email

    const tdPhone = document.createElement('td')
    tdPhone.className = 'contact-td'
    tdPhone.setAttribute('data-id', contact.timestamp)
    tdPhone.innerHTML = contact.phone

    // Create column for buttons
    const tdButton = document.createElement('td')
    tdButton.className = 'contact-td'
    tdButton.setAttribute('data-id', contact.timestamp)

    // Create DETAILS button
    const buttonDetails = document.createElement('button')
    buttonDetails.type = 'button'
    buttonDetails.innerHTML = 'DETAILS'
    buttonDetails.className = 'btn btn-outline-primary'
    buttonDetails.setAttribute('data-id', contact.timestamp)

    // Create EDIT button
    const buttonEdit = document.createElement('button')
    buttonEdit.type = 'button'
    buttonEdit.innerHTML = 'EDIT'
    buttonEdit.className = 'btn btn-outline-warning'
    buttonEdit.setAttribute('data-id', contact.timestamp)

    // Create DELETE button
    const buttonDelete = document.createElement('button')
    buttonDelete.type = 'button'
    buttonDelete.innerHTML = 'DELETE'
    buttonDelete.className = 'btn btn-outline-danger'
    buttonDelete.setAttribute('data-id', contact.timestamp)

    tdButton.appendChild(buttonDetails)
    tdButton.appendChild(buttonEdit)
    tdButton.appendChild(buttonDelete)

    tr.appendChild(tdIndex)
    tr.appendChild(tdName)
    tr.appendChild(tdEmail)
    tr.appendChild(tdPhone)
    tr.appendChild(tdButton)

    contactList.appendChild(tr)

    // Delete a contact
    buttonDelete.addEventListener('click', function(e) {
        const id = parseInt(e.target.getAttribute('data-id'))

        if (confirm('Are you sure?')) {
            deleteContact(id, refreshContacts)
        }
    })

    // Details contact
    buttonDetails.addEventListener('click', function(e) {
        const id = parseInt(e.target.getAttribute('data-id'))

        localStorage.setItem('contact_id', id);
        window.location = 'details.html';
    })

    // Edit contact
    buttonEdit.addEventListener('click', function(e) {
        const id = parseInt(e.target.getAttribute('data-id'))

        localStorage.setItem('contact_id', id);
        window.location = 'edit.html';
    })
}