// Copyright 2002-2014, University of Colorado Boulder

/**
 * Scene graph for the 'Faradays Law' screen.
 *
 * @author Vasily Shakhov (MLearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var PlusNode = require( 'SCENERY_PHET/PlusNode' );
  var MinusNode = require( 'SCENERY_PHET/MinusNode' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Circle = require( 'SCENERY/nodes/Circle' );


  function VoltMeterScale( needleAngleProperty, options ) {
    Node.call( this );

    options = _.extend( {
      arcRadius: 55, // radius of voltmeter scale
      needleColor: "#3954a5",
      needleHeight: 53,
      needleWidth: 2,
      needleTipHeght: 12,
      needleTipWidth: 15
    }, options );


    //scale
    var scale = new Path( new Shape()
      .moveTo( 0, 0 )
      .lineTo( 0, -options.arcRadius )
      .moveTo( -options.arcRadius, 0 )
      .arc( 0, 0, options.arcRadius, -Math.PI, 0, false )
      .lineTo( -options.arcRadius, 0 )
      .close(), {
      stroke: 'black',
      lineWidth: 1
    } );
    this.addChild( scale );

    //plus and minus signs
    this.addChild( new PlusNode( {
      centerX: options.arcRadius / 2.3,
      centerY: -options.arcRadius / 2.5,
      size: new Dimension2( 12, 2 )
    } ) );
    this.addChild( new MinusNode( {
      centerX: -options.arcRadius / 2.3,
      centerY: -options.arcRadius / 2.5,
      size: new Dimension2( 12, 2 )
    } ) );

    //needle base
    this.addChild( new Circle( 4, {
      fill: options.needleColor
    } ) );

    //needle
    var needle = new ArrowNode( 0, 0, 0, -options.needleHeight, {
      headHeight: options.needleTipHeght,
      headWidth: options.needleTipWidth,
      tailWidth: options.needleWidth,
      fill: options.needleColor,
      lineWidth: 0
    } );
    this.addChild( needle );


    needleAngleProperty.link( function( angle ) {
      needle.rotation = Math.min( Math.max( -Math.PI / 2, angle ), Math.PI / 2 );
    } );


    this.mutate( options );
  }

  return inherit( Node, VoltMeterScale );
} )
;
