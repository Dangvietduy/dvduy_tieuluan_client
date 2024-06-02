import { ConstanstAPI } from "../constant/APIContanst";
import https from "../https/httpHandle";

const CompanyService = {
    getListCompany: async () => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_LIST_COMPANY.method,
                url: ConstanstAPI.GET_LIST_COMPANY.url,
            });
            return result;
        } catch (err) {
            console.log(err.toJSON())
            return { status: err.response?.status, data: err.response?.data?.message }
        }
    },
    getSearchListCompany: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_LIST_COMPANY_SEARCH.method,
                url: ConstanstAPI.GET_LIST_COMPANY_SEARCH.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    getInfoCompany: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_INFO_STUDENT.method,
                url: ConstanstAPI.GET_INFO_STUDENT.url + '/' + id,
                data: {}
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    getEvaluateCompany: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_EVALUATE_STUDENT.method,
                url: ConstanstAPI.GET_EVALUATE_STUDENT.url + '/' + id,
                data: {}
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    getStatistical: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_DATA_STATISTICAL.method,
                url: ConstanstAPI.GET_DATA_STATISTICAL.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response?.status, data: err.response?.data?.message }
        }
    },
    createCompany: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.INSERT_STUDENT.method,
                url: ConstanstAPI.INSERT_STUDENT.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    createEvaluateCompany: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.CREATE_EVALUATE_STUDENT.method,
                url: ConstanstAPI.CREATE_EVALUATE_STUDENT.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    getListAttendanceByCompany: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_LIST_ATTENDANCE_STUDENT.method,
                url: ConstanstAPI.GET_LIST_ATTENDANCE_STUDENT.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    getReportByCompany: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_REPORT_STUDENT.method,
                url: ConstanstAPI.GET_REPORT_STUDENT.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    addReportByCompany: async (id, data) => {
        try {
            const dataCompany = await https({
                method: ConstanstAPI.GET_INFO_STUDENT.method,
                url: ConstanstAPI.GET_INFO_STUDENT.url + '/' + id,
            })
            const idIntershipCompany = dataCompany.data.idIntershipCompany;
            const formData = new FormData();
            formData.append('file', data[0]);
            const result = await https.post(ConstanstAPI.POST_REPORT_STUDENT.url + '/' + idIntershipCompany,
                formData,
                {
                    headers: {
                        "Content-type": 'multipart/form-data'
                    }
                });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    downloadFileReportByCompany: async (id, filename) => {
        try {
            const result = await https({
                method: ConstanstAPI.DOWNLOAD_REPORT_STUDENT.method,
                url: ConstanstAPI.DOWNLOAD_REPORT_STUDENT.url + '/' + id,
                responseType: "blob"
            }).then((response) => {
                const blob = new Blob([response]);
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                URL.revokeObjectURL(url);
            }).catch((error) => {
                console.log(error);
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    deleteReportByCompany: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.DELETE_REPORT_STUDENT.method,
                url: ConstanstAPI.DELETE_REPORT_STUDENT.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    addAttendanceCompany: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.GET_ATTENDANCE_STUDENT.method,
                url: ConstanstAPI.GET_ATTENDANCE_STUDENT.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    updateCompany: async (id, data) => {
        try {
            const result = await https({
                method: ConstanstAPI.UPDATE_STUDENT.method,
                url: ConstanstAPI.UPDATE_STUDENT.url + '/' + id,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    updateEvaluateCompany: async (data) => {
        try {
            const result = await https({
                method: ConstanstAPI.UPDATE_EVALUATE_STUDENT.method,
                url: ConstanstAPI.UPDATE_EVALUATE_STUDENT.url,
                data: data
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
    deleteCompany: async (id) => {
        try {
            const result = await https({
                method: ConstanstAPI.DELETE_STUDENT.method,
                url: ConstanstAPI.DELETE_STUDENT.url + '/' + id,
            });
            return result;
        } catch (err) {
            return { status: err.response.status, data: err.response.data?.message }
        }
    },
}

export default CompanyService;