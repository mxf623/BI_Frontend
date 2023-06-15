import axios from 'axios';

let service=axios.create({
    baseURL:'http://localhost:5001/',
    //timeout:100000
})
export default service