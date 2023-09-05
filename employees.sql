SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
CREATE DATABASE IF NOT EXISTS `employees` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `employees`;

DROP TABLE IF EXISTS `employees`;
CREATE TABLE IF NOT EXISTS `employees` (
  `EmployeeID` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Salary` int NOT NULL,
  PRIMARY KEY (`EmployeeID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `employees` (`EmployeeID`, `FirstName`, `LastName`, `Salary`) VALUES
(1, 'Emma', 'Watson', 900000),
(2, 'Michael', 'Johnson', 55000),
(3, 'Christopher', 'Williams', 38000),
(4, 'Emily', 'Davis', 60000),
(5, 'Olivia', 'Smith', 56000),
(6, 'Sophia', 'Brown', 49000);
COMMIT;