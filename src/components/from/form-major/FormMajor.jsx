import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, TextField } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import MajorService from '../../../services/MajorService';
import Loading from '../../../shared/loading/Loading';
import { checkEmptyObject } from "../../../untils/Ultil";

const schema = yup.object({
    name: yup.string().required("Full name must be required!"),

}).required();

const FormMajor = ({ isOpen, major, handleClose, isUpdateInfo = false }) => {

    const isUpdate = !checkEmptyObject(major);
    const [isLoading, setIsLoading] = useState(false);

    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: "",

        },
        resolver: yupResolver(schema)
    });



    const onSubmit = (data) => {
        if (isUpdate) {
            updateMajor(data);
        } else {
            createMajor(data);
        }
    }

    const createMajor = async (data) => {
        try {
            setIsLoading(true);
            await MajorService.createMajor(data);
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
            await MajorService.updateMajor(major.id, data);
            handleClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!checkEmptyObject(major)) {
            setValue("name", major.name ?? major.name);

        }
    }, [major, setValue])

    return (
        <Fragment>
            <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
                <div className='w-full flex flex-col overflow-auto'>
                    <h2 className='modal-from-header mt-5'>{isUpdate ? "Update Major" : "Add Major"}</h2>
                    <div className='overflow-auto h-full'>
                        <form className='w-full p-6'>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <TextField error={!!errors.name?.message} size='small' className='w-full' label="Major name:" variant="outlined" {...field} />
                                    )}
                                />
                                <p className='text-red-600'>{errors.name?.message}</p>
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

export default FormMajor;