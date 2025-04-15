curl -X POST http://${ipConfig.workspaceIp}:8082/api/v1/auth/register`,
  -H "Content-Type: application/json" \
  -d '{
  "username":"criodo",
  "password":"learnbydoing"
}'
