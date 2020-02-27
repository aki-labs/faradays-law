// Copyright 2014-2019, University of Colorado Boulder

/**
 * Scene graph for the 'Faradays Law' screen.
 *
 * @author Vasily Shakhov (MLearner)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import inherit from '../../../../phet-core/js/inherit.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import faradaysLaw from '../../faradaysLaw.js';
import FaradaysLawA11yStrings from '../../FaradaysLawA11yStrings.js';
import FaradaysLawConstants from '../FaradaysLawConstants.js';
import BulbNode from './BulbNode.js';
import CircuitDescriptionNode from './CircuitDescriptionNode.js';
import CoilNode from './CoilNode.js';
import CoilsWiresNode from './CoilsWiresNode.js';
import CoilTypeEnum from './CoilTypeEnum.js';
import ControlPanelNode from './ControlPanelNode.js';
import MagnetNodeWithField from './MagnetNodeWithField.js';
import VoltmeterAndWiresNode from './VoltmeterAndWiresNode.js';

// a11y strings
const summaryDescriptionString = FaradaysLawA11yStrings.summaryDescription.value;
const moveMagnetToPlayString = FaradaysLawA11yStrings.moveMagnetToPlay.value;

/**
 * @param {FaradaysLawModel} model - Faraday's Law simulation model object
 * @param {Tandem} tandem
 * @constructor
 */
function FaradaysLawScreenView( model, tandem ) {

  const summaryNode = new Node();

  ScreenView.call( this, {
    layoutBounds: FaradaysLawConstants.LAYOUT_BOUNDS,
    screenSummaryContent: summaryNode
  } );

  // screen Summary
  summaryNode.addChild( new Node( { tagName: 'p', innerContent: summaryDescriptionString } ) );
  summaryNode.addChild( new Node( { tagName: 'p', innerContent: moveMagnetToPlayString } ) );

  this.pdomPlayAreaNode.addChild( new CircuitDescriptionNode( model ) );

  // coils
  const bottomCoilNode = new CoilNode( CoilTypeEnum.FOUR_COIL, {
    x: model.bottomCoil.position.x,
    y: model.bottomCoil.position.y
  } );

  const topCoilNode = new CoilNode( CoilTypeEnum.TWO_COIL, {
    x: model.topCoil.position.x,
    y: model.topCoil.position.y
  } );

  // @public {Vector2[]}
  this.bottomCoilEndPositions = {
    topEnd: bottomCoilNode.endRelativePositions.topEnd.plus( model.bottomCoil.position ),
    bottomEnd: bottomCoilNode.endRelativePositions.bottomEnd.plus( model.bottomCoil.position )
  };

  // @public {Vector2[]}
  this.topCoilEndPositions = {
    topEnd: topCoilNode.endRelativePositions.topEnd.plus( model.topCoil.position ),
    bottomEnd: topCoilNode.endRelativePositions.bottomEnd.plus( model.topCoil.position )
  };

  // voltmeter and bulb created
  const voltmeterAndWiresNode = new VoltmeterAndWiresNode( model.voltmeter.needleAngleProperty, tandem.createTandem( 'voltmeterNode' ) );
  const bulbNode = new BulbNode( model.voltageProperty, {
    center: FaradaysLawConstants.BULB_POSITION
  } );

  // wires
  this.addChild( new CoilsWiresNode( this, model.topCoilVisibleProperty ) );

  // exists for the lifetime of the sim, no need to dispose
  model.voltmeterVisibleProperty.link( function( showVoltmeter ) {
    voltmeterAndWiresNode.visible = showVoltmeter;
  } );

  // When PhET-iO Studio makes the voltmeter invisible, we should also uncheck the checkbox.
  voltmeterAndWiresNode.on( 'visibility', function() {
    model.voltmeterVisibleProperty.value = voltmeterAndWiresNode.visible;
  } );

  // bulb added
  this.addChild( bulbNode );

  // coils added
  this.addChild( bottomCoilNode );
  this.addChild( topCoilNode );
  model.topCoilVisibleProperty.linkAttribute( topCoilNode, 'visible' );

  // control panel
  const controlPanel = new ControlPanelNode( model, tandem );
  this.addChild( controlPanel );

  // voltmeter added
  this.addChild( voltmeterAndWiresNode );

  // @private
  this.magnetNodeWithField = new MagnetNodeWithField( model, tandem.createTandem( 'magnetNode' ) );
  this.addChild( this.magnetNodeWithField );
  this.pdomPlayAreaNode.accessibleOrder = [ null, this.magnetNodeWithField ];
  this.pdomControlAreaNode.accessibleOrder = [ controlPanel ];

  // move coils to front
  bottomCoilNode.frontImage.detach();
  this.addChild( bottomCoilNode.frontImage );
  bottomCoilNode.frontImage.center = model.bottomCoil.position.plus( new Vector2( CoilNode.xOffset, 0 ) );

  topCoilNode.frontImage.detach();
  this.addChild( topCoilNode.frontImage );
  topCoilNode.frontImage.center = model.topCoil.position.plus( new Vector2( CoilNode.xOffset + CoilNode.twoOffset, 0 ) );
  model.topCoilVisibleProperty.linkAttribute( topCoilNode.frontImage, 'visible' );

  // const tcInnerBounds = Shape.bounds( this.magnetNodeWithField.regionManager._bottomCoilInnerBounds ).getStrokedShape();

  // this.addChild( Rectangle.bounds( this.magnetNodeWithField.regionManager._topCoilInnerBounds, { stroke: 'red' } ) )
  // this.addChild( Rectangle.bounds( this.magnetNodeWithField.regionManager._bottomCoilInnerBounds, { stroke: 'red' } ) )

}

faradaysLaw.register( 'FaradaysLawScreenView', FaradaysLawScreenView );

export default inherit( ScreenView, FaradaysLawScreenView, {

  /**
   * Step in time
   * @param {number} dt - elapsed time in seconds
   */
  step: function( dt ) {
    // this.magnetNodeWithField.step( dt );
  }
} );