import React from 'react';
import styles from './PaymentSlip.module.css';
import { FaDownload, FaCheck, FaFilePdf } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PaymentSlip = ({ paymentDetails, bookingDetails }) => {
  const handleDownloadPDF = () => {
    const element = document.getElementById('payment-slip');
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`payment-slip-${paymentDetails.bookingId}.pdf`);
    });
  };

  return (
    <div className={styles.paymentSlipContainer}>
      <div id="payment-slip" className={styles.paymentSlip}>
        <div className={styles.header}>
          <h2>Payment Receipt</h2>
          <div className={styles.status}>
            <FaCheck className={styles.successIcon} />
            <span>Payment Successful</span>
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.row}>
            <span className={styles.label}>Booking ID:</span>
            <span className={styles.value}>{paymentDetails.bookingId}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Transaction Date:</span>
            <span className={styles.value}>
              {new Date().toLocaleString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Payment Method:</span>
            <span className={styles.value}>{paymentDetails.paymentMethod}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Package:</span>
            <span className={styles.value}>{bookingDetails.package.name}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Destination:</span>
            <span className={styles.value}>{bookingDetails.package.destination}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Duration:</span>
            <span className={styles.value}>{bookingDetails.package.duration}</span>
          </div>
        </div>

        <div className={styles.costBreakdown}>
          <h3>Cost Breakdown</h3>
          <div className={styles.row}>
            <span className={styles.label}>Base Amount:</span>
            <span className={styles.value}>₹{bookingDetails.package.price.toLocaleString()}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>GST (18%):</span>
            <span className={styles.value}>₹{(bookingDetails.package.price * 0.18).toLocaleString()}</span>
          </div>
          <div className={styles.totalRow}>
            <span className={styles.label}>Total Amount:</span>
            <span className={styles.value}>₹{(bookingDetails.package.price * 1.18).toLocaleString()}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <p>Thank you for booking with WanderScape!</p>
          <p className={styles.disclaimer}>This is a computer-generated receipt and does not require a physical signature.</p>
        </div>
      </div>

      <button className={styles.downloadButton} onClick={handleDownloadPDF}>
        <FaFilePdf />
        Download Receipt
      </button>
    </div>
  );
};

export default PaymentSlip; 