-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: medicare_db
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKoce3937d2f4mpfqrycbr0l93m` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Japanese multi-national pharmaceutical company','Astellas Pharma'),(2,'Leading global pharmaceutical company','Pfizer'),(3,'Healthcare and pharmaceutical giant','Johnson & Johnson'),(4,'Swiss multinational pharmaceutical company','Novartis'),(5,'Swiss healthcare company focused on diagnostics and pharmaceuticals','Roche'),(6,'American multinational pharmaceutical company','Merck'),(7,'French multinational healthcare and pharmaceutical company','Sanofi'),(8,'British multinational pharmaceutical company','GlaxoSmithKline (GSK)'),(9,'British-Swedish multinational pharmaceutical and biotechnology company','AstraZeneca'),(10,'German multinational pharmaceutical and life sciences company','Bayer'),(11,'American biopharmaceutical company','AbbVie'),(12,'Global biopharmaceutical company','Bristol-Myers Squibb'),(13,'American pharmaceutical company known for its neuroscience and oncology products','Eli Lilly'),(14,'American multinational biopharmaceutical company','Amgen'),(15,'Japanese multinational pharmaceutical company','Takeda'),(16,'Israeli multinational pharmaceutical company','Teva Pharmaceuticals'),(17,'Pharmaceutical company acquired by AbbVie','Allergan'),(18,'American biotechnology company focused on neurological diseases','Biogen'),(19,'American biopharmaceutical company known for antiviral drugs','Gilead Sciences'),(20,'Danish multinational pharmaceutical company known for diabetes treatments','Novo Nordisk');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `medicine_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnodt9bakogrpysvep43i4ekvn` (`medicine_id`),
  KEY `FKg5uhi8vpsuy0lgloxk2h4w5o6` (`user_id`),
  CONSTRAINT `FKg5uhi8vpsuy0lgloxk2h4w5o6` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKnodt9bakogrpysvep43i4ekvn` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicine_symptoms`
--

DROP TABLE IF EXISTS `medicine_symptoms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicine_symptoms` (
  `medicine_id` bigint NOT NULL,
  `symptom_id` bigint NOT NULL,
  KEY `FK1197luxp0fllim157pd3xy7me` (`symptom_id`),
  KEY `FKflr0k4u2lnn150q0s5jaef5qf` (`medicine_id`),
  CONSTRAINT `FK1197luxp0fllim157pd3xy7me` FOREIGN KEY (`symptom_id`) REFERENCES `symptoms` (`id`),
  CONSTRAINT `FKflr0k4u2lnn150q0s5jaef5qf` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicine_symptoms`
--

LOCK TABLES `medicine_symptoms` WRITE;
/*!40000 ALTER TABLE `medicine_symptoms` DISABLE KEYS */;
INSERT INTO `medicine_symptoms` VALUES (1,1);
/*!40000 ALTER TABLE `medicine_symptoms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicines`
--

DROP TABLE IF EXISTS `medicines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicines` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `brand_id` bigint NOT NULL,
  `prescription_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf46rditbup9t1g209vmv9sltg` (`brand_id`),
  KEY `FKrqhwsxfcnuyfqxueeitym2t4w` (`prescription_id`),
  CONSTRAINT `FKf46rditbup9t1g209vmv9sltg` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  CONSTRAINT `FKrqhwsxfcnuyfqxueeitym2t4w` FOREIGN KEY (`prescription_id`) REFERENCES `prescriptions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicines`
--

LOCK TABLES `medicines` WRITE;
/*!40000 ALTER TABLE `medicines` DISABLE KEYS */;
INSERT INTO `medicines` VALUES (1,'Pain reliever','Aspirin',5.95,1,NULL),(2,'Antibiotic used to treat bacterial infections, especially for sore throat','Amoxicillin',12.49,18,1),(3,'Antiviral medicine for treating herpes virus infections','Acyclovir',14.29,19,2),(4,'Antifungal used to treat fungal infections and thrush','Fluconazole',11.99,1,3),(5,'Prescription painkiller used for severe pain relief','Oxycodone',19.98,4,4),(6,'Antidepressant used for treating depression and anxiety','Zoloft',15.99,13,5),(7,'Beta-blocker used for cardiovascular issues like high blood pressure','Metoprolol',8.49,2,6),(8,'Insulin for managing diabetes symptoms and controlling blood sugar','Insulin',20.49,20,7),(9,'Prescription allergy medicine for severe allergic reactions','EpiPen',29.99,17,8),(10,'Neurological medicine for treating migraines and seizures','Topamax',24.49,18,9),(11,'Prescription sleep medicine used for insomnia','Ambien',12.99,12,10),(12,'Pain reliever for headaches and body ache','Aspirin',5.99,10,NULL),(13,'Used to treat fever and pain','Paracetamol',3.99,9,NULL),(14,'Anti-inflammatory medicine for pain and fever','Ibuprofen',6.49,3,NULL),(15,'Antihistamine used to treat allergy-related symptoms','Cetirizine',7.99,7,NULL),(16,'Anti-diarrheal medicine','Loperamide',4.29,4,NULL),(17,'Medicine for stomach pain and acid reflux','Gaviscon',6.29,11,NULL),(18,'Topical pain relief gel for body ache and inflammation','Voltaren Gel',10.49,6,NULL),(19,'Over-the-counter allergy relief','Claritin',8.99,7,NULL),(20,'Cold and allergy medicine for sneezing and runny nose','Benadryl',4.99,5,NULL),(21,'Antacid for stomach pain and indigestion','Tums',3.99,5,NULL);
/*!40000 ALTER TABLE `medicines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_date` datetime(6) NOT NULL,
  `quantity` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `total_price` double NOT NULL,
  `medicine_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKln521vhyd48ksy9jq8esy0hrl` (`medicine_id`),
  KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`),
  CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKln521vhyd48ksy9jq8esy0hrl` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescriptions`
--

DROP TABLE IF EXISTS `prescriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescriptions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescriptions`
--

LOCK TABLES `prescriptions` WRITE;
/*!40000 ALTER TABLE `prescriptions` DISABLE KEYS */;
INSERT INTO `prescriptions` VALUES (1,'Prescription for antibiotic medicines','Antibiotics'),(2,'Prescription for antiviral medicines','Antivirals'),(3,'Prescription for antifungal medicines','Antifungals'),(4,'Prescription for painkillers that require a prescription','Prescription Painkillers'),(5,'Prescription for psychiatric medicines such as antidepressants and anti-anxiety drugs','Psychiatric Medicines'),(6,'Prescription for cardiovascular-related medicines','Cardiovascular Medicines'),(7,'Prescription for diabetes-related medicines','Diabetes Medicines'),(8,'Prescription for strong allergy-related medicines','Prescription Allergy Medicines'),(9,'Prescription for neurological medicines such as for seizures or migraines','Neurological Medicines'),(10,'Prescription for sleep disorder-related medicines','Prescription Sleep Medicines');
/*!40000 ALTER TABLE `prescriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `symptoms`
--

DROP TABLE IF EXISTS `symptoms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `symptoms` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `symptoms`
--

LOCK TABLES `symptoms` WRITE;
/*!40000 ALTER TABLE `symptoms` DISABLE KEYS */;
INSERT INTO `symptoms` VALUES (1,'Symptom for headache','Headache'),(2,'Symptom for fever-related medicines','Fever'),(3,'Symptom for cough-related medicines','Cough'),(4,'Symptom for cold-related medicines','Cold'),(5,'Symptom for allergy-related medicines','Allergy'),(6,'Symptom for fatigue and tiredness-related medicines','Fatigue'),(7,'Symptom for nausea and vomiting-related medicines','Nausea'),(8,'Symptom for sore throat-related medicines','Sore Throat'),(9,'Symptom for body ache and pain-related medicines','Body Ache'),(10,'Symptom for diarrhea-related medicines','Diarrhea'),(11,'Symptom for sleep disorder-related medicines','Insomnia'),(12,'Symptom for stomach pain-related medicines','Stomach Pain'),(13,'Symptom for dizziness or lightheadedness-related medicines','Dizziness'),(14,'Symptom for anxiety-related medicines','Anxiety'),(15,'Symptom for depression-related medicines','Depression');
/*!40000 ALTER TABLE `symptoms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `account_non_expired` bit(1) NOT NULL,
  `account_non_locked` bit(1) NOT NULL,
  `credentials_non_expired` bit(1) NOT NULL,
  `enabled` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'$2a$10$O6QvpODejpuJL2HVo0P6d.JN4NpWULnu0PDWAUaOFsvFOMMeT54i2','ROLE_ADMIN','admin',NULL,NULL,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(2,'$2a$10$0ukk/fV/MJW43e.F7TSU8Ogzgy7bBj.EnGaJB8dk4BHFVb9nnq3RW','ROLE_USER','janedoe',NULL,NULL,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(3,'$2a$10$pjwr980.G8JYbus6kD11kO5GfMmazul6A1Ju/2NhmzMm3eTv/zck6','ROLE_ADMIN','roo1',NULL,NULL,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(4,'$2a$10$3fH8YjJWKYlDNhP7stKbUOKk2WZpvvLQm36fxD8r/OHRowDhWi3KC','ROLE_ADMIN','root',NULL,NULL,_binary '\0',_binary '\0',_binary '\0',_binary '\0');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-18 15:32:57
