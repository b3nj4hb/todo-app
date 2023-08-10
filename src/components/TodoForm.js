import React, { useState } from 'react';

const initialFormValues = {
    title: '',
    description: ''
}

const TodoForm = ({ todoAdd }) => {

    const [formValues, setFormValues] = useState(initialFormValues)
    const { title, description } = formValues;
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
        const changedFormValues = {
            ...formValues,
            [e.target.name]: e.target.value
        }
        setFormValues(changedFormValues)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.trim() === '') { // trim para eliminar los espacios en blanco
            setError('Debes indicar un título');
            return;
        }

        if (description.trim() === '') {
            setError('Debes indicar una descripción');
            return;
        }

        // Agregar Tarea
        todoAdd(formValues);
        setFormValues(initialFormValues);
        setSuccessMessage('Agregado con éxito!')

        setTimeout(() => {
            setSuccessMessage(null);
        }, 2000); // 2 segundos en milisegundos

        setError(null);
    }

    return (
        <div>
            <h1>Nueva Tarea</h1>
            <form className='d-grid gap-2' onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Título'
                    className='form-control'
                    value={title}
                    name='title'
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder='Descripción'
                    className='form-control'
                    value={description}
                    name='description'
                    onChange={handleInputChange}
                ></textarea>

                <button
                    className='btn btn-primary'
                >Agregar Tarea
                </button>

            </form>

            {
                error && // muestra el jsx solo si error tiene algun valor, si es falso o nulo no muestra
                (
                    <div className='alert alert-danger mt-2'>
                        {error}
                    </div>
                )
            }

            {
                successMessage &&
                (
                    <div className='alert alert-success mt-2'>
                        {successMessage}
                    </div>
                )
            }

        </div>
    );
}

export default TodoForm;