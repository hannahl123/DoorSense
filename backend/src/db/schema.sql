-- Create and use the database
CREATE DATABASE IF NOT EXISTS doorsense;

USE doorsense;

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(500) NOT NULL,
    important TINYINT(1) NOT NULL,
    weather TINYINT(1) NOT NULL,
    visitor TINYINT(1) NOT NULL,
    parcel TINYINT(1) NOT NULL,
    reminders TINYINT(1) NOT NULL,
    unread TINYINT(1) NOT NULL,
    date DATE NOT NULL,
    image LONGBLOB,
    PRIMARY KEY (id)
);

-- Create activity table 
CREATE TABLE IF NOT EXISTS activity_log (
    id INT(11) NOT NULL AUTO_INCREMENT,
    activity VARCHAR(255) NOT NULL,
    time DATETIME NOT NULL,
    PRIMARY KEY (id)
);