import axios from '../custom-axios/axios'
import qs from 'qs'
const UserService = {
    createNewUser: (newUser) => {
        return axios.post("/users/register",newUser);
    },

    getAllUsers : ()=> {
        return axios.get("/users");
    },

    searchUsers: (term) => {
        return axios.get(`/users?term=${term}`);
    },

    createUser: (term) => {
        const data = {
            ...term,
            Name:term.Name,
            dateOfBirth:term.dateOfBirth,
            Email:term.Email
        }
        const formParams = qs.stringify(data);
        return axios.post("/users",formParams);
    },

    updateUser: (term) => {
        const data = {
            ...term,
            userId:term.userId,
            Name:term.Name,
            dateOfBirth:term.dateOfBirth,
            Email:term.Email
        }
        const userId = term.userId;
        const formParams = qs.stringify(data);
        return axios.post(`/users/${userId}`,formParams,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },

    getUser: (userId) => {
        return axios.get(`/users/${userId}`);
    },

    deleteUser: (userId) => {
        return axios.delete(`/users/${userId}`);
    }



}

export default UserService;