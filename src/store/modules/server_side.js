import axios from 'axios';
import query from 'query-string';
const state = {
baseURI : "https://localhost:44381/api/",
GET : "GET",
POST : "POST",
DELETE : "DELETE"
}

export default { 
    state,
    axios,
    query
}