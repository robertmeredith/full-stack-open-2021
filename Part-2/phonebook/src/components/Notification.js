import React from 'react';

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }
  if (notification.status === 'success') {
    return <div className="notification success">{notification.message}</div>;
  }
  if (notification.status === 'warning') {
    return <div className="notification warning">{notification.message}</div>;
  }
  if (notification.status === 'danger') {
    return <div className="notification danger">{notification.message}</div>;
  }
};

export default Notification;
