const Contact = require('../models/Contact');
const catchAsync = require('../helpers/catchAsync');
const { StatusCodes } = require('http-status-codes');

// Get all contacts
const getContacts = catchAsync(async (req, res) => {
    const contacts = await Contact.find();
    res.send(contacts);
});

// Get a contact by its ID given in parameters
const getContact = catchAsync(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);

    if (contact) {
        res.send(contact); 
    } else {
        res.status(StatusCodes.NOT_FOUND);
        res.send("Contact non trouvé");
    }
});

// Create a contact with body request
const createContact = catchAsync(async (req, res) => {
    const contact = await Contact.create(req.body);
    console.log("req.body", req.body);
    res.send(contact);
});

// Update a contact by its ID given in parameters and data in body request
const updateContact = catchAsync(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (contact) {
        res.send(contact);
    } else {
        res.status(StatusCodes.NOT_FOUND);
        res.send("Contact not found");
    }

});

// Delete a contact by its ID
const deleteContact = async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findByIdAndDelete(id);

    if (contact) {
        res.send(contact);
    } else {
        res.status(StatusCodes.NOT_FOUND);
        res.send("Contact not found");
    }
};

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
}