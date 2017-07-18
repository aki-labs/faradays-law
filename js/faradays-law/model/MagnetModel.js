// Copyright 2014-2015, University of Colorado Boulder

/**
 * Model container for the magnet in 'Faradays Law' simulation.
 *
 * @author Vasily Shakhov (MLearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );
  var faradaysLaw = require( 'FARADAYS_LAW/faradaysLaw' );
  var TVector2 = require( 'DOT/TVector2' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );

  /**
   *
   * @param {number} x - x position of magnet
   * @param {number} y - y position of magnet
   * @param {number} width - width of magnet
   * @param {number} height - height of magnet
   * @param {Tandem} tandem
   * @constructor
   */
  function MagnetModel( x, y, width, height, tandem ) {

    this.width = width;
    this.height = height;

    this.positionProperty = new Property( new Vector2( x, y ), {
      tandem: tandem.createTandem( 'positionProperty' ),
      phetioValueType: TVector2
    } );

    // is the magnet flipped?
    this.flippedProperty = new Property( false, {
      tandem: tandem.createTandem( 'flippedProperty' ),
      phetioValueType: TBoolean
    } );

    // show field lines for magnet
    this.showFieldLinesProperty = new Property( false, {
      tandem: tandem.createTandem( 'showFieldLinesProperty' ),
      phetioValueType: TBoolean
    } );
  }

  faradaysLaw.register( 'MagnetModel', MagnetModel );

  return inherit( Object, MagnetModel, {

    reset: function() {
      this.positionProperty.reset();
      this.flippedProperty.reset();
      this.showFieldLinesProperty.reset();
    }
  } );
} );