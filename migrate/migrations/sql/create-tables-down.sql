START TRANSACTION;

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `users_grants_types`;
DROP TABLE IF EXISTS `api_endpoints`;
DROP TABLE IF EXISTS `users_refresh_tokens`;
DROP TABLE IF EXISTS `users_refresh_tokens_blacklist`;
DROP TABLE IF EXISTS `users_tokens_scopes_types`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS=1;

COMMIT;
