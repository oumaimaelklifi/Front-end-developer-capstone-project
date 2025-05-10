import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const BookingForm = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            people: 1,
            date: '',
            time: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            people: Yup.number()
                .min(1, 'At least 1 person required')
                .max(10, 'Maximum 10 people allowed')
                .required('Number of people is required'),
            date: Yup.date()
                .min(new Date(), 'Date cannot be in the past')
                .required('Date is required'),
            time: Yup.string().required('Time is required'),
        }),
        onSubmit: values => {
            console.log('Form submitted', values);
            // Add your form submission logic here
        },
    });

    return (
        <div className="booking-form-container">
            <div className="booking-form">
                <h2>Book a Table</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={formik.errors.name && formik.touched.name ? 'error' : ''}
                        />
                        {formik.errors.name && formik.touched.name && (
                            <div className="error-message">{formik.errors.name}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={formik.errors.email && formik.touched.email ? 'error' : ''}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <div className="error-message">{formik.errors.email}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="people">Number of People:</label>
                        <input
                            id="people"
                            type="number"
                            name="people"
                            min="1"
                            max="10"
                            value={formik.values.people}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={formik.errors.people && formik.touched.people ? 'error' : ''}
                        />
                        {formik.errors.people && formik.touched.people && (
                            <div className="error-message">{formik.errors.people}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <DatePicker
                            id="date"
                            selected={selectedDate}
                            onChange={date => {
                                setSelectedDate(date);
                                formik.setFieldValue('date', date);
                            }}
                            onBlur={formik.handleBlur}
                            minDate={new Date()}
                            dateFormat="MMMM d, yyyy"
                            className={formik.errors.date && formik.touched.date ? 'error' : ''}
                            placeholderText="Select a date"
                        />
                        {formik.errors.date && formik.touched.date && (
                            <div className="error-message">{formik.errors.date}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="time">Time:</label>
                        <input
                            id="time"
                            type="time"
                            name="time"
                            value={formik.values.time}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={formik.errors.time && formik.touched.time ? 'error' : ''}
                        />
                        {formik.errors.time && formik.touched.time && (
                            <div className="error-message">{formik.errors.time}</div>
                        )}
                    </div>

                    <button type="submit" className="submit-btn" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? 'Booking...' : 'Book Table'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;