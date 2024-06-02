import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import avatar from "../../../assets/avatar.webp";
import CompanyService from '../../../services/CompanyService';
import Loading from '../../../shared/loading/Loading';
import { checkEmptyObject, fileToBase64 } from "../../../untils/Ultil";

const schema = yup.object({
    name: yup.string().required("Full name must be required!"),
    email: yup.string().email("Please enter incorrect email format!").required("Email must be required!"),
    phone: yup.string().required("Phone number must be required!"),
    industry: yup.string().required("Industry must be required!"),
    address: yup.string().required("Address must be required!"),
}).required();

const FormCompany = ({ isOpen, company, handleClose, isUpdateInfo = false }) => {
    useEffect(() => {
        if (isOpen === false) {
            setSrcAvatar(avatar);
        }
    }, [isOpen])
    const isUpdate = !checkEmptyObject(company);
    const [isLoading, setIsLoading] = useState(false);
    const [srcAvatar, setSrcAvatar] = useState(avatar);
    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            industry: "",
            address: "",
        },
        resolver: yupResolver(schema)
    });

    // const chooseImage = () => {
    //     document.getElementById('from-student-input-file').click();
    // }

    // const handleChangeAvatar = async (e) => {
    //     const base = await fileToBase64(e.target.files[0]);
    //     setSrcAvatar('data:image/png;base64, ' + base);
    //     setValue("avatar", 'data:image/png;base64, ' + base);
    // }

    const onSubmit = (data) => {
        if (isUpdate) {
            updateCompany(data);
        } else {
            creeateCompany(data);
        }
    }

    const creeateCompany = async (data) => {
        try {
            setIsLoading(true);
            await CompanyService.createCompany(data);
            handleClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const updateCompany = async (data) => {
        try {
            setIsLoading(true);
            await CompanyService.updateCompany(company.id, data);
            handleClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!checkEmptyObject(company)) {
            setValue("name", company.name ?? company.name);
            setValue("email", company.email);
            setValue("phone", company.phone);
            setValue("industry", company.industry);
            setValue("address", company.address);
        }
    }, [company, setValue])

    return (
        <Fragment>
            <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
                <div className='w-full flex flex-col overflow-auto'>
                    <h2 className='modal-from-header mt-5'>{isUpdate ? "Update Company" : "Add Company"}</h2>
                    <div className='overflow-auto h-full'>
                        <form className='w-full p-6'>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <TextField error={!!errors.name?.message} size='small' className='w-full' label="Company name:" variant="outlined" {...field} />
                                    )}
                                />
                                <p className='text-red-600'>{errors.name?.message}</p>
                            </div>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field }) => (
                                        <TextField error={!!errors.email?.message} size='small' className='w-full' label="Email:" variant="outlined" {...field} />
                                    )}
                                />
                                <p className='text-red-600'>{errors.email?.message}</p>
                            </div>
                            <div className='flex gap-4'>
                                <div className='pb-4 w-1/2'>
                                    <Controller
                                        control={control}
                                        name="phone"
                                        render={({ field }) => (
                                            <TextField error={!!errors.phone?.message} size='small' className='w-full' label="Phone Number:" variant="outlined" {...field} />
                                        )}
                                    />
                                    <p className='text-red-600'>{errors.phone?.message}</p>
                                </div>
                            </div>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="industry"
                                    render={({ field }) => (
                                        <TextField error={!!errors.industry?.message} size='small' className='w-full' label="Industry:" variant="outlined" {...field} />
                                    )}
                                />
                                <p className='text-red-600'>{errors.industry?.message}</p>
                            </div>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="address"
                                    render={({ field }) => (
                                        <TextField error={!!errors.address?.message} size='small' className='w-full' label="Address:" variant="outlined" {...field} />
                                    )}
                                />
                                <p className='text-red-600'>{errors.address?.message}</p>
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

export default FormCompany;