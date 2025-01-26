import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewOrder } from '@/store/shop/order-slice';
import { useToast } from '@/components/ui/use-toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51QkAr4GBiPgQP6hyWb7YzN6HWndDRkzJy8br23yzzJS9ZBWchKEgnNo2mutnY3Dt6NrGF1SSamUAeBmBsj0ujCS900izKkeamc");

function PaymentForm({ totalCartAmount, cartItems, user, currentSelectedAddress }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    if (cartItems.items.length === 0) {
      toast({
        title: "Your cart is empty",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    const orderData = {
      userId: user._id,
      cartItems: cartItems.items,
      addressInfo: currentSelectedAddress,
      orderStatus: "Pending",
      paymentMethod,
      paymentStatus: "Pending",
      totalAmount: totalCartAmount,
      orderDate: new Date().toISOString(),
      orderUpdateDate: new Date().toISOString(),
    };

    if (paymentMethod === 'COD') {
      dispatch(createNewOrder(orderData))
        .unwrap()
        .then((response) => {
          if (response.success) {
            toast({
              title: "Order placed successfully",
              variant: "success",
            });
            navigate('/shop/order-success', { state: { order: response.order } });
          } else {
            toast({
              title: "Failed to place order",
              variant: "destructive",
            });
          }
        })
        .catch((error) => {
          toast({
            title: "An error occurred",
            description: error.message,
            variant: "destructive",
          });
        })
        .finally(() => {
          setIsProcessing(false);
        });
    } else if (paymentMethod === 'Stripe') {
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        toast({
          title: "Stripe error",
          description: error.message,
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      orderData.paymentMethodId = stripePaymentMethod.id;

      dispatch(createNewOrder(orderData))
        .unwrap()
        .then((response) => {
          if (response.success) {
            toast({
              title: "Order placed successfully",
              variant: "success",
            });
            navigate('/shop/order-success', { state: { order: response.order } });
          } else {
            toast({
              title: "Failed to place order",
              variant: "destructive",
            });
          }
        })
        .catch((error) => {
          toast({
            title: "An error occurred",
            description: error.message,
            variant: "destructive",
          });
        })
        .finally(() => {
          setIsProcessing(false);
        });
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Payment</h1>
      <div style={styles.radioGroup}>
        <label style={styles.radioLabel}>
          <input
            type="radio"
            value="COD"
            checked={paymentMethod === 'COD'}
            onChange={() => setPaymentMethod('COD')}
            style={styles.radioInput}
          />
          Cash on Delivery
        </label>
        <label style={styles.radioLabel}>
          <input
            type="radio"
            value="Stripe"
            checked={paymentMethod === 'Stripe'}
            onChange={() => setPaymentMethod('Stripe')}
            style={styles.radioInput}
          />
          Pay with Stripe
        </label>
      </div>
      {paymentMethod === 'Stripe' && (
        <CardElement style={styles.cardElement} />
      )}
      <button onClick={handlePayment} disabled={isProcessing} style={styles.button}>
        {isProcessing ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  );
}

function PaymentPage() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        totalCartAmount={totalCartAmount}
        cartItems={cartItems}
        user={user}
        currentSelectedAddress={currentSelectedAddress}
      />
    </Elements>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  radioGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
  },
  radioInput: {
    marginRight: '10px',
  },
  cardElement: {
    marginBottom: '20px',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default PaymentPage;
