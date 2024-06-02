import { FormControl, InputLabel, MenuItem, Pagination, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { countElementInPage } from '../../constant/Constants';
import StudentService from '../../services/StudentService';
import Loading from '../../shared/loading/Loading';
import ModalAlert from '../../shared/modal-alert/ModalAlert';
import TableGeneral from '../../shared/table_general/TableGeneral';
import { SiMicrosoftexcel } from "react-icons/si";
import { AiFillCheckSquare, AiFillCloseSquare } from "react-icons/ai";
import moment from 'moment/moment';
import CompanyService from '../../services/CompanyService';

const Company = () => {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState({ name: "", email: "", industry: "", address: "", phone: "" });
    const [companies, setCompanies] = useState([]);
    const [objAlert, setObjAlert] = useState({ isOpen: false, message: '', type: null });

    const headers = ["Id", "Name", "Email", "Industry", "Address", "Phone", "Report"];

    const renderDataTable = () => {
        return companies.slice((page - 1) * countElementInPage, countElementInPage * page).map(com => {
            return {
                id: <span className='font-bold'>COM{com.id}</span>,
                name: com.name,
                email: com.email,

                industry: com.industry,
                address: com.address,
                phone: com.phone,

                report: <div className='flex justify-center'>{com.idReport === 0 ? <AiFillCloseSquare className='text-red-600' /> : <AiFillCheckSquare className='text-green-600' />}</div>,
            }
        })
    }

    const handleChangeValueSearch = (name, value) => {
        setSearch((val) => ({
            ...val,
            [name]: value.target.value
        }));
    }

    const handleChangePanigation = (e, val) => {
        setPage(val);
    };

    const handleSearchListCompany = () => {
        getData();
    }

    const handleCloseAlert = () => {
        setObjAlert({ isOpen: false, message: '' });
    };


    const renderValueExport = () => {
        const value = companies.map((com) => ({
            id: `COM${com.id}`,
            name: com.fullname,
            email: com.email,
            industry: com.industry,
            address: com.address,
            phone: com.phone,

            report: com.idReport === null ? 'True' : 'False',
        }));
        return value.map((row) => Object.values(row).join(','));
    }

    const downloadCSV = (data) => {
        const csvHeader = headers.join(',');
        const csvRows = renderValueExport();
        const csvString = `${csvHeader}\n${csvRows.join('\n')}`;

        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const formatDay = moment(new Date()).format("YYYY_MM_DD");
        link.setAttribute('href', url);
        link.setAttribute('download', `companies_${formatDay}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const getData = async () => {
        try {
            setIsLoading(true);
            const res = await CompanyService.getListCompany();

            setCompanies(res.data);
        } catch (error) {
            setObjAlert({ isOpen: true, message: error.message, type: "error" });
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='w-full h-full p-5 overflow-hidden'>
            <div className="flex flex-col w-full h-full bg-white rounded shadow overflow-hidden">
                <div className='flex bg-gray-700 justify-between shadow-md items-center shadow-gray-200 pr-4'>
                    <h2 className='text-white font-bold text-3xl pb-1 pl-5 uppercase'>Company</h2>
                </div>
                <div className="flex flex-col h-full w-full body-content overflow-hidden">
                    <h4 className='mx-10 border-b border-primary font-bold text-primary text-xl mt-2'>Filter:</h4>
                    <div className='grid grid-cols-4 gap-3 mt-2 mx-10 mb-5'>



                        <TextField size='small' className='w-full' label="Name:" onChange={(val) => handleChangeValueSearch("name", val)} variant="outlined" />
                        <TextField size='small' className='w-full' label="Email:" onChange={(val) => handleChangeValueSearch("email", val)} variant="outlined" />
                        <TextField size='small' className='w-full' label="Industry:" onChange={(val) => handleChangeValueSearch("industry", val)} variant="outlined" />
                        <TextField size='small' className='w-full' label="Address:" onChange={(val) => handleChangeValueSearch("addresss", val)} variant="outlined" />
                        <TextField size='small' className='w-full' label="Phone:" onChange={(val) => handleChangeValueSearch("phone", val)} variant="outlined" />
                        
                        <button className='btn btn-primary text-xl' onClick={handleSearchListCompany}>Search</button>
                    </div>
                    <div className='px-10 w-full h-[430px] overflow-hidden'>
                        <TableGeneral headers={headers} body={renderDataTable()} />
                    </div>
                    <div className='mt-2 mb-2 px-10 flex justify-between items-center'>
                        <button className='btn btn-primary flex items-center' onClick={downloadCSV}><SiMicrosoftexcel color='white' size={25} className='mr-2' />Export file</button>
                        <Pagination onChange={handleChangePanigation} page={page} count={Math.ceil(companies.length / countElementInPage)} color="primary" showFirstButton showLastButton />
                    </div>
                </div>
            </div>
            {objAlert.isOpen && <ModalAlert {...objAlert} handleClose={handleCloseAlert} />}
            {isLoading && <Loading />}
        </div>
    )
}

export default Company