import axios from "../custom-axios/axios"
import qs from 'qs'

const SavingsRepository = {
    getSavings: (id)=> {
        return axios.get(`/savings/${id}`);
    },

    getAllSavings: () => {
        return axios.get("/savings")
    },

    getInitialBalance: (id) => {
        return axios.get(`/savings/initialBalance/${id}`);
    },


    createSavings: (term) => {
        const data = {

            Date: term.date,
            Hope_savings: term.hope_savings
        }
        const formParams = qs.stringify(data);
        return axios.post("/savings",formParams);
    },

    updateSavings: (term) => {
        const data = {
            savingsId: term.id,
            Saving: term.saving,
            Date: term.date,
            Previosstate: term.previos_state,
            Hopesavings: term.hope_savings
        }
        const sId = term.id;
        const formParams = qs.stringify(data);
        return axios.post(`/savings/${sId}`,formParams,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },


    deleteSavings: (sId) => {
        return axios.delete(`/savings/${sId}`);
    }
}

export default SavingsRepository;