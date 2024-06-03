import { ConstanstAPI } from "../constant/APIContanst";
import https from "../https/httpHandle";

const ClassesService = {
    getListClass: async () => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_LIST_CLASS.method,
                url: ConstanstAPI.GET_LIST_CLASS.url,
            });
            return result;
        } catch (err) {
            console.log(err.toJSON())
            return { status: err.response?.status, data: err.response?.data?.message }
        }
    },

    getSearchListClass: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_LIST_CLASS_SEARCH.method,
                url: ConstanstAPI.GET_LIST_CLASS_SEARCH.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
   
   
   
    createClass: async (data) => {

        try {
            const result = await https({
                method: ConstanstAPI.INSERT_CLASS.method,
                url: ConstanstAPI.INSERT_CLASS.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
   
   
   
    
  
    
    updateClass: async (id, data) => {
        try {
           
            const result = await https({
                method: ConstanstAPI.UPDATE_CLASS.method,
                url: ConstanstAPI.UPDATE_CLASS.url + '/' + id,
                data: data
            });
            return result;
        } catch (err) {

            return { status: err.response.status, data: err.response.data?.message }

        }
    },
   
    deleteClass: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.DELETE_CLASS.method,
                url: ConstanstAPI.DELETE_CLASS.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
}

export default ClassesService;