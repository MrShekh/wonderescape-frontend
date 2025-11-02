import React, { useState } from 'react';
import styles from './PaymentSystem.module.css';
import { FaCreditCard, FaWallet, FaRupeeSign, FaGift, FaTimes, FaSpinner, FaCheck, FaExclamationTriangle, FaFilePdf, FaEnvelope, FaList, FaQrcode } from 'react-icons/fa';
import PaymentSlip from '../PaymentSlip/PaymentSlip';

/**
 * PaymentSystem Component
 * 
 * Handles unified payments for all booking types (transport, accommodation, activities)
 * Features:
 * - Multiple payment methods
 * - Secure payment processing
 * - Order summary
 * - Promo code application
 */
const PaymentSystem = ({ amount, promoCode, onPromoCodeChange, onPaymentComplete, bookingDetails }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success, failed
  const [showTerms, setShowTerms] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [showUpiOptions, setShowUpiOptions] = useState(false);

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePromoCodeApply = () => {
    // Here you would typically validate the promo code with your backend
    console.log('Applying promo code:', promoCode);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Please accept the Terms & Conditions to proceed');
      return;
    }

    setPaymentStatus('processing');
    
    try {
      // Simulate payment processing with a 2-second delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate payment details
      const details = {
        bookingId: 'BK' + Date.now().toString().slice(-8),
        amount: amount * 1.18, // Include GST
        paymentMethod: selectedMethod,
        cardDetails: selectedMethod === 'Credit Card' || selectedMethod === 'Debit Card' ? cardDetails : null,
        promoCode: promoCode,
        status: 'success',
        timestamp: new Date().toISOString()
      };
      
      setPaymentDetails(details);
      
      // Call the parent component's onPaymentComplete
      onPaymentComplete(details);
      
      // Set success state
      setPaymentStatus('success');
    } catch (error) {
      setPaymentStatus('failed');
    }
  };

  const handleRetry = () => {
    setPaymentStatus('idle');
  };

  const handleClose = () => {
    onPaymentComplete({
      status: 'closed',
      bookingId: null
    });
  };

  const handleUpiSubmit = async () => {
    if (!termsAccepted) {
      alert('Please accept the Terms & Conditions to proceed');
      return;
    }

    setPaymentStatus('processing');
    
    try {
      // Simulate UPI payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate payment details for UPI
      const details = {
        bookingId: 'BK' + Date.now().toString().slice(-8),
        amount: amount * 1.18,
        paymentMethod: 'UPI',
        upiId: upiId,
        status: 'success',
        timestamp: new Date().toISOString()
      };
      
      setPaymentDetails(details);
      onPaymentComplete(details);
      setPaymentStatus('success');
    } catch (error) {
      setPaymentStatus('failed');
    }
  };

  const renderUpiForm = () => (
    <div className={styles.upiForm}>
      <h3>UPI Payment</h3>
      <div className={styles.upiOptions}>
        <div className={styles.qrSection}>
          <FaQrcode className={styles.qrIcon} />
          <p>Scan QR Code to Pay</p>
        </div>
        <div className={styles.orDivider}>OR</div>
        <div className={styles.upiIdSection}>
          <div className={styles.formGroup}>
            <label htmlFor="upiId">Enter UPI ID</label>
            <input
              type="text"
              id="upiId"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="yourname@upi"
              required
            />
          </div>
          <button 
            className={styles.verifyButton}
            onClick={handleUpiSubmit}
            disabled={!upiId || !termsAccepted}
          >
            Verify and Pay
          </button>
        </div>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div className={styles.paymentSystem}>
      <button className={styles.closeButton} onClick={handleClose}>
        <FaTimes />
      </button>
      <div className={styles.paymentMethods}>
        <h3>Select Payment Method</h3>
        <div className={styles.methodGrid}>
          {['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Wallet'].map(method => (
            <div
              key={method}
              className={`${styles.methodCard} ${selectedMethod === method ? styles.selected : ''}`}
              onClick={() => {
                setSelectedMethod(method);
                if (method === 'UPI') {
                  setShowUpiOptions(true);
                } else {
                  setShowUpiOptions(false);
                }
              }}
            >
              {method === 'Credit Card' || method === 'Debit Card' ? (
                <FaCreditCard />
              ) : method === 'Wallet' ? (
                <FaWallet />
              ) : method === 'UPI' ? (
                <FaQrcode />
              ) : (
                <FaRupeeSign />
              )}
              <span>{method}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedMethod && (
        <div className={styles.paymentForm}>
          {selectedMethod === 'UPI' ? (
            renderUpiForm()
          ) : selectedMethod === 'Credit Card' || selectedMethod === 'Debit Card' ? (
            <form onSubmit={handlePaymentSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="number"
                  value={cardDetails.number}
                  onChange={handleCardInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="cardName">Cardholder Name</label>
                <input
                  type="text"
                  id="cardName"
                  name="name"
                  value={cardDetails.name}
                  onChange={handleCardInputChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="expiry">Expiry Date</label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={cardDetails.expiry}
                    onChange={handleCardInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardInputChange}
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className={styles.otherMethod}>
              <p>You will be redirected to complete your payment</p>
            </div>
          )}
        </div>
      )}

      <div className={styles.promoSection}>
        <h3>Have a Promo Code?</h3>
        <div className={styles.promoInput}>
          <FaGift />
          <input
            type="text"
            value={promoCode}
            onChange={(e) => onPromoCodeChange(e.target.value)}
            placeholder="Enter promo code"
          />
          <button onClick={handlePromoCodeApply}>Apply</button>
        </div>
      </div>

      <div className={styles.termsSection}>
        <label className={styles.termsCheckbox}>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <span>I agree to the <button type="button" onClick={() => setShowTerms(true)}>Terms & Conditions</button> and <button type="button" onClick={() => setShowTerms(true)}>Cancellation Policy</button></span>
        </label>
      </div>

      <div className={styles.orderSummary}>
        <h3>Order Summary</h3>
        <div className={styles.summaryItem}>
          <span>Subtotal:</span>
          <span>₹{amount.toLocaleString()}</span>
        </div>
        <div className={styles.summaryItem}>
          <span>Taxes (18%):</span>
          <span>₹{(amount * 0.18).toLocaleString()}</span>
        </div>
        <div className={styles.summaryTotal}>
          <span>Total Amount:</span>
          <span>₹{(amount * 1.18).toLocaleString()}</span>
        </div>
      </div>

      {selectedMethod && !showUpiOptions && (
        <button 
          className={styles.payButton}
          onClick={handlePaymentSubmit}
          disabled={!selectedMethod || !termsAccepted || paymentStatus === 'processing'}
        >
          {paymentStatus === 'processing' ? (
            <>
              <FaSpinner className={styles.spinner} />
              Processing your payment securely...
            </>
          ) : (
            <>
              Pay Now – ₹{(amount * 1.18).toLocaleString()}
            </>
          )}
        </button>
      )}
    </div>
  );

  const renderSuccess = () => (
    <PaymentSlip
      paymentDetails={paymentDetails}
      bookingDetails={bookingDetails}
    />
  );

  const renderFailed = () => (
    <div className={styles.paymentStatus}>
      <button className={styles.closeButton} onClick={handleClose}>
        <FaTimes />
      </button>
      <div className={styles.failedContent}>
        <FaExclamationTriangle className={styles.failedIcon} />
        <h2>Payment Failed</h2>
        <p>Please try again or choose another payment method</p>
        
        <div className={styles.actions}>
          <button className={styles.retryButton} onClick={handleRetry}>
            Try Again
          </button>
          <a href="/support" className={styles.supportLink}>
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {paymentStatus === 'success' ? renderSuccess() :
       paymentStatus === 'failed' ? renderFailed() :
       renderPaymentForm()}
      
      {showTerms && (
        <div className={styles.termsModal}>
          <div className={styles.termsContent}>
            <button className={styles.closeButton} onClick={() => setShowTerms(false)}>
              <FaTimes />
            </button>
            <h2>Terms & Conditions</h2>
            <p>Your terms and conditions content goes here...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentSystem; 