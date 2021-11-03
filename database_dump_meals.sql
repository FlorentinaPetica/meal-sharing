CREATE DATABASE  IF NOT EXISTS `meal-sharing`;
USE `meal-sharing`;
--
-- Table structure for table `meals`
--

DROP TABLE IF EXISTS `meals`;
CREATE TABLE `meals` (
  `idmeals` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `number_of_guests` int(11) DEFAULT NULL,
  PRIMARY KEY (`idmeals`)
) ENGINE=InnoDB AUTO_INCREMENT=6;
CREATE TABLE `reservations` (
`id` INT(10) AUTO_INCREMENT PRIMARY KEY,
`number_of_guests` INT(10) NOT NULL,
`meal_id` INT(10) NOT NULL,
`created_date` DATE,
`contact_name` VARCHAR(50),
`contact_email` VARCHAR(100) NOT NULL UNIQUE,
CONSTRAINT fk_reservation FOREIGN KEY (meal_id) REFERENCES meals(idmeals)
ON DELETE CASCADE 
ON UPDATE CASCADE) ENGINE=INNODB;
CREATE TABLE `reviews` (
`id` INT(10) AUTO_INCREMENT PRIMARY KEY,
`title` VARCHAR(100) NOT NULL,
`description` TEXT,
`meal_id` INT(10) NOT NULL,
`stars` INT(10),
`created_date` DATE,
CONSTRAINT fk_review FOREIGN KEY (meal_id) REFERENCES meals(idmeals) 
ON DELETE CASCADE 
ON UPDATE CASCADE) ENGINE=INNODB;

--
-- Dumping data for table `meals`
--

LOCK TABLES `meals` WRITE;
/*!40000 ALTER TABLE `meals` DISABLE KEYS */;
INSERT INTO `meals` VALUES (1,'bla bla bla',3),(2,'bla bla bla',3),(3,'asdasd',7),(4,'benjamins karry',10),(5,'oooooooooo',1);
/*!40000 ALTER TABLE `meals` ENABLE KEYS */;
UNLOCK TABLES;

INSERT INTO reservations(`number_of_guests`, `meal_id`, `created_date`, `contact_name`, `contact_email`)
VALUES(5, 9, '2021-11-01', 'Maria Antoin', 'marie.antoin@gmail.com');
INSERT INTO reservations(`number_of_guests`, `meal_id`, `created_date`, `contact_name`, `contact_email`)
VALUES(20, 9, '2021-11-10', 'Xena Andre', 'xena.andre@gmail.com');
INSERT INTO reviews(`title`, `description`, `meal_id`, `stars`, `created_date`)
VALUES('Best meal ever', 'Cinzia gave a great explanation of the different foods, great instructions and was also warm and welcoming from her kitchen.', 12, 5, '2021-10-10');