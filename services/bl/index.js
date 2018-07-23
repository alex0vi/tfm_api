'use strict';

const Ru = require('rutils/lib')

module.exports = conf => {

  return Ru.mergeAll([
    require('services/bl/validator'),
    require('services/bl/templatesGenerator')
  ])
}
