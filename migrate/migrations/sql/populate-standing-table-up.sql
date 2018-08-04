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
-- Insert data for table `api_endpoints`
--

LOCK TABLES `api_endpoints` WRITE;
/*!40000 ALTER TABLE `api_endpoints` DISABLE KEYS */;
INSERT INTO `api_endpoints` VALUES ('/favicon','GET'),('/forgotPassword','POST'),('/session','POST'),('/session/facebook','POST'),('/session/guest_mode_session','GET'),('/signup','POST'),('/signup/facebook','POST'),('/token','POST'),('/token/:id','DELETE'),('/user','GET'),('/user','PATCH'),('/user/password','PUT');
/*!40000 ALTER TABLE `api_endpoints` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Insert data for table `users_grants_types`
--

LOCK TABLES `users_grants_types` WRITE;
/*!40000 ALTER TABLE `users_grants_types` DISABLE KEYS */;
INSERT INTO `users_grants_types` VALUES ('GUEST','/favicon','GET'),('LOGED_IN','/favicon','GET'),('GUEST','/forgotPassword','POST'),('LOGED_IN','/forgotPassword','POST'),('GUEST','/session','POST'),('LOGED_IN','/session','POST'),('GUEST','/session/facebook','POST'),('LOGED_IN','/session/facebook','POST'),('GUEST','/session/guest_mode_session','GET'),('LOGED_IN','/session/guest_mode_session','GET'),('GUEST','/signup','POST'),('LOGED_IN','/signup','POST'),('GUEST','/signup/facebook','POST'),('LOGED_IN','/signup/facebook','POST'),('LOGED_IN','/token','POST'),('LOGED_IN','/token/:id','DELETE'),('LOGED_IN','/user','GET'),('LOGED_IN','/user','PATCH'),('LOGED_IN','/user/password','PUT');
/*!40000 ALTER TABLE `users_grants_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Insert data for table `users_tokens_scopes_types`
--

LOCK TABLES `users_tokens_scopes_types` WRITE;
/*!40000 ALTER TABLE `users_tokens_scopes_types` DISABLE KEYS */;
INSERT INTO `users_tokens_scopes_types` VALUES ('GUEST'),('LOGED_IN');
/*!40000 ALTER TABLE `users_tokens_scopes_types` ENABLE KEYS */;
UNLOCK TABLES;



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

COMMIT;
