/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 05/07/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('./shared/logger')('[Server]');
const api = require('./api/api');
const configurationService = require('./services/configurationService');
const initializeService = require('./services/initializeService');
const app = express();

/* ************************************* */
/* ********        EXPORTS      ******** */
/* ************************************* */

module.exports = {
	prepare: prepare,
	listenSync: listenSync
};

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */



/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

/**
 * Prepare server.
 * @returns {Promise} Promise
 */
function prepare() {
	return new Promise(function (resolve, reject) {
		logger.info('Initialize server...');

		initializeService.run().then(function () {
			logger.info('Preparing server...');

			// Put express application in place
			app.use(logger.middleware.connectLogger());

			// Put security
			app.use(helmet());

			// Parse application/x-www-form-urlencoded
			app.use(bodyParser.urlencoded({extended: false}));

			// Parse application/json
			app.use(bodyParser.json());

			// Put api
			app.use(api.expose());

			resolve();
		}, function (err) {
			logger.error(err);
			reject();
		});
	});
}

/**
 * Listen server.
 */
function listenSync() {
	logger.info(`Server listening on port : ${configurationService.getPort()}`);
	app.listen(configurationService.getPort());
}
