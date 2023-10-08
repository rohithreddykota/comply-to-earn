import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DisposalForm.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider, Connex } from '@vechain/web3-providers-connex'

// connexObj is an instance of Connex
const provider = new Provider({connex: new Connex.Thor({
    node: 'http://localhost:8545'
})})
const balance = await provider.request({ 
  method: 'eth_getBalance', 
  params: ['0x...'] 
})


const thor = new Connex.Thor({
    node: 'http://localhost:8545'
})

const DisposalForm = () => {
    const [categories, setCategories] = useState([{ id: 1, name: '', items: [''] }]);
    const [error, setError] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false); // Initialize formSubmitted state
    const [selectedDate, setSelectedDate] = useState(null);
    const [address, setAddress] = useState({
        zipcode: '',
        street: '',
        country: '',
        state: '',
    });
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
    // Address form handlers
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
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

        if (hasEmptyCategory || hasEmptyItem) {
            setError('Please select a category and item type for all entries.');
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
                timeZoneName: 'short',
            });

            const fullAddress = `${address.street}, ${address.zipcode}, ${address.state}, ${address.country}`;
            toast.success(`Disposal scheduled on ${formattedDate} at ${fullAddress}`);
        }

    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">

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
                        <div className="col-md-4">
                            <div className="address-form">
                                <Form.Group className="mb-3 custom-zipcode" controlId="formZipcode">
                                    <Form.Label>Zipcode</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Zipcode"
                                        name="zipcode"
                                        value={address.zipcode}
                                        onChange={handleAddressChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3 custom-street" controlId="formStreet">
                                    <Form.Label>Street Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Street Name"
                                        name="street"
                                        value={address.street}
                                        onChange={handleAddressChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3 custom-country" controlId="formCountry">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Country"
                                        name="country"
                                        value={address.country}
                                        onChange={handleAddressChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3 custom-state" controlId="formState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter State"
                                        name="state"
                                        value={address.state}
                                        onChange={handleAddressChange}
                                    />
                                </Form.Group>

                            </div>
                        </div>
                        <Button className='mt-3 dispose-button schedule-button' variant="primary" type="submit">
                            Schedule Disposal
                        </Button>
                    </Form>
                </div>
            </div>

        </div >
    );
};

export default DisposalForm;
