import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DisposalForm.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const DisposalForm = () => {
    const [categories, setCategories] = useState([{ id: 1, name: '', items: [''] }]);
    const [error, setError] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false); // Initialize formSubmitted state
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleCategoryChange = (index, value) => {
        const updatedCategories = [...categories];
        updatedCategories[index].name = value;
        setCategories(updatedCategories);
    };

    const handleItemChange = (categoryIndex, itemIndex, value) => {
        const updatedCategories = [...categories];
        updatedCategories[categoryIndex].items[itemIndex] = value;
        setCategories(updatedCategories);
    };

    const handleAddCategory = () => {
        setCategories([...categories, { id: Date.now(), name: '', items: [''] }]);
    };

    const handleAddItem = (categoryIndex) => {
        const updatedCategories = [...categories];
        updatedCategories[categoryIndex].items.push('');
        setCategories(updatedCategories);
    };

    const handleDisposal = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        const hasEmptyCategory = categories.some(category => category.name === '');
        const hasEmptyItem = categories.some(category => category.items.some(item => item === ''));
        const isDateEmpty = selectedDate === null;

        if (hasEmptyCategory || hasEmptyItem || isDateEmpty) {
            setError('Please select a category, item type, and date and time for all entries.');
        } else {
            setError('');
            // Proceed with your disposal logic
            const formattedDate = selectedDate.toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short'
            });
            // Show toast notification
            toast.success(`Disposal scheduled on ${formattedDate}`);
        }
    };

    return (
        <div>
            <ToastContainer />
            <h2 className='h2'>Biomedical Waste Disposal Form</h2>

            <Form onSubmit={handleDisposal}>
                {categories.map((category, categoryIndex) => (
                    <div key={category.id}>
                        <Form.Group className="mb-3" controlId={`formCategory${categoryIndex}`}>
                            <Form.Label>Item Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={category.name}
                                onChange={(e) => handleCategoryChange(categoryIndex, e.target.value)}>
                                <option value="">Select Item category</option>
                                <option value="chemotherapy">Sharps Waste</option>
                                <option value="radioactive">Radioactive Waste</option>
                                <option value="chemotherapy">Chemotherapy Waste</option>
                                <option value="pathological">Pathological Waste</option>
                                <option value="pharmaceutical">Pharmaceutical Waste</option>
                                <option value="hazardous">Hazardous Waste</option>
                                {/* Add more options as needed */}
                            </Form.Control>
                            {formSubmitted && category.name === '' && <div className="error-message">Please select a category!</div>}
                        </Form.Group>

                        <Button className='mt-3 mr-3 add-more-button' variant="success" onClick={handleAddCategory}>
                            Add More
                        </Button>
                        {category.items.map((item, itemIndex) => (
                            <Form.Group className="mb-3" controlId={`formItemType${categoryIndex}_${itemIndex}`} key={itemIndex}>
                                <Form.Label>Item Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={item}
                                    onChange={(e) => handleItemChange(categoryIndex, itemIndex, e.target.value)}>
                                    <option value="">Select Item type</option>
                                    <option value="syringes">Syringes</option>
                                    <option value="needles">Needles</option>
                                    <option value="ivSet">IV Set</option>
                                    <option value="lancets">Lancets</option>
                                    <option value="medicines">Medicines</option>
                                    {/* Add more options as needed */}
                                </Form.Control>
                                {formSubmitted && item === '' && <div className="error-message">Please select an item type!</div>}

                            </Form.Group>
                        ))}
                        <Button className='mt-3 add-more-button' variant="success" onClick={() => handleAddItem(categoryIndex)}>
                            Add More
                        </Button>
                    </div>
                ))}
                <Form.Group className="mb-3" controlId="formDate">
                    <Form.Label>Date and Time</Form.Label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="form-control"
                        placeholderText="Select Date and Time"
                    />
                    {formSubmitted && selectedDate === null && <div className="error-message">Please select a date and time!</div>}
                </Form.Group>

                <Button className='mt-3 dispose-button schedule-button' variant="primary" type="submit">
                    Schedule Disposal
                </Button>
            </Form>
        </div>
    );
};

export default DisposalForm;
