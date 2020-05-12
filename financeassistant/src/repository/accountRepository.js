import axios from "../custom-axios/axios"
import qs from 'qs'

const AccountRepository = {
    getAllAccounts: () => {
        return axios.get("/accounts");
    },

    searchAccounts: (term) => {
        return axios.get(`/accounts?term=${term}`);
    },

    createAccount: (term) => {
        const data = {
            name: term.Name,
            type: term.type,
            currency: term.currency,
            initialBalance: term.InitialBalance
        }
        return axios.post("/accounts", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    updateUser: (term) => {
        const data = {
            ...term,
            accountId: term.accountId,
            Name: term.Name,
            Type: term.type,
            Currency: term.currency,
            InitialBalance: term.initialBalance,
            Transactions: term.Transactions
        }
        const aId = term.accountId;
        const formParams = qs.stringify(data);
        return axios.post(`/accounts/${aId}`, formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },

    getAccount: (aId) => {
        return axios.get(`/accounts/${aId}`);
    },

    deleteAccount: (aId) => {
        return axios.delete(`/accounts/${aId}`);
    }
}

export default AccountRepository;