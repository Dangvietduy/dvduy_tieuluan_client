import { ConstanstAPI } from "../constant/APIContanst";
import https from "../https/httpHandle";

const MajorService = {
    getListMajor: async () => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_LIST_MAJOR.method,
                url: ConstanstAPI.GET_LIST_MAJOR.url,
            });

        
            return result;
        } catch (err) {
            console.log(err.toJSON())
            return { status: err.response?.status, data: err.response?.data?.message }
        }
    },
    getSearchListMajor: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_LIST_MAJOR_SEARCH.method,
                url: ConstanstAPI.GET_LIST_MAJOR_SEARCH.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
   
   
   
    createMajor: async (data) => {

        try {
            const result = await https({
                method: ConstanstAPI.INSERT_MAJOR.method,
                url: ConstanstAPI.INSERT_MAJOR.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
   
   
   
    
  
    
    updateMajor: async (id, data) => {
        try {
           
            const result = await https({
                method: ConstanstAPI.UPDATE_MAJOR.method,
                url: ConstanstAPI.UPDATE_MAJOR.url + '/' + id,
                data: data
            });
            return result;
        } catch (err) {

            return { status: err.response.status, data: err.response.data?.message }

        }
    },
   
    deleteMajor: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.DELETE_MAJOR.method,
                url: ConstanstAPI.DELETE_MAJOR.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
}

export default MajorService;