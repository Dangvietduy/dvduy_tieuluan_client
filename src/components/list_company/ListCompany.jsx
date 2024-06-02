import { Menu, MenuItem, Pagination, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdAdd, MdDeleteForever, MdEdit, MdOutlineMoreHoriz, MdOutlineRemoveRedEye } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import CompanyService from '../../services/CompanyService';
import ModalConfirm from '../../shared/modal_confirm/ModalConfirm';
import TableGeneral from '../../shared/table_general/TableGeneral';
import FormCompany from '../from/form-company/FormCompany';
import Loading from '../../shared/loading/Loading';
import ModalAlert from '../../shared/modal-alert/ModalAlert';
import './ListCompany.scss';
import { countElementInPage } from '../../constant/Constants';

// const countElementInPage = 10;

const ListCompany = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState({ name: "", industry: "", address: "" });
    const [isLoading, setIsLoading] = useState(true);
    const [objAlert, setObjAlert] = useState({ isOpen: false, message: '', type: null });
    const [companies, setCompanies] = useState([]);
    const [company, setCompany] = useState({});
    const [idCompany, setIdCompany] = useState(null);
    const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] = useState(false);
    const [isOpenModalAddCompany, setIsOpenModalAddCompany] = useState(false);

    const navigate = useNavigate();

    const handleGetData = async () => {
        try {
            const companyResult = await CompanyService.getListCompany();
            if (companyResult?.status === 200) {
                const data = companyResult.data
                setCompanies(data);
            }
        } catch (error) {
            setObjAlert({ isOpen: true, message: error.message, type: "error" });
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        handleGetData();
    }, [isOpenModalAddCompany]);


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event, id) => {
        setIdCompany(id);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseAlert = () => {
        setObjAlert({ isOpen: false, message: '' });
    };

    const showModalAddCompany = () => {
        handleClose();
        setIsOpenModalAddCompany(true);
    }

    const showModalUpdateCompany = () => {
        const filterCompany = companies.find(({ id }) => id === idCompany);
        setCompany(filterCompany);
        handleClose();
        setIsOpenModalAddCompany(true);
    }

    const closeModalAddCompany = () => {
        setIdCompany(null);
        setCompany({});
        setIsOpenModalAddCompany(false);
    }

    const handleConfirmDeleteCompany = () => {
        handleClose();
        setIsOpenModalConfirmDelete(true);
    }

    const handleChangeValueSearch = (name, value) => {
        setSearch((val) => ({
            ...val,
            [name]: value.target.value
        }));
    }

    const handleSearchListCompany = async () => {
        try {
            setIsLoading(true);
            const res = await CompanyService.getSearchListCompany(search);
            const data = res.data
            setCompany(data);
        } catch (error) {
            setObjAlert({ isOpen: true, message: error.message, type: "error" });
        } finally {
            setIsLoading(false);
        }
    }

    const handleViewDetailCompany = () => {
        if (idCompany) {
            navigate("/list-company/detail/" + idCompany);
        }
    }

    const handleCloseModalConfirmDelete = () => {
        setIsOpenModalConfirmDelete(false);
    }

    const deleteCompany = async () => {
        try {
            handleCloseModalConfirmDelete();
            await CompanyService.deleteCompany(idCompany);
            handleGetData();
            setObjAlert({ isOpen: true, message: "Company Deleted Success!", type: "success" });
        } catch (error) {
            setObjAlert({ isOpen: true, message: "Company Deleted Faill!", type: "error" });
        }
    }

    const headers = ["ID", "Company Name", "Email", "Phone Number", "Industry", "Address", "Action"];

    const renderDataTable = () => {
        return companies.slice((page - 1) * countElementInPage, countElementInPage * page).map(company => {
            return {
                id: <span className='font-bold'>SV{company.id}</span>,
                name: company.name,
                email: company.email,
                phone: company.phone,
                industry: company.industry,
                address: company.address,
                
                status: (
                    <div className='flex justify-center'>
                        <MdOutlineMoreHoriz size={25} className='hover:cursor-pointer hover:bg-gray-400 rounded-full' onClick={(e) => handleClick(e, company.id)} />
                    </div>
                ),
            }
        })
    }

    const handleChangePanigation = (e, val) => {
        setPage(val);
    };

    return (
        <div className='w-full h-full p-5 overflow-hidden'>
            {objAlert.isOpen && <ModalAlert {...objAlert} handleClose={handleCloseAlert} />}
            {isLoading && <Loading />}
            <div className="w-full h-full bg-white rounded shadow overflow-hidden">
                <div className='flex bg-gray-700 justify-between shadow-md items-center shadow-gray-200 pr-4'>
                    <h2 className='text-white font-bold text-3xl pb-1 pl-5 uppercase'>List Company</h2>
                    <MdAdd onClick={showModalAddCompany} size={25} className='text-white hover:cursor-pointer hover:bg-gray-200 rounded-full' />
                </div>
                <div className="h-full w-full body-content overflow-hidden">
                    <h4 className='mx-10 border-b border-primary font-bold text-primary text-xl mt-2'>Filter:</h4>
                    <div className='flex gap-5 mt-2 mx-10 mb-5'>
                        <TextField className='w-full' label="Name:" value={search.name} onChange={(val) => handleChangeValueSearch("name", val)} variant="outlined" />
                        <TextField className='w-full' label="Industry:" value={search.industry} onChange={(val) => handleChangeValueSearch("industry", val)} variant="outlined" />
                        <TextField className='w-full' label="Address:" value={search.address} onChange={(val) => handleChangeValueSearch("address", val)} variant="outlined" />
                        <button className='btn btn-primary w-[420px] text-xl' onClick={handleSearchListCompany}>Search</button>
                    </div>
                    <div className='px-10 w-full h-[430px] overflow-hidden'>
                        <TableGeneral headers={headers} body={renderDataTable()} />
                    </div>
                    <div className='mt-2 px-10 flex justify-end'><Pagination onChange={handleChangePanigation} page={page} count={Math.ceil(companies.length / countElementInPage)} color="primary" showFirstButton showLastButton /></div>
                </div>
            </div>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleViewDetailCompany}>
                    <div className='flex'><MdOutlineRemoveRedEye size={25} className='text-primary' /> <div className='w-20 px-4'>Detail</div></div>
                </MenuItem>
                <MenuItem onClick={showModalUpdateCompany}>
                    <div className='flex'><MdEdit size={25} className='text-yellow-700' /> <div className='w-20 px-4'>Update</div></div>
                </MenuItem>
                <MenuItem onClick={handleConfirmDeleteCompany}>
                    <div className='flex'><MdDeleteForever size={25} className='text-red-700' /> <div className='w-20 px-4'>Delete</div></div>
                </MenuItem>
            </Menu>
            <ModalConfirm
                isOpen={isOpenModalConfirmDelete}
                content="Do you want to delete this company?"
                handleConfirm={deleteCompany}
                handleClose={handleCloseModalConfirmDelete} />
            {
                isOpenModalAddCompany && <FormCompany
                    isOpen={isOpenModalAddCompany}
                    idCompany={idCompany}
                    company={company}
                    handleClose={closeModalAddCompany}
                />
            }
        </div>
    )
}

export default ListCompany