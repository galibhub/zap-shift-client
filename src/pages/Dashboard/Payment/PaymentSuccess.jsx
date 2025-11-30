import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo,setPaymentInfo]=useState({})
  const sessionId = searchParams.get("session_id");

  const axiosSecure = useAxiosSecure();
  console.log(sessionId);


  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId:res.data.transactionId,
            trackingId:res.data.trackingId
          })
        })

        .catch((error) => {
          console.error("Payment update error:", error);
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold text-green-600">
        Payment Successful! ✓
      </h2>
      <p className="mt-4">Transaction ID: {paymentInfo.transactionId}</p>
      <p className="mt-4"> ParcelTracking ID: {paymentInfo.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
