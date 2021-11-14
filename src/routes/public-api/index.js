const { Router } = require('express');
const { forEach } = require('lodash');
const requireDir = require('require-dir');
const logger = require('../../helpers/logger');

module.exports = (router) => {
    forEach(
        requireDir('.', {
            recurse: true
        }),
        (module, name) => {
            logger.info(`Loading ${name} public-api...`);
            router.use(`/${name}`, module(Router()));
        }
    );
    return router;
};