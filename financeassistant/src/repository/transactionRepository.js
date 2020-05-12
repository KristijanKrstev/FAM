import axios from "../custom-axios/axios"
import qs from 'qs'

const TransactionsRepository =  {
    getAllTransactions : ()=> {
        return axios.get("/transactions");
    },

    searchTransactions: (term) => {
        return axios.get(`/transactions?term=${term}`);
    },

    createTransactions: (term) => {
        const data = {
            ...term,
            Date: term.Date,
            Amount: term.Amount,
            Description: term.Description,
            Tr_transaction: term.Tr_transaction,
            Account: term.Account
        }
        const formParams = qs.stringify(data);

        return axios.post("/transactions",formParams);
    },

    updateUser: (term) => {
        const data = {
            transactionId: term.transactionId,
            Date: term.Date,
            Amount: term.Amount,
            Description: term.Description,
            Tr_transaction: term.Tr_transaction
        }
        const tId = term.transactionId;
        const formParams = qs.stringify(data);
        return axios.post(`/transactions/${tId}`,formParams,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },

    getTransaction: (tId) => {
        return axios.get(`/transactions/${tId}`);
    },

    deleteTransaction: (tId) => {
        return axios.delete(`/transactions/${tId}`);
    }
}

export default TransactionsRepository;