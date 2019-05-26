import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://megacastingapi.azurewebsites.net',
    timeout: 1000,
    headers: {'Authorization': "bearer " + localStorage.getItem('userToken')}

});

export default instance;