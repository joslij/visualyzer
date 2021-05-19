#!/bin/bash

az deployment sub create --debug -n ${APP_NAME} -l ${LOCATION_NAME} -f main.bicep -p appname=${APP_NAME} location=${LOCATION_NAME} principalId=${PRINCIPAL_ID} jwtPrivateKeyValue="${JWT_PRIVATE_KEY_VALUE}" jwtPublicKeyValue="${JWT_PUBLIC_KEY_VALUE}"