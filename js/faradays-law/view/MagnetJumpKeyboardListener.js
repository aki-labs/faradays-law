// Copyright 2017, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var faradaysLaw = require( 'FARADAYS_LAW/faradaysLaw' );
  var inherit = require( 'PHET_CORE/inherit' );
  var KeyboardUtil = require( 'SCENERY/accessibility/KeyboardUtil' );
  var Property = require( 'AXON/Property' );
  var Timer = require( 'PHET_CORE/Timer' );
  var Vector2 = require( 'DOT/Vector2' );

  function MagnetJumpKeyboardListener( options ) {
    var self = this;

    options = _.extend( {
      positionProperty: null,
      dragBounds: null,
      velocity: 10, // in model coordinates / step
      shiftVelocity: 5,
      onKeydown: null,
      onKeyup: null
    }, options );

    // readyToJump or jKeyPressed

    // @private
    this._onKeydown = options.onKeydown;
    this._onKeyup = options.onKeyup;
    this._isAnimating = false;
    this._dragBounds = options.dragBounds;
    this._boundsCenterX = this._dragBounds.maxX / 2;
    this._velocity = options.velocity;
    this._shiftVelocity = options.shiftVelocity;
    this._shiftKeyPressed = false;
    this._shiftAnimate = false;

    console.log( options.velocity );
    console.log( self._velocity );

    // @public
    this.positionProperty = options.positionProperty;
    this.reflectedPositionProperty = new Property( this.positionProperty.get().copy() );
    this.targetPositionProperty = new Property( this.positionProperty.get().copy() );

    this.positionProperty.link( function() {
      var reflectedPositionVector = self.positionProperty.get().copy();
      reflectedPositionVector.x = self._dragBounds.maxX - reflectedPositionVector.x;
      self.reflectedPositionProperty.set( reflectedPositionVector );
    } );
    

    this.keydown = function( event ) {

      self._isAnimating = false;
      self._shiftAnimate = false;

      if ( self._onKeydown ) {
        self._onKeydown( event );
      }

      if ( event.keyCode === KeyboardUtil.KEY_SHIFT ) {
        this._shiftKeyPressed = true;
      }
    };

    this.keyup = function( event ) {

      if ( event.keyCode === KeyboardUtil.KEY_J ) {
        self._isAnimating = true;
        self.targetPositionProperty.set( this.reflectedPositionProperty.get() );

        if ( self._shiftKeyPressed ) {
          self._shiftAnimate = true;
        }
      }

      if ( event.keyCode === KeyboardUtil.KEY_SHIFT ) {
        self._shiftKeyPressed = false;
      }

      if ( self._onKeyup ) {
        self._onKeyup( event );
      }
    };

    // step the drag listener, must be removed in dispose
    var stepListener = this.step.bind( this );
    Timer.addStepListener( stepListener );

    // @private - called in dispose
    this._disposeKeyboardDragListener = function() {
      Timer.removeStepListener( stepListener );
    };

  }

  faradaysLaw.register( 'MagnetJumpKeyboardListener', MagnetJumpKeyboardListener );

  return inherit( Object, MagnetJumpKeyboardListener, {

    step: function( dt ) {

      if ( this._isAnimating ) {
        if ( !this.positionProperty.get().equals( this.targetPositionProperty.get() ) ) {
          var delta = this._shiftAnimate ? this._shiftVelocity : this._velocity;

          var diffX = this.targetPositionProperty.get().x - this.positionProperty.get().x;
          var direction = diffX < 0 ? -1 : 1;

          // TODO: conditionally set delta based on shift key press
          //  - requires using an object to track other keys pressed on keyup
          delta = Math.min( Math.abs( diffX ), delta ) * direction;

          var newPositionX = this.positionProperty.get().x +  delta;

          this.positionProperty.set( new Vector2( newPositionX, this.positionProperty.get().y ) );
        } else {
          this._isAnimating = false;
          this._shiftAnimate = false;
        }
      }
    },

    dispose: function() {
      this._disposeKeyboardDragListener();
    }
  } );
} );