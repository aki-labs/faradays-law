// Copyright 2018-2020, University of Colorado Boulder

/**
 * Type to handle all standard keyboard input. The only exception is the grab-drag interaction.
 */

import KeyboardDragListener from '../../../../scenery/js/listeners/KeyboardDragListener.js';
import faradaysLaw from '../../faradaysLaw.js';

class FaradaysLawKeyboardDragListener extends KeyboardDragListener {

  /**
   * @param {FaradaysLawModel} model
   * @param {MagnetRegionManager} regionManager
   * @param {FaradaysLawAlertManager} alertManager
   */
  constructor( model, regionManager, alertManager ) {

    const drag = vectorDelta => {
      model.magnetArrowsVisibleProperty.set( false );
      let newPosition = model.magnet.positionProperty.get().plus( vectorDelta );
      newPosition = model.bounds.closestPointTo( newPosition );
      model.moveMagnetToPosition( newPosition );
    };

    const end = event => {
      alertManager.movementEndAlert();
    };

    super( { drag: drag, end: end, dragBounds: model.bounds } );

    this.regionManager = regionManager;
    this.alertManager = alertManager;
  }

  /**
   * @public
   */
  initializeAccessibleInputListener() {
    return {
      keyup: onKeyUp.bind( this ),
      focus: onFocus.bind( this )
    };
  }
}

function onKeyUp( event ) {
  const { magnetIsAnimating, magnetStoppedByKeyboard } = this.regionManager;

  if ( !magnetIsAnimating && magnetStoppedByKeyboard ) {
    this.alertManager.movementEndAlert();
    this.regionManager.resetKeyboardStop();
  }
}

function onFocus() {

  // set flag to override the next keyup alert
  this.alertManager.magnetFocusAlert();
  this.regionManager.resetKeyboardStop();
}

faradaysLaw.register( 'FaradaysLawKeyboardDragListener', FaradaysLawKeyboardDragListener );
export default FaradaysLawKeyboardDragListener;