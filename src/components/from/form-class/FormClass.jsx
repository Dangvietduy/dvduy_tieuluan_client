import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import MajorService from '../../../services/MajorService';

import Loading from '../../../shared/loading/Loading';
import { checkEmptyObject } from "../../../untils/Ultil";
import ClassesService from '../../../services/ClassesService';
import TeacherService from '../../../services/TeacherService';

const schema = yup.object({
    name: yup.string().required("Full name must be required!"),

}).required();

const FormClass = ({ isOpen, dataItem, handleClose, isUpdateInfo = false }) => {

    const isUpdate = !checkEmptyObject(dataItem);
    const [isLoading, setIsLoading] = useState(false);

    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            code: "",
            name: "",
            major: "",
            teacher: "",

        },
        resolver: yupResolver(schema)
    });



    const onSubmit = (data) => {
        if (isUpdate) {
            updateMajor(data);
        } else {
            createNew(data);
        }
    }

    const createNew = async (data) => {
        try {
            setIsLoading(true);
            console.log(data)
            let dataToPost = data;

            dataToPost["majorId"] = data.major
            dataToPost["teacherId"] = data.teacher

            delete dataToPost.teacher

            delete dataToPost.major


            await ClassesService.createClass(dataToPost);
            handleClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const updateMajor = async (data) => {
        try {
            setIsLoading(true);
            await ClassesService.updateClass(dataItem.id, data);
            handleClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!checkEmptyObject(dataItem)) {
            setValue("code", dataItem.code);
            setValue("name", dataItem.name);
            setValue("major", dataItem.major);
            setValue("teacher", dataItem.teacher);


        }
    }, [dataItem, setValue])



    const [majorLst, setMajorLst] = useState([]);
    const [teacherLst, setTeacherLst] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let rs = await MajorService.getListMajor();
                setMajorLst(rs.data);
                rs = await TeacherService.getListTeacher();
                setTeacherLst(rs.data);
            } catch (error) {
                console.error('Error fetching class list:', error);
            }
        };
        fetchData();
    }, []);
    return (


        <Fragment>
            <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
                <div className='w-full flex flex-col overflow-auto'>
                    <h2 className='modal-from-header mt-5'>{isUpdate ? "Update Class" : "Add Class"}</h2>
                    <div className='overflow-auto h-full'>
                        <form className='w-full p-6'>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="code"
                                    render={({ field }) => (
                                        <TextField error={!!errors.code?.message} size='small' className='w-full' label="Code:" variant="outlined" {...field} />
                                    )}
                                />
                                <p className='text-red-600'>{errors.code?.message}</p>
                            </div>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <TextField error={!!errors.name?.message} size='small' className='w-full' label="Name :" variant="outlined" {...field} />
                                    )}
                                />
                                <p className='text-red-600'>{errors.name?.message}</p>
                            </div>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="major"
                                    render={({ field }) => (<>

                                        <Select

                                            disabled={isUpdateInfo} error={!!errors.major?.message} size='small' className='w-full'
                                            label="Major"
                                            variant="outlined" {...field}>

                                            {Array.isArray(majorLst) && majorLst.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </>

                                    )}
                                />
                                <p className='text-red-600'>{errors.major?.message}</p>
                            </div>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="teacher"
                                    render={({ field }) => (<>


                                        <Select

                                            disabled={isUpdateInfo} error={!!errors.teacher?.message}
                                            label="Teacher"
                                            size='small'
                                            className='w-full'
                                            variant="outlined" {...field}>

                                            {Array.isArray(teacherLst) && teacherLst.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                            ))}
                                        </Select>

                                    </>

                                    )}
                                />
                                <p className='text-red-600'>{errors.teacher?.message}</p>
                            </div>
                        </form>
                    </div>
                    <div className='flex justify-center my-6 gap-5'>
                        <button onClick={handleSubmit(onSubmit)} className="btn btn-primary w-24">{isUpdate ? "Update" : "Add"}</button>
                        <button onClick={handleClose} className="btn btn-secondary w-24">Close</button>
                    </div>
                </div>
            </Dialog>
            {isLoading && <Loading />}
        </Fragment>
    )
}

export default FormClass;