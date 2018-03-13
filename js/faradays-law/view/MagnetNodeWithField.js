// Copyright 2014-2017, University of Colorado Boulder

/**
 * Magnet Node with field lines, draggable.
 *
 * @author Vasily Shakhov (MLearner)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var faradaysLaw = require( 'FARADAYS_LAW/faradaysLaw' );
  var FocusHighlightPath = require( 'SCENERY/accessibility/FocusHighlightPath' );
  var inherit = require( 'PHET_CORE/inherit' );
  var KeyboardDragListener = require( 'SCENERY_PHET/accessibility/listeners/KeyboardDragListener' );
  var KeyboardUtil = require( 'SCENERY/accessibility/KeyboardUtil' );
  var MagnetJumpKeyboardListener = require( 'FARADAYS_LAW/faradays-law/view/MagnetJumpKeyboardListener' );
  var MagnetFieldLines = require( 'FARADAYS_LAW/faradays-law/view/MagnetFieldLines' );
  var MagnetNode = require( 'FARADAYS_LAW/faradays-law/view/MagnetNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var MAGNET_ARROW_OPTIONS = {
    fill: 'hsl(120,90%,85%)',
    tailWidth: 10,
    headWidth: 22,
    headHeight: 18
  };
  var MAGNET_ARROW_OFFSET = 10; // how far arrows are from the magnet (for both horizontal and vertical)
  var MAGNET_ARROW_LENGTH = 30;

  /**
   * @param {FaradaysLawModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function MagnetNodeWithField( model, tandem ) {
    var self = this;
    Node.call( this );

    // field lines
    this.addChild( new MagnetFieldLines( model.magnet ) );

    // a11y
    var draggableNodeFocusHighlight = new FocusHighlightPath( new Shape() ); // overridden once the draggableNode is fully constructed

    // the draggable container for the magnet and arrows
    var draggableNode = new Node( 
      {
        cursor: 'pointer',
        tandem: tandem.createTandem( 'draggableNode' ),

        // a11y
        tagName: 'div',
        ariaRole: 'application',
        focusable: true,
        focusHighlightLayerable: true,
        focusHighlight: draggableNodeFocusHighlight
      } );
    this.addChild( draggableNode );
    this.addChild( draggableNodeFocusHighlight );

    // magnet
    this.magnetNode = createMagnetNode( model.magnet );
    draggableNode.addChild( self.magnetNode );

    // magnet reflection
    this.reflectedMagnetNode = createMagnetNode( model.magnet );
    this.addChild( self.reflectedMagnetNode );
    this.reflectedMagnetNode.opacity = 0.5;
    this.reflectedMagnetNode.visible = false;

    var createArrowNode = function( tailX, tailY, tipX, tipY ) {
      var arrowNode = new ArrowNode( tailX, tailY, tipX, tipY, MAGNET_ARROW_OPTIONS );
      arrowNode.touchArea = arrowNode.localBounds.dilated( 6 );
      model.showMagnetArrowsProperty.linkAttribute( arrowNode, 'visible' );
      return arrowNode;
    };
    var magnetTopArrowNode = createArrowNode(
      this.magnetNode.centerX, this.magnetNode.top - MAGNET_ARROW_OFFSET,
      this.magnetNode.centerX, this.magnetNode.top - MAGNET_ARROW_LENGTH - MAGNET_ARROW_OFFSET
    );
    var magnetBottomArrowNode = createArrowNode(
      this.magnetNode.centerX, this.magnetNode.bottom + MAGNET_ARROW_OFFSET,
      this.magnetNode.centerX, this.magnetNode.bottom + MAGNET_ARROW_LENGTH + MAGNET_ARROW_OFFSET
    );
    var magnetRightArrowNode = createArrowNode(
      this.magnetNode.right + MAGNET_ARROW_OFFSET, this.magnetNode.centerY,
      this.magnetNode.right + MAGNET_ARROW_LENGTH + MAGNET_ARROW_OFFSET, this.magnetNode.centerY
    );
    var magnetLeftArrowNode = createArrowNode(
      this.magnetNode.left - MAGNET_ARROW_OFFSET, this.magnetNode.centerY,
      this.magnetNode.left - MAGNET_ARROW_LENGTH - MAGNET_ARROW_OFFSET, this.magnetNode.centerY
    );

    // Show all arrows in a dedicated Node so it can be controlled via PhET-iO
    draggableNode.addChild( new Node( {
      children: [
        magnetTopArrowNode,
        magnetBottomArrowNode,
        magnetRightArrowNode,
        magnetLeftArrowNode
      ]
    } ) );

    // a11y - Update the focusHighlight according to arrow visibility. The dilationCoefficient changes based on the
    // size of the node being highlighted.
    model.showMagnetArrowsProperty.link( function( showMagnetArrows ) {
      var newHighlightShape;
      var dilationCoefficient;
      if ( showMagnetArrows ) {
        dilationCoefficient = FocusHighlightPath.getDilationCoefficient( draggableNode );
        newHighlightShape = Shape.bounds( draggableNode.bounds.dilated( dilationCoefficient ) );
      }
      else {
        dilationCoefficient = FocusHighlightPath.getDilationCoefficient( self.magnetNode );
        newHighlightShape = Shape.bounds( self.magnetNode.bounds.dilated( dilationCoefficient ) );
      }
      draggableNodeFocusHighlight.setShape( newHighlightShape );
    } );

    // handler
    var magnetOffset = new Vector2();
    var dragHandler = new SimpleDragHandler( {

      tandem: tandem.createTandem( 'dragHandler' ),

      // When dragging across it in a mobile device, pick it up
      allowTouchSnag: true,

      start: function( event ) {
        magnetOffset.x = self.globalToParentPoint( event.pointer.point ).x - self.centerX;
        magnetOffset.y = self.globalToParentPoint( event.pointer.point ).y - self.centerY;

        // if the user starts the drag on the magnet itself (not on the arrows), we make the arrows invisible
        if ( event.target !== magnetTopArrowNode &&
             event.target !== magnetBottomArrowNode &&
             event.target !== magnetRightArrowNode &&
             event.target !== magnetLeftArrowNode ) {
          model.showMagnetArrowsProperty.set( false );
        }
      },

      end: function() {

        // arrows always are turned invisible when the user stops dragging the magnet
        model.showMagnetArrowsProperty.set( false );
      },

      // Translate on drag events
      drag: function( event ) {
        var parentPoint = self.globalToParentPoint( event.pointer.point );
        var desiredPosition = parentPoint.minus( magnetOffset );
        model.moveMagnetToPosition( desiredPosition );
      }
    } );
    draggableNode.addInputListener( dragHandler );

    // @private - The sticky drag handler for keyboard navigation
    this.keyboardDragListener = new KeyboardDragListener( {
      start: function() {
        model.showMagnetArrowsProperty.set( false );
      },
      drag: function( vectorDelta ) {
        var newPosition = model.magnet.positionProperty.get().plus( vectorDelta );
        newPosition = model.bounds.closestPointTo( newPosition );
        model.moveMagnetToPosition( newPosition );
      },
      dragBounds: model.bounds
    } );

    draggableNode.addAccessibleInputListener( this.keyboardDragListener );

    this.magnetJumpKeyboardListener = new MagnetJumpKeyboardListener( model.magnet.positionProperty, model, {
      dragBounds: model.bounds,
      onKeydown: function( event ) {
        if ( event.keyCode === KeyboardUtil.KEY_J ) {
          self.reflectedMagnetNode.visible = true;
        }
      },
      onKeyup: function( event ){
        if ( event.keyCode === KeyboardUtil.KEY_J ) {
          self.reflectedMagnetNode.visible = false;
        }
      }
    } );

    draggableNode.addAccessibleInputListener( this.magnetJumpKeyboardListener );

    var setReflectedNodeCenter = function( position ) {
      self.reflectedMagnetNode.center = self.parentToLocalPoint( position );
    };

    // observers
    model.magnet.orientationProperty.link( function() {
      self.magnetNode.detach();
      self.magnetNode = createMagnetNode( model.magnet );
      draggableNode.addChild( self.magnetNode );

      self.reflectedMagnetNode.detach();
      self.reflectedMagnetNode = createMagnetNode( model.magnet );
      self.addChild( self.reflectedMagnetNode );
      self.reflectedMagnetNode.opacity = 0.5;
      self.reflectedMagnetNode.visible = false;
      setReflectedNodeCenter( self.magnetJumpKeyboardListener.targetPositionProperty.get() );
    } );

    model.magnet.positionProperty.linkAttribute( this, 'translation' );

    this.magnetJumpKeyboardListener.reflectedPositionProperty.link( setReflectedNodeCenter );
  }

  /**
   * Creates the magnet node
   * @param {Magnet} magnet
   * @returns {MagnetNode}
   */
  var createMagnetNode = function( magnet ) {
    return new MagnetNode( magnet.orientationProperty.get(), {
      width: magnet.width,
      height: magnet.height,
      showArrows: true
    } );
  };

  faradaysLaw.register( 'MagnetNodeWithField', MagnetNodeWithField );

  return inherit( Node, MagnetNodeWithField, {

    /**
     * Step in time
     * @param {number} dt - elapsed time in seconds
     * @public
     */
    // step: function( dt ) {
    //   this.magnetAccessibleDragHandler.step( dt );
    // }
  } );
} );
