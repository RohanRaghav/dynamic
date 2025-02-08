import React, { useState } from 'react';

const testimonials = [
  { title: 'Unified Safety System for Collision Prevention and Hazard Alerts', description: 'Develop an integrated system that combines proximity monitoring and obstacle detection to ensure safe crane operations. Using LIDAR, GPS, ultrasonic sensors, and AI-powered image recognition, the system should prevent collisions by monitoring proximity, defining geofenced hazardous zones, and detecting obstacles in real-time. It should automatically trigger slowdowns or emergency stops and provide alerts to operators to ensure safety.' },
  { title: 'Remote Equipment Monitoring and Predictive Maintenance Dashboard', description: 'Design an IoT-enabled platform that aggregates real-time data from all equipment into a centralized dashboard. The system should monitor metrics such as vibration levels, fuel consumption, operating hours, and temperature while providing predictive maintenance alerts, trend analysis, and historical records.' },
  { title: 'Predictive Maintenance and Consumable Replacement System', description: 'Create an AI-driven system that combines predictive maintenance with consumable monitoring. It should analyze performance data, detect wear patterns, and predict failures in components like brakes, filters, and cables. The system should automatically schedule maintenance and alert teams to consumable replacement needs to reduce downtime and improve efficiency.' },
  { title: 'Drone-Enabled Lift Zone Surveillance and Hazard Detection', description: 'Develop a drone-based system for real-time aerial surveillance of crane lift zones. The drones should relay live video feeds, use AI to detect hazards and obstacles, and assist operators and site managers in planning and executing complex lifts with improved situational awareness.' },
  { title: 'Integrated Diagnostic and Maintenance Management System', description: 'Design a comprehensive system that combines automated pre-operational diagnostics with a digital maintenance logbook. Using IoT sensors, the system should check critical parameters like vibration, fuel levels, and structural integrity before operations. It should also consolidate maintenance records, inspection results, and IoT-collected data into an accessible digital logbook, generating automated reports for real-time insights.' },
  { title: 'Energy Optimization and Remote Monitoring System', description: 'Create an IoT-based system that tracks and optimizes energy and fuel consumption in real-time. By analyzing operational data, the system should identify inefficiencies, provide actionable recommendations for optimization, and issue alerts for refueling or charging to maintain uninterrupted operations.' },
  { title: 'Load Monitoring and Balancing System for Safe Operations', description: 'Develop a system that monitors load parameters, such as weight distribution, radius, wind speed, and stability, during lifting operations. It should provide real-time feedback to operators to ensure safe and balanced lifting and halt operations if unsafe conditions are detected.' },
  { title: 'Web-Based Crane Comparison and Decision Support Platform', description: 'Design a web-based platform for comparing cranes based on operational parameters such as maximum lift capacity, radius, wind tolerance, and speed. The system should also analyze load distribution and provide recommendations for safe lifting operations, ensuring optimal equipment usage.' },
];

const Cards = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleNext = () => {
    if (currentIndex < testimonials.length - 2) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div>
    <div className="testimonials-container">
    <button onClick={handlePrev} className="previous" disabled={currentIndex === 0}>
          &#8592;
        </button>
      <div className="testimonials-wrapper">
        {testimonials.map((testimonial, index) => {
          const position =
            index === currentIndex
              ? "center"
              : index === currentIndex - 1
              ? "left"
              : index === currentIndex + 1
              ? "right"
              : "hidden";

          return (
            <div
              className={`testimonial-card ${position}`}
              key={testimonial.id}
            >
              <p className="feedback">"{testimonial.title}"</p>
              <p className="name"> {testimonial.description}</p>
            </div>
          );
        })}
       
      </div>
      <button
          onClick={handleNext} className="next"
          disabled={currentIndex >= testimonials.length - 2}
        >
         &#8594;
        </button>
    </div>
    </div>
  );
};

export default Cards;
