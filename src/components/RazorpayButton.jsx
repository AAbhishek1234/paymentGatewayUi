import React from 'react';

const RazorpayButton = () => {
    const openRazorpayCheckout = async () => {
        try {
          const response = await fetch('http://localhost:5000/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 500, currency: 'INR', receipt: 'receipt#1' }), // amount in INR
          });
      
          const order = await response.json();
      
          const options = {
            key: 'rzp_test_zMfcQoBM88Nmhb', 
            amount: order.amount * 100, 
            currency: order.currency,
            name: 'Abhasys',
            description: `Pay ₹${order.amount}`,
            order_id: order.id, 
            handler: function (response) {
              alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
            },
            theme: {
              color: '#F37266',
            },
            prefill: {
              name: 'Abhishek',
              email: 'abc@gmail.com',
              contact: '7000000000', 
            },
            modal: {
              ondismiss: function() {
                alert('Payment process dismissed!');
              },
            },
            method: {
              upi: 'auto', 
            },
          };
      
          const rzp = new window.Razorpay(options);
          rzp.open();
        } catch (error) {
          console.error('Failed to create order:', error);
        }
      };
      
  return (
   <button onClick={openRazorpayCheckout}>
      Pay Now
    </button>
  );
};

export default RazorpayButton;
