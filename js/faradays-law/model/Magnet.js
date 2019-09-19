// Copyright 2014-2019, University of Colorado Boulder

/**
 * Magnet model for the 'Faradays Law' simulation.
 *
 * @author Vasily Shakhov (MLearner)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  // const LinearFunction = require( 'DOT/LinearFunction' );
  // const Range = require( 'DOT/Range' );
  // const Util = require( 'DOT/Util' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const faradaysLaw = require( 'FARADAYS_LAW/faradaysLaw' );
  const FaradaysLawConstants = require( 'FARADAYS_LAW/faradays-law/FaradaysLawConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const OrientationEnum = require( 'FARADAYS_LAW/faradays-law/model/OrientationEnum' );
  const Property = require( 'AXON/Property' );
  const PropertyIO = require( 'AXON/PropertyIO' );
  const StringIO = require( 'TANDEM/types/StringIO' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2Property = require( 'DOT/Vector2Property' );

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