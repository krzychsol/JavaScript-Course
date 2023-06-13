'use strict';

const API_URL = 'http://localhost:8080';
const list = document.querySelector('.rooms-list');

const userMockup = {
    userId: '6488c2202f94fe6795e8e1e0',
    name: 'Jan',
    surname: 'Kowalski',
    email: 'jkowalski@gmail.com',
    phone: '123456789',
    address: 'ul. Kowalska 1, 00-000 Warszawa'
};

// Get an item ObjectId (id of the MongoDB document) from the DOM element.
const getItemId = (element) => {
    if(!element || !element.classList) {
        return null;
    }
    if(element.classList.contains('room-content')) {
        return element.getAttribute('data-id');
    }
    return getItemId(element.parentNode);
};

// Setup fetch API options to send data (excluding GET method).
const setupRequest = body => {
    return {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
    body: JSON.stringify(body)
    }
};

const reserveRoom = async event => {
    const id = getItemId(event.target);
    try{
        const res = await fetch(`${API_URL}/rooms`, {
            method: 'POST',
            ...setupRequest({ roomID: id, ...userMockup })
        });
        if(res.status >= 400) {
            throw new Error('Bad response from server');
        }
        return await res.json();
    } catch(err) {
        console.log(err);
        return null;
    }
};

const returnRoom = async event => {
    const id = getItemId(event.target);
    try{
        const res = await fetch(`${API_URL}/rooms`, {
            method: 'PUT',
            ...setupRequest({ roomID: id, ...userMockup })
        });
        if(res.status >= 400) {
            throw new Error('Bad response from server');
        }
        return await res.json();
    } catch(err) {
        console.log(err);
        return null;
    }
}

const deleteRoom = async event => {
    const id = getItemId(event.target);
    try{
        const res = await fetch(`${API_URL}/rooms`, {
            method: 'DELETE',
            ...setupRequest({ roomID: id, ...userMockup })
        });
        if(res.status >= 400) {
            throw new Error('Bad response from server');
        }
        return await res.json();
    } catch(err) {
        console.log(err);
        return null;
    }
}

document.querySelector('.reserve-button').forEach(button => {
    button.addEventListener('click', reserveRoom);
});

document.querySelector('.return-button').forEach(button => {
    button.addEventListener('click', returnRoom);
});

document.querySelector('.delete-button').forEach(button => {
    button.addEventListener('click', deleteRoom);
});