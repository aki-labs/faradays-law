// Copyright 2018, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const faradaysLaw = require( 'FARADAYS_LAW/faradaysLaw' );
  const FaradaysLawAlertManager = require( 'FARADAYS_LAW/faradays-law/view/FaradaysLawAlertManager' );
  const FaradaysLawConstants = require( 'FARADAYS_LAW/faradays-law/FaradaysLawConstants' );
  const LinearFunction = require( 'DOT/LinearFunction' );
  const MagnetDirectionEnum = require( 'FARADAYS_LAW/faradays-law/model/MagnetDirectionEnum' );
  const Property = require( 'AXON/Property' );
  const timer = require( 'AXON/timer' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const { LEFT, RIGHT } = MagnetDirectionEnum;
  const HALF_MAGNET_WIDTH = FaradaysLawConstants.MAGNET_WIDTH / 2;
  const HALF_MAGNET_HEIGHT = FaradaysLawConstants.MAGNET_HEIGHT / 2;

  class MagnetJumpKeyboardListener {

    constructor( model, options ) {
      options = _.extend( {
        defaultVelocity: 10, // in model coordinates / step
        shiftVelocity: 5,
        fastVelocity: 15,
        onKeydown: e => {},
        onKeyup: e => {}
      }, options );

      const { defaultVelocity, shiftVelocity, fastVelocity } = options;

      // @private
      this.isAnimatingProperty = new BooleanProperty( false );
      this._dragBounds = FaradaysLawConstants.LAYOUT_BOUNDS.erodedXY( HALF_MAGNET_WIDTH, HALF_MAGNET_HEIGHT );
      this._stepDelta = defaultVelocity;

      // @public
      this.model = model;
      this.positionProperty = new Property( model.magnet.positionProperty.get().copy() );
      this.reflectedPositionProperty = new Property( this.positionProperty.get().copy() );
      this.targetPositionVector = new Vector2( 0, 0 );

      // set the target position in response to the magnet's
      const setReflectedPosition = position => {
        const leftX = this._dragBounds.minX;

        let targetX = position.x >= ( this._dragBounds.maxX / 2 ) ? leftX : this._dragBounds.maxX;

        const magnetPathBounds = new Bounds2(
          Math.min( targetX, position.x ),
          position.y,
          Math.max( targetX, position.x ),
          position.y
        ).dilatedXY( HALF_MAGNET_WIDTH - 1, HALF_MAGNET_HEIGHT - 1 );

        const intersectedBounds = model.getIntersectedRestrictedBounds( magnetPathBounds );

        if ( intersectedBounds ) {
          targetX = targetX > leftX ?
                    intersectedBounds.minX - HALF_MAGNET_WIDTH :
                    intersectedBounds.maxX + HALF_MAGNET_WIDTH;
        }

        this.positionProperty.set( position );
        this.reflectedPositionProperty.set( new Vector2( targetX, position.y ) );
      };

      model.magnet.positionProperty.link( setReflectedPosition );


      this.keydown = event => {
        options.onKeydown( event );

        this.isAnimatingProperty.value = false;

        // reset stepDelta
        this._stepDelta = defaultVelocity;

        // set the stepDelta
        switch ( event.domEvent.keyCode ) {
          case 49:
            this._stepDelta = shiftVelocity;
            break;
          case 50:
            this._stepDelta = defaultVelocity;
            break;
          case 51:
            this._stepDelta = fastVelocity;
            break;
          default:
        }
      };

      const speedToText = new LinearFunction( shiftVelocity, fastVelocity, 0, 2, true );

      this.keyup = event => {

        var domEvent = event.domEvent;
        if ( !this.isAnimatingProperty.value ) {
          if ( domEvent.keyCode >= 49 && domEvent.keyCode <= 51) {
            this.targetPositionVector = this.reflectedPositionProperty.get();
            this.isAnimatingProperty.value = true;

            const speed = Util.roundSymmetric( speedToText( this._stepDelta ) );
            const direction = this.getMagnetDirection( this.positionProperty.get().x - this.targetPositionVector.x );
            FaradaysLawAlertManager.magnetSlidingAlert( speed, direction );
          }
        }

        options.onKeyup( event );
      };

      // step the drag listener, must be removed in dispose
      const stepListener = this.step.bind( this );
      timer.addListener( stepListener );

      // @private - called in dispose
      this._disposeKeyboardDragListener = function() {
        timer.removeListener( stepListener );
      };
    }

    step( dt ) {
      const animating = this.isAnimatingProperty.get();

      if ( animating ) {
        if ( !this.positionProperty.get().equals( this.targetPositionVector ) ) {

          const diffX = this.targetPositionVector.x - this.positionProperty.get().x;
          const direction = diffX < 0 ? -1 : 1;

          const deltaVector = new Vector2( Math.min( Math.abs( diffX ), this._stepDelta ) * direction, 0 );

          let newPosition = this.positionProperty.get().plus( deltaVector );

          newPosition = this._dragBounds.closestPointTo( newPosition );

          this.model.moveMagnetToPosition( newPosition );
        } else {
          this.isAnimatingProperty.value = false;
        }
      }
    }

    getMagnetDirection( positionDelta ) {
      return positionDelta > 0 ? LEFT : RIGHT;
    }

    dispose() {
      this._disposeKeyboardDragListener();
    }
  }

  return faradaysLaw.register( 'MagnetJumpKeyboardListener', MagnetJumpKeyboardListener );
} );
