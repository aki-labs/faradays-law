// Copyright 2014-2019, University of Colorado Boulder

/**
 * Magnet model for the 'Faradays Law' simulation.
 *
 * @author Vasily Shakhov (MLearner)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  // var LinearFunction = require( 'DOT/LinearFunction' );
  // var Range = require( 'DOT/Range' );
  // var Util = require( 'DOT/Util' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var faradaysLaw = require( 'FARADAYS_LAW/faradaysLaw' );
  var FaradaysLawConstants = require( 'FARADAYS_LAW/faradays-law/FaradaysLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var OrientationEnum = require( 'FARADAYS_LAW/faradays-law/model/OrientationEnum' );
  var Property = require( 'AXON/Property' );
  var PropertyIO = require( 'AXON/PropertyIO' );
  var StringIO = require( 'TANDEM/types/StringIO' );
  var Vector2 = require( 'DOT/Vector2' );
  var Vector2Property = require( 'DOT/Vector2Property' );

  // constants
  // var DIAGONAL_TOLERANCE = Math.PI / 8;

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function Magnet( tandem ) {

    // @public {number} - width of the magnet
    this.width = FaradaysLawConstants.MAGNET_WIDTH;

    // @public {number} - height of the magnet
    this.height = FaradaysLawConstants.MAGNET_HEIGHT;

    // @public - position of the magnet
    this.positionProperty = new Vector2Property( new Vector2( 647, 219 ), {
      tandem: tandem.createTandem( 'positionProperty' ),
      phetioDocumentation: 'The location of the center of the bar magnet in view coordinates',
      phetioHighFrequency: true
    } );

    // @public {BooleanProperty} - true if the magnet is flipped
    this.orientationProperty = new Property( OrientationEnum.NS, {
      validValues: OrientationEnum.values,
      tandem: tandem.createTandem( 'orientationProperty' ),
      phetioDocumentation: 'The direction the bar magnet is oriented',
      phetioType: PropertyIO( StringIO ) // Should we create OrientationEnumIO?
    } );

    // @public {BooleanProperty} - show field lines for magnet
    this.fieldLinesVisibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'fieldLinesVisibleProperty' ),
      phetioDocumentation: 'True if the field lines are visible'
    } );
  }

  faradaysLaw.register( 'Magnet', Magnet );

  return inherit( Object, Magnet, {

    /**
     * Restore the initial conditions
     * @public
     */
    reset: function() {
      this.positionProperty.reset();
      this.orientationProperty.reset();
      this.fieldLinesVisibleProperty.reset();
    }
  } );
} );