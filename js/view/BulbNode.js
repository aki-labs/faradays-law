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
  var Image = require( 'SCENERY/nodes/Image' );
  var Circle = require( 'SCENERY/nodes/Circle' );

  // images
  var bulbImage = require( 'image!FARADAYS_LAW/images/light-bulb.png' );

  function BulbNode( needleAngleProperty, options ) {
    Node.call( this );

    var haloNode = new Node();
    haloNode.addChild( new Circle( 5, {
      fill: 'white',
      opacity: 0.46
    } ) );
    haloNode.addChild( new Circle( 3.75, {
      fill: 'white',
      opacity: 0.51
    } ) );
    haloNode.addChild( new Circle( 2, {
      fill: 'white'
    } ) );
    this.addChild( haloNode );
    haloNode.centerX = -25; //center of the bulb

    //from flash simulation  if angle === 1 radian, haloNode must be 200x200 px
    needleAngleProperty.link( function( angle ) {
      var targetScaleFactor = 20 * angle; //from flash simulation, in angle = 1, we would have 200x200 halo (max circle diameter - 10px)
      if ( targetScaleFactor === 0 ) {
        haloNode.visible = false;
      }
      else {
        haloNode.visible = true;
        var scale = targetScaleFactor / haloNode.transform.matrix.scaleVector.x;
        haloNode.scale( scale, scale );
      }
    } );


    this.bulbImage = new Image( bulbImage, {
      centerX: 0,
      centerY: 0
    } );
    this.addChild( this.bulbImage );


    this.mutate( options );
  }

  return inherit( Node, BulbNode );
} )
;
