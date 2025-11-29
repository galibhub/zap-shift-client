import React from 'react';
import { Link } from 'react-router-dom';

const PaymentCancelled = () => {
    return (
        <div>
            <h2 className='text-4xl'>Payment is Cancel</h2>
            <Link to='/dashboard/my-parcels'><button className='btn btn-primary text-black'>Try Again</button></Link>
        </div>
    );
};

export default PaymentCancelled;