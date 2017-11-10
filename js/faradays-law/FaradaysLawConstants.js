// Copyright 2014-2017, University of Colorado Boulder

/**
 * Constants used throughout the sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var faradaysLaw = require( 'FARADAYS_LAW/faradaysLaw' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var BULB_POSITION = new Vector2( 190, 244 );

  var FaradaysLawConstants = {
    LAYOUT_BOUNDS: new Bounds2( 0, 0, 834, 504 ), // TODO: These should be adjusted to the new convention.
    BULB_POSITION: BULB_POSITION,
    VOLTMETER_POSITION: BULB_POSITION.minusXY( 0, 165 )
  };

  faradaysLaw.register( 'FaradaysLawConstants', FaradaysLawConstants );

  return FaradaysLawConstants;
} );
