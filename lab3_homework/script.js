const mockup = {
    1:{
        room_id: 1,
        type: "Z łazienką",
        places: 1,
        img_url: "",
        rent_by: null,
        date: null
    },
    2:{
        room_id: 2,
        type: "Bez łazienki",
        places: 3,
        img_url: "",
        rent_by: "Jan Kowalski",
        date: "2023-05-01"
    },
    3:{
        room_id: 3,
        type: "Bez łazienki",
        places: 4,
        img_url: "",
        rent_by: null,
        date: null
    },
    4:{
        room_id: 4,
        type: "Z łazienką",
        places: 2,
        img_url: "",
        rent_by: null,
        date: null
    },
    5:{
        room_id: 5,
        type: "Z łazienką",
        places: 6,
        img_url: "",
        rent_by: null,
        date: null
    }
};

function rentRoom(event) {
    event.preventDefault(); 

    const input = document.getElementById('rent-room-input');
    const arguments = input.value.split(', ');
    if (arguments.length != 2) {
        console.log("%c Niepoprawna ilość argumentów. Oczekiwano 2.\nPrzykład argumentów: '23, Jan Kowalski'\n", "color: red");
        return
    }

    const room_id = Number.parseInt(arguments[0]);
    const customer_name = arguments[1];

    const db = request.result;
    const transaction = db.transaction("rooms", "readwrite");

    const store = transaction.objectStore("rooms");
    const idQuery = store.get(room_id);

    idQuery.onsuccess = function () {
        const room = idQuery.result;
        
        if (room.rent_by == null) {
            
            room.rent_by = customer_name;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            room.date = today;
            const updateRoomRequest = store.put(room);

            updateRoomRequest.onsuccess = () => {
                console.log(`%c Pokój ${room.type} typu ${room.places}-pokojowy o numerze ${room_id} został/a zarezerwowany/a na nazwisko ${customer_name.split(" ")[1]}\n`, 'color: green');
            }
            
        } else {
            console.log("%c Pokój ten już został przez kogoś wypożyczony\n", 'color: red');
            return
        }
    };

    idQuery.onerror = function () {
        console.log("%c Nie ma takiego pokoju w bazie danych\n", 'color: red');
        return
    }
    
    transaction.oncomplete = function () {
        console.log("Zamykanie transakcji ");
    };
}


function returnRoom(event) {
    event.preventDefault(); 
    
    const input = document.getElementById('return-room-input');
    const arguments = input.value.split(', ');
    if (arguments.length != 2) {
        console.log("%c Niepoprawna ilość argumentów. Oczekiwano 2.\nPrzykład argumentów: '11, Jan Kowalski'\n", "color: orange");
        return
    }
    
    const room_id = Number.parseInt(arguments[0]);
    const customer_name = arguments[1];
    
    
    if (!mockup.hasOwnProperty(room_id)) {
        console.log("%c Nie ma takiego pokoju w bazie danych\n", "color: red");
        return
    }
    const room = mockup[room_id];
    
    if (room.rent_by != null && customer_name.localeCompare(room.rent_by) == 0) {
        room.rent_by = null;

        console.log(`%c Pan/Pani ${customer_name} zwraca pokój ${room.places}-osobowy o numerze ${room_id}\n`, 'color: green');
    }
    else {
        console.log(`%c Pan/Pani ${customer_name} nie wypożyczył/a tego pokoju\n`, 'color: red');
    }

}


function getAllRooms(event) {
    event.preventDefault(); 

    const db = request.result;
    const transaction = db.transaction("rooms", "readwrite");

    const store = transaction.objectStore("rooms");
    let viewAllRequest = store.getAll();
    viewAllRequest.onsuccess = (event) => {
        console.log("Wszystkie pokoje:");
        let rooms = viewAllRequest.result;
        console.log(rooms);
        for (let i = 0; i < rooms.length; i++) {
            console.log("ID pokoju: " + rooms[i].id);
            console.log("Typ pokoju: " + rooms[i].type);
            console.log("Ilość miejsc: " + rooms[i].places);
            console.log("URL zdjęcia: " + rooms[i].img_url);
            console.log("Wypożyczający: " + rooms[i].rent_by);
            console.log("Data rezerwacji: "+rooms[i].date);
            console.log("-----------------------");
        }
    }
}

function dbQuery() {
    const db = request.result;
    const transaction = db.transaction("rooms", "readwrite");

    const store = transaction.objectStore("rooms");
    const typeIndex = store.index("type");
    const placesIndex = store.index("places");
    const img_urlIndex = store.index("img_url");
    const rent_byIndex = store.index("rent_by");
    const dateIndex = store.index("date");
    const idQuery = store.get(2);

    idQuery.onsuccess = function () {
        console.log('idQuery', idQuery.result);
    };
    
    transaction.oncomplete = function () {
        console.log("Zamykanie transakcji ");
        db.close();
    };
}


const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

if (!indexedDB) {
  console.log("IndexedDB nie została znaleziona w twojej przeglądarce.");
}
const request = indexedDB.open("RoomsDatabase", 1);

request.onerror = function(event) {
    console.error("Błąd bazy danych IndexedDB")
    console.error(event);
}

request.onupgradeneeded = function () {
    const db = request.result;
    const store = db.createObjectStore("rooms", { keyPath: "id", autoIncrement: true});
    
    store.createIndex("type", ["type"], { unique: false});
    store.createIndex("places", ["places"], { unique: false});
    store.createIndex("img_url", ["img_url"], { unique: false});
    store.createIndex("rent_by", ["rent_by"], { unique: false});
    store.createIndex("date", ["date"], {unique: false});

    const mockup = [
        {
            room_id: 1,
            type: "Z łazienką",
            places: 1,
            img_url: "",
            rent_by: null,
            date: null
        },
        {
            room_id: 2,
            type: "Bez łazienki",
            places: 3,
            img_url: "",
            rent_by: "Jan Kowalski",
            date: "2023-05-01"
        },
        {
            room_id: 3,
            type: "Bez łazienki",
            places: 4,
            img_url: "",
            rent_by: null,
            date: null
        },
        {
            room_id: 4,
            type: "Z łazienką",
            places: 2,
            img_url: "",
            rent_by: null,
            date: null
        },
        {
            room_id: 5,
            type: "Z łazienką",
            places: 6,
            img_url: "",
            rent_by: null,
            date: null
        }
    ]
    for(item of mockup){
        store.put(item);
    }
};

request.onsuccess = function () {
    console.log("Baza danych została otwarta pomyślnie ");
};
    

const rent_room_btn = document.getElementById("rent-room-btn");
const return_room_btn = document.getElementById("return-room-btn");
const get_all_rooms_btn = document.getElementById("all-rooms-btn");
rent_room_btn.addEventListener('click', rentRoom);
return_room_btn.addEventListener('click', returnRoom);
get_all_rooms_btn.addEventListener('click', getAllRooms);

