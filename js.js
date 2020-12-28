const API_URL = 'https://swapi.dev/api/'
const PEOPLE_URL =  'people/:id'
const opts = {crossDomain: true};


function getCharacter(id) {
    const url = `${API_URL}${PEOPLE_URL.replace(":id", id)}`
    $.get(url, opts, function (person) {
        console.log(`Hola yo soy ${person.name} id: ${id}`);
    });
}

for (let index = 1; index <= 1; index++) {
    getCharacter(index);
}

