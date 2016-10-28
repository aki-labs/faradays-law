// Copyright 2014-2015, University of Colorado Boulder

/**
 * Model container for the voltmeter in 'Faradays Law' simulation.
 *
 * @author Vasily Shakhov (MLearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var faradaysLaw = require( 'FARADAYS_LAW/faradaysLaw' );

  // phet-io modules
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );

  // constants
  var ACTIVITY_THRESHOLD = 1E-3; // Used to prevent perpetual oscillation of the needle, value empirically determined.

  /**
   * @param faradaysLawModel - simulation model
   * @constructor
   */
  function VoltmeterModel( faradaysLawModel, tandem ) {

    this.faradaysLawModel = faradaysLawModel;

    this.omega = 0; // angular velocity of needle in rad/sec
    this.alpha = 0; // angular acceleration of needle in rad/s^2
    this.D = 50;  // needle responsiveness
    this.C = 1;   // meter gain
    this.B = 10; // friction coefficient, so needle motion looks realistic

    var properties = {

      // Needle angle in radians. This apparently drives both the needle location and the lightbulb brightness.
      theta: {
        value: 0,
        tandem: tandem.createTandem( 'thetaProperty' ),
        phetioValueType: TNumber( { units: 'radians' } )
      },

      // input voltage to meter
      signal: {
        value: 0,
        //TODO tandem is missing, see https://github.com/phetsims/phet-io/issues/661
        phetioValueType: TNumber( { units: 'volts' } )
      }
    };

    PropertySet.call( this, null, properties );
  }

  faradaysLaw.register( 'VoltmeterModel', VoltmeterModel );

  return inherit( PropertySet, VoltmeterModel, {
    /**
     * voltmeter needle evolution over time
     * @param dt
     */
    step: function( dt ) {

      // Calculate the signal, combining the EMF from both coils.  The multiplier (including the sign thereof) is
      // empirically determined to make the needle move the correct amount and direction.
      this.signal = -0.2 * (this.faradaysLawModel.bottomCoil.emf + this.faradaysLawModel.topCoil.emf);

      this.alpha = this.D * (this.signal - this.C * this.theta) - this.B * this.omega; //angular acceleration of needle
      this.theta = this.theta + this.omega * dt + 0.5 * this.alpha * dt * dt; //angle of needle
      var omegaTemp = this.omega + this.alpha * dt;
      var alphaTemp = this.D * (this.signal - this.C * this.theta) - this.B * omegaTemp;
      this.omega = this.omega + 0.5 * dt * (this.alpha + alphaTemp); //angular velocity

      // Clamp the needle angle when its position, velocity, and acceleration go below a threshold so that it doesn't
      // oscillate forever.
      if ( Math.abs( this.alpha ) !== 0 && Math.abs( this.alpha ) < ACTIVITY_THRESHOLD &&
           Math.abs( this.omega ) !== 0 && Math.abs( this.omega ) < ACTIVITY_THRESHOLD &&
           Math.abs( this.theta ) !== 0 && Math.abs( this.theta ) < ACTIVITY_THRESHOLD ) {
        this.theta = 0;
        this.omega = 0;
        this.alpha = 0;
      }
    }
  } );
} );