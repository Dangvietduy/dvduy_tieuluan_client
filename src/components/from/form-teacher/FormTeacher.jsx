import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import avatar from "../../../assets/avatar.webp";
import { checkEmptyObject, fileToBase64 } from "../../../untils/Ultil";
import * as yup from 'yup';
import TeacherService from '../../../services/TeacherService';
import Loading from '../../../shared/loading/Loading';

const schema = yup.object({
    fullName: yup.string().required("Full name must be required!"),
    email: yup.string().email("Please enter incorrect email format!").required("Email must be required!"),
    dob: yup.string().required("Birthday must be required!"),
    sex: yup.string().required("Gender must be required!"),
    phone: yup.string().required("Phone number must be required!"),
    address: yup.string().required("Address must be required!"),
    specialize: yup.string().required("Specialize must be required!"),
    level: yup.string().required("Level must be required!"),
    salary: yup.string().required("Salary must be required!"),
}).required();

const FormTeacher = ({ isOpen, teacher, handleClose, isUpdateInfo = false }) => {
    useEffect(() => {
        if (isOpen === false) {
            setSrcAvatar(avatar);
        }
    }, [isOpen])
    const isUpdate = !checkEmptyObject(teacher);
    const [isLoading, setIsLoading] = useState(false);
    const [srcAvatar, setSrcAvatar] = useState(avatar);
    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            dob: '',
            phone: '',
            address: '',
            sex: 'male',
            specialize: '',
            level: '',
            salary: '',
            avatar: '',
        },
        resolver: yupResolver(schema)
    });

    const chooseImage = () => {
        document.getElementById('from-teacher-input-file').click();
    }

    const handleChangeAvatar = async (e) => {
        const base = await fileToBase64(e.target.files[0]);
        setSrcAvatar('data:image/png;base64, ' + base);
        setValue("avatar", 'data:image/png;base64, ' + base);
    }

    const onSubmit = (data) => {
        if (isUpdate) {
            updateTeacher(data);
        } else {
            createTeacher(data);
        }
    }

    const createTeacher = async (data) => {
        try {
            setIsLoading(true);
            await TeacherService.createTeacher(data);
            handleClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const updateTeacher = async (data) => {
        try {
            setIsLoading(true);
            await TeacherService.updateTeacher(teacher.id, data);
            handleClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!checkEmptyObject(teacher)) {
            setValue("fullName", teacher.name);
            setValue("email", teacher.email);
            setValue("dob", teacher.birthDay);
            setValue("address", teacher.address);
            setValue("sex", teacher.sex);
            setValue("phone", teacher.phone);
            setValue("level", teacher.level);
            setValue("specialize", teacher.specialize);
            setValue("salary", teacher.salary);
            if (teacher.avatar) {
                setValue("avatar", teacher.avatar);
                setSrcAvatar(teacher.avatar);
            }
        }
    }, [teacher, setValue])

    return (
        <Fragment>
            <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
                <div className='w-full flex flex-col overflow-auto'>
                    <h2 className='modal-from-header mt-5'>{isUpdate ? "Update Teacher" : "Add Teacher"}</h2>
                    <div className='overflow-auto h-full'>
                        <form className='w-full p-6'>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <TextField size='small' className='w-full' label="Full name:" variant="outlined" {...field} />
                                    )}
                                />
                                <p className='text-red-600'>{errors.fullName?.message}</p>
                            </div>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field }) => (
                                        <TextField size='small' className='w-full' label="Email:" variant="outlined" {...field} />
                                    )}
                                />
                                <p className='text-red-600'>{errors.email?.message}</p>
                            </div>
                            <div className='flex gap-4'>
                                <div className='pb-4 w-1/2'>
                                    <Controller
                                        control={control}
                                        name="dob"
                                        render={({ field }) => (
                                            <TextField size='small' className='w-full' InputLabelProps={{ shrink: true }} type="date" label="Birthday:" variant="outlined" {...field} />
                                        )}
                                    />
                                    <p className='text-red-600'>{errors.dob?.message}</p>
                                </div>
                                <div className='pb-4 w-1/2'>
                                    <Controller
                                        control={control}
                                        name="phone"
                                        render={({ field }) => (
                                            <TextField size='small' className='w-full' label="Phone Number:" variant="outlined" {...field} />
                                        )}
                                    />
                                    <p className='text-red-600'>{errors.phone?.message}</p>
                                </div>
                            </div>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="address"
                                    render={({ field }) => (
                                        <TextField size='small' className='w-full' label="Address:" variant="outlined" {...field} />
                                    )}
                                />
                                <p className='text-red-600'>{errors.address?.message}</p>
                            </div>
                            <div className='pb-4'>
                                <Controller
                                    control={control}
                                    name="sex"
                                    render={({ field }) => (
                                        <FormControl size='small'>
                                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                {...field}
                                            >
                                                <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
                                                <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />
                                            </RadioGroup>
                                        </FormControl>
                                    )}
                                />
                                <p className='text-red-600'>{errors.sex?.message}</p>
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="">Avatar:</label>
                                <input type="file" id='from-teacher-input-file' className='hidden' accept="image/png, image/gif, image/jpeg" onChange={handleChangeAvatar} />
                                <img src={srcAvatar} onClick={chooseImage} alt="Avatar Student" width={200} height={300} />
                            </div>
                            <div className='pb-4 w-full'>
                                <Controller
                                    control={control}
                                    name="level"
                                    render={({ field }) => (
                                        <TextField size='small' className='w-full' label="Level:" variant="outlined" {...field} />
                                    )}
                                />
                                <p className='text-red-600'>{errors.level?.message}</p>
                            </div>
                            <div className='flex gap-4'>
                                {!isUpdateInfo && <div className='pb-4 w-full'>
                                    <Controller
                                        control={control}
                                        name="salary"
                                        render={({ field }) => (
                                            <TextField size='small' className='w-full' label="Salary:" variant="outlined" {...field} />
                                        )}
                                    />
                                    <p className='text-red-600'>{errors.salary?.message}</p>
                                </div>}
                                <div className='pb-4 w-full'>
                                    <Controller
                                        control={control}
                                        name="specialize"
                                        render={({ field }) => (
                                            <TextField size='small' className='w-full' label="Specialize:" variant="outlined" {...field} />
                                        )}
                                    />
                                    <p className='text-red-600'>{errors.specialize?.message}</p>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='flex justify-center my-6 gap-5'>
                        <button onClick={handleSubmit(onSubmit)} className="btn btn-primary w-24">{isUpdate ? "Update":"Add"}</button>
                        <button onClick={handleClose} className="btn btn-secondary w-24">Close</button>
                    </div>
                </div>
            </Dialog>
            {isLoading && <Loading />}
        </Fragment>
    )
}

export default FormTeacher;