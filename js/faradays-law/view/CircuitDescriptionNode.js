// Copyright 2018, University of Colorado Boulder

/**
 *
 * Handles the logic of mapping the position of a Node (via its bounds) to a specified region in the sim. This map is
 * divided into 9 evenly divided regions.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */

define( function( require ) {
  'use strict';

  // modules
  var faradaysLaw = require( 'FARADAYS_LAW/faradaysLaw' );
  var FaradaysLawA11yStrings = require( 'FARADAYS_LAW/FaradaysLawA11yStrings' );
  // var FaradaysLawConstants = require( 'FARADAYS_LAW/faradays-law/FaradaysLawConstants' );
  // var Vector2 = require( 'DOT/Vector2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  // var Range = require( 'DOT/Range' );
  // var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  // var Util = require( 'DOT/Util' );

  // strings
  var lightBulbCircuitLabelString = FaradaysLawA11yStrings.lightBulbCircuitLabel.value;
  var circuitFourCoilOnlyString = FaradaysLawA11yStrings.circuitFourCoilOnly.value;
  var inTheCircuitString = FaradaysLawA11yStrings.inTheCircuit.value;
  var coilsStaticDescriptionString = FaradaysLawA11yStrings.coilsStaticDescription.value;
  var fourLoopCoilString = FaradaysLawA11yStrings.fourLoopCoil.value;
  var twoLoopCoilString = FaradaysLawA11yStrings.twoLoopCoil.value;
  var voltmeterString = FaradaysLawA11yStrings.voltmeter.value;

  function CircuitDescriptionNode ( model, options ) {

    options = _.extend( {
      tagName: 'div',
      labelTagName: 'h3',
      labelContent: lightBulbCircuitLabelString
    }, options );

    Node.call( this, options );

    var dynamicChildrenNode = new Node();
    this.addChild( dynamicChildrenNode );

    var fourCoilOnlyNode = new Node( {
      tagName: 'p',
      innerContent: circuitFourCoilOnlyString
    } );

    var otherComponentsNode = new Node( {
      tagName: 'ul',
      labelTagName: 'p',
      labelContent: inTheCircuitString,
      descriptionTagName: 'p',
      descriptionContent: coilsStaticDescriptionString,
      appendDescription: true
    } );

    var fourLoopItem = new Node( { tagName: 'li', innerContent: fourLoopCoilString } );
    var twoLoopItem = new Node( { tagName: 'li', innerContent: twoLoopCoilString } );
    var voltmeterItem = new Node( { tagName: 'li', innerContent: voltmeterString } );

    Property.multilink(
      [ model.showTopCoilProperty, model.showVoltmeterProperty ],
      function( showTopCoil, showVoltmeter ) {
        if ( !( showTopCoil || showVoltmeter ) ) {
          dynamicChildrenNode.children = [ fourCoilOnlyNode ];
        } else {
          var children = [];
          children.push( fourLoopItem );
          showTopCoil && children.push( twoLoopItem );
          showVoltmeter && children.push( voltmeterItem );
          otherComponentsNode.children = children;
          dynamicChildrenNode.children = [ otherComponentsNode ];
        }
      }
    );
  }

  faradaysLaw.register( 'CircuitDescriptionNode', CircuitDescriptionNode );

  return inherit( Node, CircuitDescriptionNode );
} );