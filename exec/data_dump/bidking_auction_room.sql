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
-- Table structure for table `auction_room`
--

DROP TABLE IF EXISTS `auction_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auction_room` (
  `auction_room_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `auction_live_state` varchar(20) NOT NULL DEFAULT 'BEFORE_LIVE',
  `auction_room_trade_state` varchar(20) NOT NULL DEFAULT 'BEFORE_PROGRESS',
  `auction_room_type` varchar(10) NOT NULL DEFAULT 'COMMON',
  `current_item_order` int DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `started_at` datetime(6) NOT NULL,
  `image_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`auction_room_id`),
  KEY `idx__auction_live_state__auction_room_trade_state__member_id` (`auction_live_state`,`auction_room_trade_state`,`member_id`),
  KEY `FKfslpols3hdochhv6t68h0k14r` (`image_id`),
  KEY `FKg049tbdj05a0x3iodl3wi4ybr` (`member_id`),
  CONSTRAINT `FKfslpols3hdochhv6t68h0k14r` FOREIGN KEY (`image_id`) REFERENCES `image` (`image_id`),
  CONSTRAINT `FKg049tbdj05a0x3iodl3wi4ybr` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auction_room`
--

LOCK TABLES `auction_room` WRITE;
/*!40000 ALTER TABLE `auction_room` DISABLE KEYS */;
INSERT INTO `auction_room` VALUES (1,'2023-08-17 05:36:42','2023-08-17 05:44:05','OFF_LIVE','IN_PROGRESS','COMMON',4,'캘리포니아 애플','2023-08-17 14:51:00.000000',1,2),(2,'2023-08-17 05:42:37','2023-08-17 05:50:37','OFF_LIVE','IN_PROGRESS','COMMON',4,'방탄 굿즈 경매~~ 어서오세요','2023-08-17 15:03:00.000000',5,4),(3,'2023-08-17 05:59:11','2023-08-17 06:08:25','OFF_LIVE','ALL_COMPLETED','COMMON',2,'기절','2023-08-17 15:15:00.000000',9,1),(4,'2023-08-17 06:01:11','2023-08-17 06:21:44','OFF_LIVE','IN_PROGRESS','COMMON',3,'404페이지 디자인 팔아요','2023-08-17 15:10:00.000000',12,3),(5,'2023-08-17 06:01:12','2023-08-17 06:01:12','OFF_LIVE','BEFORE_PROGRESS','COMMON',1,'사격 연습권','2023-08-18 15:00:00.000000',15,5),(6,'2023-08-17 06:02:10','2023-08-17 18:13:02','OFF_LIVE','ALL_COMPLETED','COMMON',1,'싸트북','2023-08-18 03:17:00.000000',17,2),(7,'2023-08-17 06:09:39','2023-08-17 06:10:58','OFF_LIVE','ALL_COMPLETED','COMMON',2,'텀블러 팝니다','2023-08-17 15:11:00.000000',21,5),(8,'2023-08-17 06:13:15','2023-08-17 06:44:10','OFF_LIVE','IN_PROGRESS','COMMON',3,'다정한 라이브','2023-08-17 15:50:00.000000',23,4),(9,'2023-08-17 07:38:32','2023-08-17 07:43:27','OFF_LIVE','ALL_COMPLETED','COMMON',1,'김기절','2023-08-17 16:54:00.000000',26,1),(10,'2023-08-17 07:43:52','2023-08-17 07:45:01','OFF_LIVE','ALL_COMPLETED','COMMON',1,'ㄹㅇㄴㅁ','2023-08-17 16:47:00.000000',29,1),(11,'2023-08-17 09:14:02','2023-08-17 09:14:02','OFF_LIVE','BEFORE_PROGRESS','COMMON',1,'테스트','2023-08-17 18:46:00.000000',31,4),(12,'2023-08-17 09:15:21','2023-08-17 09:16:09','OFF_LIVE','ALL_COMPLETED','COMMON',1,'ㅇㅇㅇ','2023-08-17 18:22:00.000000',33,4),(13,'2023-08-17 10:18:58','2023-08-17 10:18:58','BEFORE_LIVE','BEFORE_PROGRESS','COMMON',1,'감이 간식 팝니다','2023-08-18 19:17:00.000000',35,5),(14,'2023-08-17 10:24:29','2023-08-17 10:35:44','OFF_LIVE','IN_PROGRESS','COMMON',2,'다정이방!!! 들어와 여기야 여기','2023-08-17 19:37:00.000000',38,4),(15,'2023-08-17 11:10:52','2023-08-17 11:11:16','OFF_LIVE','BEFORE_PROGRESS','COMMON',1,'잘 되어라....','2023-08-17 20:21:00.000000',42,4),(16,'2023-08-17 14:16:42','2023-08-17 14:16:42','OFF_LIVE','BEFORE_PROGRESS','COMMON',1,'한정판 명품 가방 경매 들어갑니다~~','2023-08-17 23:20:00.000000',46,4),(17,'2023-08-17 14:16:42','2023-08-17 14:16:42','OFF_LIVE','BEFORE_PROGRESS','COMMON',1,'한정판 명품 가방 경매 들어갑니다~~','2023-08-17 23:20:00.000000',50,4),(18,'2023-08-17 14:16:57','2023-08-17 14:28:13','OFF_LIVE','ALL_COMPLETED','COMMON',2,'한정판 명품 가방 경매 들어갑니다~~','2023-08-17 23:20:00.000000',54,4),(19,'2023-08-17 14:55:31','2023-08-17 14:55:31','OFF_LIVE','BEFORE_PROGRESS','COMMON',1,'안녕하세요','2023-08-17 23:59:00.000000',58,3),(20,'2023-08-17 17:23:39','2023-08-17 17:27:41','OFF_LIVE','IN_PROGRESS','COMMON',3,'testetst','2023-08-18 02:30:00.000000',60,2),(21,'2023-08-17 17:30:30','2023-08-17 17:33:28','OFF_LIVE','IN_PROGRESS','COMMON',4,'레디스 테스트','2023-08-18 02:42:00.000000',63,2),(22,'2023-08-17 18:15:04','2023-08-17 18:17:35','OFF_LIVE','ALL_COMPLETED','COMMON',1,'qq','2023-08-18 03:23:00.000000',67,2),(23,'2023-08-17 18:18:14','2023-08-17 18:18:57','OFF_LIVE','ALL_COMPLETED','COMMON',1,'qwe','2023-08-18 03:25:00.000000',69,2),(24,'2023-08-17 18:19:36','2023-08-17 18:21:26','OFF_LIVE','ALL_COMPLETED','COMMON',1,'qtqtt','2023-08-18 03:26:00.000000',71,2),(25,'2023-08-17 18:25:48','2023-08-17 18:35:49','OFF_LIVE','IN_PROGRESS','COMMON',5,'Samsung Galaxy','2023-08-18 03:40:00.000000',73,2),(26,'2023-08-17 18:40:12','2023-08-17 18:48:08','OFF_LIVE','IN_PROGRESS','COMMON',5,'Galaxy 모음집','2023-08-18 03:51:00.000000',78,2),(27,'2023-08-17 18:56:46','2023-08-17 19:04:04','OFF_LIVE','IN_PROGRESS','COMMON',5,'Samsung Galaxy','2023-08-18 04:05:00.000000',83,9),(28,'2023-08-17 23:59:10','2023-08-18 00:11:53','OFF_LIVE','IN_PROGRESS','COMMON',5,'Galaxy','2023-08-18 09:14:00.000000',88,2),(29,'2023-08-18 00:28:44','2023-08-18 00:36:52','OFF_LIVE','IN_PROGRESS','COMMON',5,'Galaxy','2023-08-18 09:40:00.000000',93,2),(30,'2023-08-18 01:26:53','2023-08-18 02:05:52','BEFORE_LIVE','BEFORE_PROGRESS','COMMON',1,'기프티콘 가져가세요','2023-08-21 18:30:00.000000',98,2),(31,'2023-08-18 01:27:04','2023-08-18 01:27:04','BEFORE_LIVE','BEFORE_PROGRESS','COMMON',1,'루이비통 한정판 에어포스','2023-08-18 14:00:00.000000',103,3),(32,'2023-08-18 01:35:49','2023-08-18 01:35:49','BEFORE_LIVE','BEFORE_PROGRESS','COMMON',1,'치킨 종류별로 다 팔아요','2023-08-18 14:30:00.000000',107,3),(33,'2023-08-18 01:38:57','2023-08-18 01:38:57','BEFORE_LIVE','BEFORE_PROGRESS','COMMON',1,'오늘의 집','2023-08-24 15:37:00.000000',111,2),(35,'2023-08-18 01:53:07','2023-08-18 01:53:07','BEFORE_LIVE','BEFORE_PROGRESS','COMMON',1,'리바이스 제품 팝니다','2023-08-20 14:00:00.000000',123,8),(36,'2023-08-18 01:53:32','2023-08-18 02:05:29','BEFORE_LIVE','BEFORE_PROGRESS','COMMON',1,'코드 마법사들 팬싸인회','2023-08-19 15:51:00.000000',126,2),(37,'2023-08-18 01:54:59','2023-08-18 01:54:59','BEFORE_LIVE','BEFORE_PROGRESS','COMMON',1,'강태공님들 여기 구경 와보세요','2023-08-18 15:00:00.000000',132,3),(38,'2023-08-18 02:01:07','2023-08-18 02:01:07','BEFORE_LIVE','BEFORE_PROGRESS','COMMON',1,'애플 제품 팔아요','2023-08-26 10:57:00.000000',136,8),(39,'2023-08-18 02:01:09','2023-08-18 02:01:09','BEFORE_LIVE','BEFORE_PROGRESS','COMMON',1,'게이밍 모니터 팔아요. 프로게이머용 입니다.','2023-08-18 15:00:00.000000',140,3),(40,'2023-08-18 02:11:39','2023-08-18 02:11:39','BEFORE_LIVE','BEFORE_PROGRESS','COMMON',1,'Samsung Galaxy','2023-08-18 15:09:00.000000',145,16),(41,'2023-08-18 02:17:57','2023-08-18 02:17:57','BEFORE_LIVE','BEFORE_PROGRESS','COMMON',1,'화장품 팝니다!! 한번만 사용했어요 (거의 새거)','2023-08-18 14:55:00.000000',151,4);
/*!40000 ALTER TABLE `auction_room` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18 11:46:18