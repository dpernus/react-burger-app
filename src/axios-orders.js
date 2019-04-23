import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://react-burger-app-67ab7.firebaseio.com/'
});

export default axiosInstance;