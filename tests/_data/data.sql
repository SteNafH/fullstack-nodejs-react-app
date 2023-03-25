-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1
-- ------------------------------------------------------
-- Server version	8.0.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;

--
-- Database: `app`
--

-- ------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products`
(
    `id`   varchar(36) COLLATE utf8_unicode_ci NOT NULL,
    `name` varchar(40) COLLATE utf8_unicode_ci NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_unicode_ci;

-- ------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users`
(
    `id`       varchar(36) COLLATE utf8_unicode_ci  NOT NULL,
    `email`    varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `password` varchar(60) COLLATE utf8_unicode_ci  NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_unicode_ci;

-- ------------------------------------------------------

--
-- Indexing for table `products`
--

ALTER TABLE `products`
    ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexing for table `users`
--

ALTER TABLE `users`
    ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `id_UNIQUE` (`id`),
    ADD UNIQUE KEY `email_UNIQUE` (`email`);

-- ------------------------------------------------------

COMMIT;

-- ------------------------------------------------------

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;

-- Dump completed on 2023-03-20 20:44:12
