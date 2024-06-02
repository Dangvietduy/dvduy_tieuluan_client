import { ConstanstAPI } from "../constant/APIContanst";
import https from "../https/httpHandle";

const ClassesService = {
    getListClasses: async () => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_LIST_CLASSES.method,
                url: ConstanstAPI.GET_LIST_CLASSES.url,
            });
            return result;
        } catch (err) {
            console.log(err.toJSON())
            return { status: err.response?.status, data: err.response?.data?.message }
        }
    },
}

export default ClassesService;