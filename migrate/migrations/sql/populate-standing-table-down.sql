START TRANSACTION;

DELETE FROM `api`.`api_endpoints`;
DELETE FROM `users_grants_types`;
DELETE FROM `users_tokens_scopes_types`;

COMMIT;
