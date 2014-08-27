// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model container for the coil in 'Faradays Law' simulation.
 *
 * @author Vasily Shakhov (MLearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Vector2 = require( 'DOT/Vector2' );


  function CoilModel( x, y, N, magnetModel ) {
    var self = this;
    this.s = 1; //sense of magnet = +1 or -1,  simulates flipping of magnet

    PropertySet.call( this, {
      position: new Vector2( x, y ),
      emf: 0, //signal strength in coil = 'electromotive force'
      s: 0
    } );

    magnetModel.flippedProperty.link( function( flipped ) {
      self.s = flipped ? -1 : 1;
    } );

    this.magnetModel = magnetModel;

    //TODO review this model
    this.A = 50; //near-field radius in pixels, set size for transition from B=constant to B=power law
    this.N = N;  //number of turns in coil (equal to half the number of turns in the graphic image)

    this.rTrue = this.position.distanceSquared( magnetModel.position ) / (this.A * this.A);  //normalized distance from magnet to coil,
    // squared for better performance

    this.B = 0; //current value of magnetic field
    this.BLast = 0; //previous value of magnetic field
  }

  return inherit( PropertySet, CoilModel, {
    step: function( dt ) {

      this.rTrue = this.position.distanceSquared( this.magnetModel.position ) / (this.A * this.A);  //normalized distance from coil to magnet

      if ( this.rTrue < 1 ) {  //if magnet is very close to coil, then B field is at max value = 1;
        this.B = this.s * 2;
      }
      else {
        //modified dipole field --  power law of 2 gives better feel than cubic power law
        // formula: B = s *(3 * dx^2 -r^2) / r^4, where
        // s - +-1 - sign for position of magnet
        // r - normalized distance between magner and coil
        // dx - //x-displacement from coil to magnet
        var dx = this.magnetModel.position.x - this.position.x;
        this.B = this.s * (3 * dx * dx - this.rTrue) / (this.rTrue * this.rTrue);
      }

      this.emf = this.N * (this.B - this.BLast) / dt;    //emf = (nbr coils)*(change in B)/(change in t)
      this.BLast = this.B;
    }
  } );
} );