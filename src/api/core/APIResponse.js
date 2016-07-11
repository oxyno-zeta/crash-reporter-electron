/*
 * Author: Alexandre Havrileck (Oxyno-zeta) 
 * Date: 09/07/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const logger = require('../../shared/logger');

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
module.exports = {
	sendResponse: sendResponse,
	sendTextResponse: sendTextResponse,
	getDefaultResponseBody: getDefaultResponseBody
};

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */



/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

/**
 * Send text response.
 * @param response {Object} Response
 * @param text {String} Text
 * @param statusObject {Object} Status object (from APICodes)
 */
function sendTextResponse(response, text, statusObject){
	// Update response
	response.status(statusObject.code);

	// Check status code
	if (statusObject.code === 204){
		// Debug part
		logger.debug(`Answer: Code = ${statusObject.code}`);
		// Send response
		response.end();
	}
	else {
		// Debug part
		logger.debug(`Answer: Code = ${statusObject.code}, Text = ${text}`);
		// Send response
		response.send(text);
	}
}

/**
 * Send response.
 * @param response {Object} Response
 * @param body {Object} Body response
 * @param statusObject {Object} Status object (from APICodes)
 */
function sendResponse(response, body, statusObject){
	// Update response
	response.status(statusObject.code);

	// Check status code
	if (statusObject.code === 204){
		// Debug part
		logger.debug(`Answer: Code = ${statusObject.code}`);
		// Send response
		response.end();
	}
	else {
		// Update body
		body.reason = statusObject.reason;
		// Debug part
		logger.debug(`Answer: Code = ${statusObject.code}, Body = ${JSON.stringify(body)}`);
		// Send response
		response.json(body);
	}
}

/**
 * Return default response body.
 * @returns {{reason: string}}
 */
function getDefaultResponseBody(){
	return {
		reason: ''
	};
}
