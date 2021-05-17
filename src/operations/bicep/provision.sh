#!/bin/bash

az deployment sub create -n ${APP_NAME} -l ${LOCATION_NAME} -f main.bicep -p appname=${APP_NAME} location=${LOCATION_NAME} principalId=${PRINCIPAL_ID}