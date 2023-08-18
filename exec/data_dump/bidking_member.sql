-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: i9a706.p.ssafy.io    Database: bidking
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.20.04.1

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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `details` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `zip_code` varchar(5) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT '1',
  `member_role` varchar(10) NOT NULL DEFAULT 'USER',
  `nickname` varchar(10) NOT NULL,
  `password` varchar(60) NOT NULL,
  `penalty` int NOT NULL,
  `phone_number` varchar(11) NOT NULL,
  `user_id` varchar(12) NOT NULL,
  `image_id` bigint DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UK_hh9kg6jti4n1eoiertn2k6qsc` (`nickname`),
  UNIQUE KEY `UK_n2qryhkfoqeel6njfhrcq6k7u` (`phone_number`),
  UNIQUE KEY `UK_a9bw6sk85ykh4bacjpu0ju5f6` (`user_id`),
  KEY `FK8aioimg9ehitsos4op5lk5qjy` (`image_id`),
  CONSTRAINT `FK8aioimg9ehitsos4op5lk5qjy` FOREIGN KEY (`image_id`) REFERENCES `image` (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'2023-08-17 05:34:11','2023-08-17 05:34:11','d','d','44444',1,'USER','sysy','$2a$10$RQu7wL5rn2kCGzflroE4vODnmaoXBF2jix6ztlZ43x1xnF1svKq..',0,'01042811624','sysy',NULL),(2,'2023-08-17 05:34:17','2023-08-17 10:19:12','관악구','서울','12345',1,'USER','zz','$2a$10$nW4srNiBUORvKnyXyrfrQuZV5wOD2tgsOdTVeUx4PCVm0kPIYUlK.',0,'01091522487','jyj2487',37),(3,'2023-08-17 05:34:18','2023-08-17 05:34:18','12345','경기도 의정부시','12345',1,'USER','kimsy7','$2a$10$Oaz25Hn6.KC5QK54tcZdbOxqNDfeJjn0C2jf5PXpbqePhV9GBpGd2',0,'01093801663','kimsy7',NULL),(4,'2023-08-17 05:34:55','2023-08-17 05:34:55','광교호수로','경기도 수원시','16515',1,'USER','다정천사','$2a$10$rt791nLeY5RGarHp/bz68.sxsX.U.gsZYHSu3WyLnb7GJGOE9Kbj2',0,'01023792142','djyun7',NULL),(5,'2023-08-17 05:41:58','2023-08-17 05:41:58','멀티캠퍼스','서울시 강남구 테헤란로','12341',1,'USER','이순신','$2a$10$GctXkn.wG/AGqsI8dkxhK.Zt7JlHvrbbvE6UIcmmT933uh4hcu.Ie',0,'01055143767','ehdgus',NULL),(6,'2023-08-17 06:15:11','2023-08-17 06:15:11','주소 상세 설명','서울 15','32423',1,'USER','난코치야','$2a$10$ByWKEjGwVEQxCNfu4TtHwugxztf0owhLuREOUWF9zJvI0Zr5rqUi.',0,'01023794444','admin',NULL),(7,'2023-08-17 06:39:51','2023-08-17 06:39:51','주소 상세 설명','서울 15','32423',1,'USER','테스트','$2a$10$IY8sllhZc61jBnjG3WLb.OluPLOTXAekb5SqhWu5.vXRZAqbWrJRC',0,'01023795555','test',NULL),(8,'2023-08-17 18:51:50','2023-08-17 18:51:50','멀티캠퍼스 1501','테헤란로','15011',1,'USER','세종대왕','$2a$10$yv8No7o/lM6G9da44bGXluythFRu.HBDdQ3Licn/zVoItseILQbkO',0,'01012341234','wktjralzl',NULL),(9,'2023-08-17 18:52:52','2023-08-17 18:52:52','북구','대구','13579',1,'USER','zzz','$2a$10$c99d6LZy98XZF2Gsd98IXeqZo5v1HDNfFHkS9VoUOh6/1QTk6Jwma',0,'01012345678','yeji',NULL),(10,'2023-08-17 18:54:08','2023-08-17 18:54:08','멀티캠퍼스','서울시 강남구 테헤란로','10152',1,'USER','돈미새','$2a$10$85j6NkhmBgtfKOAsdgSQAOezTvliS0NhYPJmYI6MfQiHiiQZ1Z4Fy',0,'01048951256','tjddyd',NULL),(13,'2023-08-18 00:48:17','2023-08-18 00:48:17','멀티캠퍼스 1501','서울시 강남구 테헤란로','12341',1,'USER','컨설턴트','$2a$10$b82VgUXlgY5YYBHECwEYeuwJQQ.eI1nH09VGkw19HpDJqHwR5Sjmq',0,'01077554122','consultant',NULL),(14,'2023-08-18 00:49:32','2023-08-18 00:49:32','멀티캠퍼스 1501','서울시 강남구 테헤란로','12341',1,'USER','코치1','$2a$10$4VZIkGuCCFlftOfn76RmPe2cm7rIbHCJvyJWOGN5WLRY1Fm8DE.BO',0,'01078945612','coach1',NULL),(15,'2023-08-18 00:50:15','2023-08-18 00:50:15','멀티캠퍼스 1501','서울시 강남구 테헤란로','12341',1,'USER','코치2','$2a$10$yCph1cGonL5beeVFCFEhge.GNC58YE5icSJRnKop.Vaz95W7J093W',0,'01098765432','coach2',NULL),(16,'2023-08-18 02:05:16','2023-08-18 02:14:34','멀티캠퍼스 1501','서울시 강남구 테헤란로','12333',1,'USER','코드마법사','$2a$10$iCi6lrKlhTaDXgFAIR/7GOtf.6sqr60c7MTBhECXy49mUmML.dVwe',0,'01098765400','wizard',150);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18 11:46:21
