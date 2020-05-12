import axios from '../custom-axios/axios'
import qs from 'qs'
const WorkRepository = {
    createNewWork: (newWork) => {
        const formParams = qs.stringify(newWork);
    return axios.post("/works",formParams);
},

    getAllWorks : ()=> {
    return axios.get("/works");
},

    updateWork: (term) => {
    const data = {
        ...term,
        workId:term.workId,
        Name:term.Name,
        Address:term.Address,
        Number:term.Number
    }
    const formParams = qs.stringify(data);
    return axios.post(`/works/${data.workId}`,formParams,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
},
    getWork: (wId) => {
        return axios.get(`/works/${wId}`);
    },

    deleteWork: (workId) => {
    return axios.delete(`/works/${workId}`);
}
}

export default WorkRepository;