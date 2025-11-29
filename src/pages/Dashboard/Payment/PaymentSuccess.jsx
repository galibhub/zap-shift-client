import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams]=useSearchParams();
    const sessionId=searchParams.get('session_id')

    const axiosSecure=useAxiosSecure();
    console.log(sessionId)

    useEffect(()=>{
if(sessionId){
  axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
  .then(res=>{
    console.log(res.data)
  })

  .catch(error => {
                    console.error('Payment update error:', error)
                })
}
    },[sessionId,axiosSecure])

    return (
        <div className="p-8">
            <h2 className='text-4xl font-bold text-green-600'>Payment Successful! ✓</h2>
            <p className="mt-4">Session ID: {sessionId}</p>
        </div>
    );
};

export default PaymentSuccess;