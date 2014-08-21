// Copyright 2002-2014, University of Colorado Boulder

/**
 * Main entry point for the 'Faradays Law' sim.
 */
define( function( require ) {
  'use strict';

  // modules
  var FaradaysLawScreen = require( 'FARADAYS_LAW/FaradaysLawScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var simTitle = require( 'string!FARADAYS_LAW/faradays-law.name' );

  var simOptions = {
    credits: {}
  };

  SimLauncher.launch( function() {
    //Create and start the sim
    SimLauncher.launch( function() {
      var sim = new Sim( simTitle, [ new FaradaysLawScreen() ], simOptions );
      sim.start();
    } );
  } );
} );