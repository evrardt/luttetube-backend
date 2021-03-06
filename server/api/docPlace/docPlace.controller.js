'use strict';

var _ = require('lodash');
var DocPlace = require('./docPlace.model');

// Get list of docPlaces
exports.index = function(req, res) {
  DocPlace.find(function (err, docPlaces) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(docPlaces);
  });
};

// Get a single docPlace
exports.show = function(req, res) {
  DocPlace.findById(req.params.id, function (err, docPlace) {
    if(err) { return handleError(res, err); }
    if(!docPlace) { return res.status(404).send('Not Found'); }
    return res.json(docPlace);
  });
};

// Creates a new docPlace in the DB.
exports.create = function(req, res) {
  DocPlace.create(req.body, function(err, docPlace) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(docPlace);
  });
};

// Updates an existing docPlace in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  DocPlace.findById(req.params.id, function (err, docPlace) {
    if (err) { return handleError(res, err); }
    if(!docPlace) { return res.status(404).send('Not Found'); }
    var updated = _.merge(docPlace, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(docPlace);
    });
  });
};

// Deletes a docPlace from the DB.
exports.destroy = function(req, res) {
  DocPlace.findById(req.params.id, function (err, docPlace) {
    if(err) { return handleError(res, err); }
    if(!docPlace) { return res.status(404).send('Not Found'); }
    docPlace.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}