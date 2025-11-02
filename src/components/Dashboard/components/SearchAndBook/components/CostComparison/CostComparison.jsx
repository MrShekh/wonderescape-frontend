import React, { useState } from 'react';
import styles from './CostComparison.module.css';
import { FaPlane, FaHotel, FaCar, FaUtensils, FaWallet, FaInfoCircle, FaChartBar } from 'react-icons/fa';

const CostComparison = () => {
  const [comparisons] = useState([
    {
      id: 1,
      destination: 'Manali',
      options: [
        {
          type: 'Budget',
          transportation: 3500,
          accommodation: 8000,
          activities: 5000,
          food: 4000,
          total: 20500,
          description: 'Basic comfort, shared transport, budget hotels'
        },
        {
          type: 'Standard',
          transportation: 6000,
          accommodation: 15000,
          activities: 8000,
          food: 6000,
          total: 35000,
          description: 'Good comfort, private transport, 3-star hotels'
        },
        {
          type: 'Luxury',
          transportation: 12000,
          accommodation: 25000,
          activities: 15000,
          food: 10000,
          total: 62000,
          description: 'Premium comfort, luxury transport, 5-star resorts'
        }
      ]
    }
  ]);

  const getMaxValue = (options, key) => {
    return Math.max(...options.map(option => option[key]));
  };

  const getBarWidth = (value, maxValue) => {
    return (value / maxValue) * 100;
  };

  const getCostIcon = (category) => {
    switch (category) {
      case 'transportation':
        return <FaPlane />;
      case 'accommodation':
        return <FaHotel />;
      case 'activities':
        return <FaChartBar />;
      case 'food':
        return <FaUtensils />;
      default:
        return <FaWallet />;
    }
  };

  return (
    <div className={styles.costComparisonContainer}>
      <div className={styles.comparisonHeader}>
        <h2>Cost Comparison</h2>
        <p>Compare different travel options to find what suits your budget</p>
      </div>

      {comparisons.map((comparison) => (
        <div key={comparison.id} className={styles.comparisonCard}>
          <h3>Travel Options for {comparison.destination}</h3>

          <div className={styles.optionsGrid}>
            {comparison.options.map((option, index) => (
              <div key={index} className={styles.optionCard}>
                <div className={styles.optionHeader}>
                  <h4>{option.type}</h4>
                  <span className={styles.totalCost}>₹{option.total.toLocaleString()}</span>
                </div>
                <p className={styles.optionDescription}>{option.description}</p>

                <div className={styles.costBreakdown}>
                  {Object.entries(option)
                    .filter(([key]) => ['transportation', 'accommodation', 'activities', 'food'].includes(key))
                    .map(([category, cost]) => (
                      <div key={category} className={styles.costItem}>
                        <div className={styles.costLabel}>
                          <span className={styles.costIcon}>{getCostIcon(category)}</span>
                          <span className={styles.categoryName}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </span>
                          <span className={styles.costValue}>₹{cost.toLocaleString()}</span>
                        </div>
                        <div className={styles.costBar}>
                          <div 
                            className={styles.costBarFill}
                            style={{
                              width: `${getBarWidth(cost, getMaxValue(comparison.options, category))}%`,
                              backgroundColor: 
                                option.type === 'Budget' ? '#00b894' :
                                option.type === 'Standard' ? '#f39c12' : '#e74c3c'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {comparisons.length === 0 && (
        <div className={styles.noComparisons}>
          <FaInfoCircle />
          <p>No cost comparisons available at the moment</p>
        </div>
      )}
    </div>
  );
};

export default CostComparison; 