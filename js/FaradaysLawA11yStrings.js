// Copyright 2018, University of Colorado Boulder

/**
 * Magnet Node with field lines, draggable.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var faradaysLaw = require( 'FARADAYS_LAW/faradaysLaw' );
  // var inherit = require( 'PHET_CORE/inherit' );

  var FaradaysLawA11yStrings = {
    sceneSummary: {
      value: 'Faraday\'s Law is an interactive sim. It changes as you play with it.'
    },
    summaryDescription: {
      value: 'The play area has a light bulb circuit, and a moveable bar magnet. There are controls that change what is connected to the circuit,  flip the bar magnet, and reset the sim.'
    },
    moveMagnetToPlay: {
      value: 'Move the magnet to play.'
    },
    lightBulbCircuitLabel: {
      value: 'Light Bulb Circuit'
    },
    barMagnet: {
      value: 'Bar Magnet'
    },
    circuitFourCoilOnly: {
      value: 'In circuit are a light bulb and 4 loop coil. The coil is open on the left and right - the bar magnet can pass through.'
    },
    lightbulbCircuitPattern: {
      value: 'The light bulb circuit has a {{loops}} coil connected. {{coils}} open on the left and right, allowing the bar magnet to pass through.'
    },
    voltMeterAttached: {
      value: 'A volt meter attached is also attached to the circuit.'
    },
    aLightbulb: {
      value: 'a lightbulb'
    },
    aVoltMeter: {
      value: 'a volt meter'
    },
    aNumberLoopPattern: {
      value: 'a {{number}} loop'
    },
    theNumberLoopPattern: {
      value: 'the {{number}} loop'
    },
    aLoopCoilPattern: {
      value: 'a {{loops}} coil'
    },
    theLoopCoilPattern: {
      value: 'the {{loops}} coil'
    },
    fourLoopCoil: {
      value: '4 loop coil'
    },
    theFourLoopCoil: {
      value: 'the 4 loop coil'
    },
    twoLoopCoil: {
      value: '2 loop coil'
    },
    theTwoLoopCoil: {
      value: 'the 2 loop coil'
    },
    twoItemPattern: {
      value: '{{first}} and {{second}}'
    },
    threeItemPattern: {
      value: '{{first}}, {{second}}, and {{third}}'
    },
    fourItemPattern: {
      value: '{{first}}, {{second}}, {{third}}, and {{fourth}}'
    },
    twoWordsPattern: {
      value: '{{first}} {{second}}'
    },
    twoWordsCommaPattern: {
      value: '{{first}}, {{second}}'
    },
    a: {
      value: 'a'
    },
    and: {
      value: 'and'
    },
    topLeft: {
      value: 'top-left'
    },
    topCenter: {
      value: 'top-center'
    },
    topRight: {
      value: 'top-right'
    },
    middleLeft: {
      value: 'middle-left'
    },
    center: {
      value: 'center'
    },
    middleRight: {
      value: 'middle-right'
    },
    bottomLeft: {
      value: 'bottom-left'
    },
    bottomCenter: {
      value: 'bottom-center'
    },
    bottomRight: {
      value: 'bottom-right'
    },
    edge: {
      value: 'edge'
    },
    in: {
      value: 'in'
    },
    farFrom: {
      value: 'far from'
    },
    closeTo: {
      value: 'close to'
    },
    veryCloseTo: {
      value: 'very close to'
    },
    left: {
      value: 'left'
    },
    right: {
      value: 'right'
    },
    barMagnetPositionPattern: {
      value: 'The bar magnet is {{areaPosition}}'
    },
    barMagnetIs: {
      value: 'The bar magnet is:'
    },
    positionOfPlayAreaPattern: {
      value: 'at the {{position}} of the Play Area.'
    },
    onThePattern: {
      value: '{{pole}} on the {{side}}'
    },
    north: {
      value: 'North'
    },
    south: {
      value: 'South'
    }
  };

  // verify that object is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( FaradaysLawA11yStrings ); }

  faradaysLaw.register( 'FaradaysLawA11yStrings', FaradaysLawA11yStrings );

  return FaradaysLawA11yStrings;
} );
