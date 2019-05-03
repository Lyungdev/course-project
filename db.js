let datastore
    // Database version.
const version = 1
const DB_NAME = 'contacts'
const STORE_NAME = 'contact'

/**
 * Open a connection to the datastore.
 */
export function openDb(callback) {
    // Open a connection to the datastore.
    const request = indexedDB.open(DB_NAME, version)

    // Handle datastore upgrades.
    request.onupgradeneeded = function(e) {
        const db = e.target.result

        e.target.transaction.onerror = onDberror

        // Delete the old datastore.
        if (db.objectStoreNames.contains(STORE_NAME)) {
            db.deleteObjectStore(STORE_NAME)
        }

        // Create a new datastore.
        db.createObjectStore(STORE_NAME, {
            keyPath: 'timestamp',
        })
    }

    // Handle successful datastore access.
    request.onsuccess = function(e) {
        // Get a reference to the DB.
        datastore = e.target.result

        // Execute the callback.
        callback()
    }

    // Handle errors when opening the datastore.
    request.onerror = onDberror
}

/**
 * Fetch all of the contact items in the datastore.
 */
export function fetchContacts(callback) {
    const db = datastore
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const objStore = transaction.objectStore(STORE_NAME)

    const keyRange = IDBKeyRange.lowerBound(0)
    const cursorRequest = objStore.openCursor(keyRange)

    const contacts = []

    transaction.oncomplete = function(e) {
        // Execute the callback function.
        callback(contacts)
    }

    cursorRequest.onsuccess = function(e) {
        const result = e.target.result

        if (!!result === false) {
            return
        }

        contacts.push(result.value)

        result.continue()
    }

    cursorRequest.onerror = onDberror
}

export function getContact(id, callback) {
    const db = datastore
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const objStore = transaction.objectStore(STORE_NAME)

    var contact;

    transaction.oncomplete = function(e) {
        // Execute the callback function.
        callback(contact)
    }

    var objectStoreRequest = objStore.get(id);
    objectStoreRequest.onsuccess = function(e) {
        contact = objectStoreRequest.result;
    }

    objectStoreRequest.onerror = function(e) {
        console.log("ERROR")
    }
}

/**
 * Create a new contact item.
 */
export function createContact(name, email, phone, callback) {
    // Get a reference to the db.
    const db = datastore

    // Initiate a new transaction.
    const transaction = db.transaction([STORE_NAME], 'readwrite')

    // Get the datastore.
    const objStore = transaction.objectStore(STORE_NAME)

    // Create a timestamp for the contact item.
    const timestamp = new Date().getTime()

    // Create an object for the contact item.
    const contact = {
        name: name,
        email: email,
        phone: phone,
        timestamp: timestamp,
    }

    // Create the datastore request.
    const request = objStore.put(contact)

    // Handle a successful datastore put.
    request.onsuccess = function(e) {
        // Execute the callback function.
        callback(contact);
    }

    // Handle errors.
    request.onerror = onDberror
}

/**
 * Delete a contact item.
 */
export function deleteContact(id, callback) {
    const db = datastore
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const objStore = transaction.objectStore(STORE_NAME)

    const request = objStore.delete(id)

    request.onsuccess = function(e) {
        callback()
    }

    request.onerror = onDberror
}

function onDberror(e) {
    console.error(e)
}

/**
 * Update a contact item.
 */
export function updateContact(id, name, email, phone, callback) {
    const db = datastore
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const objStore = transaction.objectStore(STORE_NAME)

    // Create an object for the contact item.
    const contact = {
        name: name,
        email: email,
        phone: phone,
        timestamp: id,
    }

    // Create the datastore request.
    const request = objStore.put(contact)

    // Handle a successful datastore put.
    request.onsuccess = function(e) {
        // Execute the callback function.
        callback(contact)
    }

    // Handle errors.
    request.onerror = onDberror
}