import { Menu, MenuItem, Pagination, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdAdd, MdDeleteForever, MdEdit, MdOutlineMoreHoriz, MdOutlineRemoveRedEye } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import CompanyService from '../../services/CompanyService';
import ModalConfirm from '../../shared/modal_confirm/ModalConfirm';
import TableGeneral from '../../shared/table_general/TableGeneral';

import Loading from '../../shared/loading/Loading';
import ModalAlert from '../../shared/modal-alert/ModalAlert';
import './ListClass.scss';
import { countElementInPage } from '../../constant/Constants';

import FormClass from "../from/form-class/FormClass"
import ClassesService from '../../services/ClassesService';
// const countElementInPage = 10;

const ListClass = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState({ name: "" });
    const [isLoading, setIsLoading] = useState(true);
    const [objAlert, setObjAlert] = useState({ isOpen: false, message: '', type: null });
    const [classLst, setClassLst] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [idClass, setIdClass] = useState(null);
    const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] = useState(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);

    const navigate = useNavigate();

    const handleGetData = async () => {
        try {
            const rs = await ClassesService.getListClass();

            if (rs?.status === 200) {
                const data = rs.data
                setClassLst(data);
            }
        } catch (error) {
            setObjAlert({ isOpen: true, message: error.message, type: "error" });
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        handleGetData();
    }, [isOpenModalAdd]);


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event, id) => {
        setIdClass(id);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseAlert = () => {
        setObjAlert({ isOpen: false, message: '' });
    };

    const showModalAdd = () => {
        handleClose();
        setIsOpenModalAdd(true);
    }

    const showModalUpdate = () => {
        const filterMajor = classLst.find(({ id }) => id === idClass);
        setSelectedClass(filterMajor);
        handleClose();
        setIsOpenModalAdd(true);
    }

    const closeModalAdd = () => {
        setIdClass(null);
        setSelectedClass(null);
        setIsOpenModalAdd(false);
    }

    const handleConfirmDelete = () => {
        handleClose();
        setIsOpenModalConfirmDelete(true);
    }

    const handleChangeValueSearch = (name, value) => {
        setSearch((val) => ({
            ...val,
            [name]: value.target.value
        }));
    }



    const handleViewDetail = () => {
        if (idClass) {
            navigate("/list-class/detail/" + idClass);
        }
    }

    const handleCloseModalConfirmDelete = () => {
        setIsOpenModalConfirmDelete(false);
    }

    const deleteClass = async () => {
        try {
            handleCloseModalConfirmDelete();
            await ClassesService.deleteClass(idClass);
            handleGetData();
            setObjAlert({ isOpen: true, message: "Major Deleted Success!", type: "success" });
        } catch (error) {
            setObjAlert({ isOpen: true, message: "Major Deleted Faill!", type: "error" });
        }
    }

    const headers = ["ID", "Code", "Name", "Major", "Teacher", "Action"];

    const renderDataTable = () => {
        return classLst.slice((page - 1) * countElementInPage, countElementInPage * page).map(item => {
            return {
                id: <span className='font-bold'>{item.id}</span>,
                code: item.code,
                name: item.name,
                major: item.major.name,
                teacher: item.teacher.name,


                status: (
                    <div className='flex justify-center'>
                        <MdOutlineMoreHoriz size={25} className='hover:cursor-pointer hover:bg-gray-400 rounded-full' onClick={(e) => handleClick(e, item.id)} />
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
                    <h2 className='text-white font-bold text-3xl pb-1 pl-5 uppercase'>List Class</h2>
                    <MdAdd onClick={showModalAdd} size={25} className='text-white hover:cursor-pointer hover:bg-gray-200 rounded-full' />
                </div>
                <div className="h-full w-full body-content overflow-hidden">
                    <h4 className='mx-10 border-b border-primary font-bold text-primary text-xl mt-2'>Filter:</h4>
                    <div className='flex gap-5 mt-2 mx-10 mb-5'>
                        <TextField className='w-full' label="Name:" value={search.name} onChange={(val) => handleChangeValueSearch("name", val)} variant="outlined" />
                        <button className='btn btn-primary w-[420px] text-xl' onClick={() => { }}>Search</button>
                    </div>
                    <div className='px-10 w-full h-[430px] overflow-hidden'>
                        <TableGeneral headers={headers} body={renderDataTable()} />
                    </div>
                    <div className='mt-2 px-10 flex justify-end'><Pagination onChange={handleChangePanigation} page={page} count={Math.ceil(classLst.length / countElementInPage)} color="primary" showFirstButton showLastButton /></div>
                </div>
            </div>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleViewDetail}>
                    <div className='flex'><MdOutlineRemoveRedEye size={25} className='text-primary' /> <div className='w-20 px-4'>Detail</div></div>
                </MenuItem>
                <MenuItem onClick={showModalUpdate}>
                    <div className='flex'><MdEdit size={25} className='text-yellow-700' /> <div className='w-20 px-4'>Update</div></div>
                </MenuItem>
                <MenuItem onClick={handleConfirmDelete}>
                    <div className='flex'><MdDeleteForever size={25} className='text-red-700' /> <div className='w-20 px-4'>Delete</div></div>
                </MenuItem>
            </Menu>
            <ModalConfirm
                isOpen={isOpenModalConfirmDelete}
                content="Do you want to delete this selectedClass?"
                handleConfirm={deleteClass}
                handleClose={handleCloseModalConfirmDelete} />
            {
                isOpenModalAdd && <FormClass
                    isOpen={isOpenModalAdd}
                    // idClass={idClass}
                    dataItem={selectedClass ? { ...selectedClass, major: selectedClass.major?.id, teacher: selectedClass.teacher?.id } : null}
                    handleClose={closeModalAdd}
                />
            }
        </div>
    )
}

export default ListClass