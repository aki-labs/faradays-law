// Copyright 2014-2017, University of Colorado Boulder

/**
 * Model container for the 'Faradays Law' simulation.
 *
 * @author Vasily Shakhov (MLearner)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Coil = require( 'FARADAYS_LAW/faradays-law/model/Coil' );
  var faradaysLaw = require( 'FARADAYS_LAW/faradaysLaw' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Magnet = require( 'FARADAYS_LAW/faradays-law/model/Magnet' );
  var Vector2 = require( 'DOT/Vector2' );
  var Voltmeter = require( 'FARADAYS_LAW/faradays-law/model/Voltmeter' );

  // constants
  // restricted zones for magnet because of coils
  var TWO_COIL_RESTRICTED_BOUNDS = new Bounds2( 0, 0, 25, 11 );
  var FOUR_COIL_RESTRICTED_BOUNDS = new Bounds2( 0, 0, 55, 11 );

  /**
   * @param {number} width of Screen
   * @param {number} height of Screen
   * @param {Tandem} tandem
   * @constructor
   */
  function FaradaysLawModel( bounds, tandem ) {
    var self = this;

    this.bounds = bounds;

    // @public - Whether the top coil should be shown
    this.showTopCoilProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'showTopCoilProperty' )
    } );

    // @public - true if the magnet arrows should be shown
    this.showMagnetArrowsProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'showMagnetArrowsProperty' )
    } );

    // @public - the magnet which can be dragged
    this.magnet = new Magnet( 647, 219, 140, 30, tandem.createTandem( 'magnet' ) );

    // coils
    this.bottomCoil = new Coil( new Vector2( 448, 328 ), 4, this.magnet );
    this.topCoil = new Coil( new Vector2( 422, 131 ), 2, this.magnet );

    this.restricted = [
      TWO_COIL_RESTRICTED_BOUNDS.shifted( this.topCoil.position.x - 7, this.topCoil.position.y - 76 ),
      TWO_COIL_RESTRICTED_BOUNDS.shifted( this.topCoil.position.x, this.topCoil.position.y + 67 ),
      FOUR_COIL_RESTRICTED_BOUNDS.shifted( this.bottomCoil.position.x - 30, this.bottomCoil.position.y - 76 ),
      FOUR_COIL_RESTRICTED_BOUNDS.shifted( this.bottomCoil.position.x - 23, this.bottomCoil.position.y + 67 )
    ];

    // see this.moveMagnetToPosition method, we use this to calculate magnet position
    this.intersectedBounds = null;

    // moving direction of the magnet when intersecting coils
    this.magnetMovingDirection = null;

    this.voltmeterModel = new Voltmeter( this, tandem.createTandem( 'voltmeterModel' ) );

    //if show second coil and magnet over it, reset magnet
    this.showTopCoilProperty.link( function( showTopCoil ) {
      if ( showTopCoil && self.intersectionWithTopCoil() ) {
        self.magnet.positionProperty.reset();
      }
      self.intersectedBounds = null;
      self.topCoil.reset();
    } );
  }

  faradaysLaw.register( 'FaradaysLawModel', FaradaysLawModel );

  return inherit( Object, FaradaysLawModel, {

    /**
     * @public - restore to initial conditions
     */
    reset: function() {
      this.magnet.reset();
      this.showTopCoilProperty.reset();
      this.showMagnetArrowsProperty.reset();
      this.bottomCoil.reset();
      this.topCoil.reset();
    },

    /**
     * main step function for the model
     * @param {number} dt
     */
    step: function( dt ) {

      // Cap large dt values, which can occur when the tab containing the sim had been hidden and then re-shown
      dt = Math.min( 0.1, dt ); // TODO: is there a setting to do this in Joist?

      // step the individual model elements
      this.bottomCoil.step( dt );
      this.showTopCoilProperty.get() && this.topCoil.step( dt );
      this.voltmeterModel.step( dt );
    },

    /**
     * returns true if magnet intersects coil bounds
     * @returns {boolean}
     * @private
     */
    intersectionWithTopCoil: function() {
      var magnetBounds = Bounds2.point( this.magnet.positionProperty.get() ).dilatedXY( this.magnet.width / 2, this.magnet.height / 2 );
      return magnetBounds.intersectsBounds( this.restricted[ 1 ] ) || magnetBounds.intersectsBounds( this.restricted[ 0 ] );
    },

    /**
     * @param position position of magnet
     */
    moveMagnetToPosition: function( position ) {
      var magnetBounds = new Bounds2(
        Math.min( position.x, this.magnet.positionProperty.get().x ),
        Math.min( position.y, this.magnet.positionProperty.get().y ),
        Math.max( position.x, this.magnet.positionProperty.get().x ),
        Math.max( position.y, this.magnet.positionProperty.get().y )
      ).dilatedXY( this.magnet.width / 2 - 1, this.magnet.height / 2 - 1 );

      // check intersection with any restricted areas if not intersected yet
      if ( this.intersectedBounds === null ) {

        // if first coil not visible, check only second coil restrictions
        for ( var i = this.showTopCoilProperty.get() ? 0 : 2; i < this.restricted.length; i++ ) {
          var restricted = this.restricted[ i ];
          if ( magnetBounds.intersectsBounds( restricted ) ) {

            // extend area so magnet cannot jump through restricted area on other side of it if mouse far enough
            var movingDelta = position.minus( this.magnet.positionProperty.get() );
            this.intersectedBounds = restricted.copy();
            if ( Math.abs( movingDelta.y ) > Math.abs( movingDelta.x ) ) {

              // vertical direction
              if ( movingDelta.y > 0 ) { //bottom
                this.magnetMovingDirection = 'bottom';
                this.intersectedBounds.setMaxY( 3000 );
              }
              else { //top
                this.magnetMovingDirection = 'top';
                this.intersectedBounds.setMinY( -3000 );
              }
            }
            else {

              //horizontal
              if ( movingDelta.x > 0 ) { //right
                this.magnetMovingDirection = 'right';
                this.intersectedBounds.setMaxX( 3000 );
              }
              else { //left
                this.magnetMovingDirection = 'left';
                this.intersectedBounds.setMinX( -3000 );
              }
            }
            break;
          }
        }
      }

      //intersection with any bounds
      if ( this.intersectedBounds && magnetBounds.intersectsBounds( this.intersectedBounds ) ) {
        switch( this.magnetMovingDirection ) {
          case 'bottom' :
            position.y = this.intersectedBounds.y - this.magnet.height / 2;
            break;
          case 'top' :
            position.y = this.intersectedBounds.maxY + this.magnet.height / 2;
            break;
          case 'left' :
            position.x = this.intersectedBounds.maxX + this.magnet.width / 2;
            break;
          case 'right' :
            position.x = this.intersectedBounds.x - this.magnet.width / 2;
            break;
          default:
            throw new Error( 'invalid magnetMovingDirection: ' + this.magnetMovingDirection );
        }
      }
      else {
        this.intersectedBounds = null;

        // out of simulation bounds
        if ( !this.bounds.containsBounds( magnetBounds ) ) {
          position.x = Math.max( Math.min( position.x, this.bounds.maxX - this.magnet.width / 2 ), this.bounds.x + this.magnet.width / 2 );
          position.y = Math.max( Math.min( position.y, this.bounds.maxY - this.magnet.height / 2 ), this.bounds.y + this.magnet.height / 2 );
        }
      }
      this.magnet.positionProperty.set( position );
    }
  } );
} );