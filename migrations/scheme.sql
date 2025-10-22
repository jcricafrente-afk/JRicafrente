-- Created a 'project' table to store login credentials and roles.
-- Added 'role' column with default value 'user' and 'refresh_token' for session management.
CREATE DATABASE defaultdb;

USE defaultdb;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    refresh_token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password, role) VALUES 
('arie', '2223', 'admin'),
('jem', '0912', 'guest');

SELECT * FROM users;

CREATE TABLE positions (
    position_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    position_code VARCHAR(100) NOT NULL,
    position_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO positions (position_code, position_name) VALUES
('POS001', 'Manager'),
('POS002', 'Assistant'),
('POS003', 'Technician');