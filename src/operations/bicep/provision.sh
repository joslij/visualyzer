az deployment sub create --debug -n ${APP_NAME} -l ${REGION} -f main.bicep -p appname=${APP_NAME} location=${REGION} principalId=${CLI_USER_ID}
# Add admin user to Cosmos DB "users" container  