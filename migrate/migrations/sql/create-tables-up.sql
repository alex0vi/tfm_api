START TRANSACTION;
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;



--
-- Table structure for table `api_endpoints`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_endpoints` (
  `url_pattern` varchar(255) NOT NULL,
  `http_method` varchar(45) NOT NULL,
  PRIMARY KEY (`url_pattern`,`http_method`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Table structure for table `users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET latin1 NOT NULL,
  `firstname` varchar(255) CHARACTER SET latin1 NOT NULL,
  `lastname` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `password` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `inserted_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `users_grants_types`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_grants_types` (
  `user_token_scope` varchar(45) NOT NULL,
  `url_pattern` varchar(255) NOT NULL,
  `http_method` varchar(45) NOT NULL,
  PRIMARY KEY (`user_token_scope`,`url_pattern`,`http_method`),
  KEY `fk_users_grants_types_2_idx` (`url_pattern`,`http_method`),
  CONSTRAINT `fk_users_grants_types_api_endpoints` FOREIGN KEY (`url_pattern`, `http_method`) REFERENCES `api_endpoints` (`url_pattern`, `http_method`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_users_grants_types_users_types` FOREIGN KEY (`user_token_scope`) REFERENCES `users_tokens_scopes_types` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users_refresh_tokens`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_refresh_tokens` (
  `id` varchar(45) NOT NULL,
  `user_id` int(11) NOT NULL,
  `expiration_date` datetime DEFAULT NULL,
  `inserted_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_token_scope` varchar(45) NOT NULL,
  `client_id` varchar(255) DEFAULT NULL COMMENT '_DEPRECATED_',
  `version` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `device_account_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`version`,`id`),
  KEY `fk_refresh_tokens_users` (`user_id`),
  KEY `fk_refresh_tokens_1_idx` (`user_token_scope`),
  CONSTRAINT `fk_refresh_tokens_1` FOREIGN KEY (`user_token_scope`) REFERENCES `users_tokens_scopes_types` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_refresh_tokens_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TRIGGER `api`.`refresh_tokens_BEFORE_DELETE` BEFORE DELETE ON `users_refresh_tokens` FOR EACH ROW
BEGIN
	INSERT INTO users_refresh_tokens_blacklist(
		id,
        user_id
    )
    SELECT
		id,
        user_id
	FROM users_refresh_tokens
    WHERE
		id = OLD.id;

END;
--
-- Table structure for table `users_refresh_tokens_blacklist`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_refresh_tokens_blacklist` (
  `id` varchar(45) NOT NULL,
  `user_id` int(11) NOT NULL,
  `inserted_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_refresh_tokens_blacklist_users` (`user_id`),
  CONSTRAINT `fk_refresh_tokens_blacklist_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `users_tokens_scopes_types`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_tokens_scopes_types` (
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

COMMIT;
