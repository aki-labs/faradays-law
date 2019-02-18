// Copyright 2018-2019, University of Colorado Boulder

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
  const CoilTypeEnum = require( 'FARADAYS_LAW/faradays-law/view/CoilTypeEnum' );
  const faradaysLaw = require( 'FARADAYS_LAW/faradaysLaw' );
  const FaradaysLawA11yStrings = require( 'FARADAYS_LAW/FaradaysLawA11yStrings' );
  const OrientationEnum = require( 'FARADAYS_LAW/faradays-law/model/OrientationEnum' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  const topLeftString = FaradaysLawA11yStrings.topLeft.value;
  const topCenterString = FaradaysLawA11yStrings.topCenter.value;
  const topRightString = FaradaysLawA11yStrings.topRight.value;
  const middleLeftString = FaradaysLawA11yStrings.middleLeft.value;
  const centerString = FaradaysLawA11yStrings.center.value;
  const middleRightString = FaradaysLawA11yStrings.middleRight.value;
  const bottomLeftString = FaradaysLawA11yStrings.bottomLeft.value;
  const bottomCenterString = FaradaysLawA11yStrings.bottomCenter.value;
  const bottomRightString = FaradaysLawA11yStrings.bottomRight.value;
  const edgeString = FaradaysLawA11yStrings.edge.value;
  const twoWordsPatternString = FaradaysLawA11yStrings.twoWordsPattern.value;

  const barMagnetPositionPatternString = FaradaysLawA11yStrings.barMagnetPositionPattern.value;
  const positionOfPlayAreaPatternString = FaradaysLawA11yStrings.positionOfPlayAreaPattern.value;
  const barMagnetHelpTextString = FaradaysLawA11yStrings.barMagnetHelpText.value;
  const inString = FaradaysLawA11yStrings.in.value;
  const veryCloseToString = FaradaysLawA11yStrings.veryCloseTo.value;
  const closeToString = FaradaysLawA11yStrings.closeTo.value;
  const farFromString = FaradaysLawA11yStrings.farFrom.value;
  const touchingSideOfCoilPatternString = FaradaysLawA11yStrings.touchingSideOfCoilPattern.value;
  const magnetPositionProximityPatternString = FaradaysLawA11yStrings.magnetPositionProximityPattern.value;

  // magnet alert patterns
  const slidingAndPositionFourCoilPatternString = FaradaysLawA11yStrings.slidingAndPositionFourCoilPattern.value;
  const slidingStoppedPositionPatternString = FaradaysLawA11yStrings.slidingStoppedPositionPattern.value;
  const fourCoilTwoCoilFieldLinesPatternString = FaradaysLawA11yStrings.fourCoilTwoCoilFieldLinesPattern.value;
  const twoCoilFieldLinesPatternString = FaradaysLawA11yStrings.twoCoilFieldLinesPattern.value;
  const slidingStoppedPositionFourCoilTwoCoilFieldLinesPatternString = FaradaysLawA11yStrings.slidingStoppedPositionFourCoilTwoCoilFieldLinesPattern.value;

  const poleOnThePatternString = FaradaysLawA11yStrings.poleOnThePattern.value;
  const northString = FaradaysLawA11yStrings.north.value;
  const southString = FaradaysLawA11yStrings.south.value;

  const leftString = FaradaysLawA11yStrings.left.value;
  const rightString = FaradaysLawA11yStrings.right.value;

  const minimalString = FaradaysLawA11yStrings.minimal.value;
  const veryWeakString = FaradaysLawA11yStrings.veryWeak.value;
  const weakString = FaradaysLawA11yStrings.weak.value;
  const strongString = FaradaysLawA11yStrings.strong.value;
  const veryStrongString = FaradaysLawA11yStrings.veryStrong.value;

  const fieldLinesDescriptionPatternString = FaradaysLawA11yStrings.fieldLinesDescriptionPattern.value;
  const fourLoopOnlyFieldStrengthPatternString = FaradaysLawA11yStrings.fourLoopOnlyFieldStrengthPattern.value;
  const fieldStrengthPatternString = FaradaysLawA11yStrings.fieldStrengthPattern.value;

  const fourLoopCoilString = FaradaysLawA11yStrings.fourLoopCoil.value;
  const twoLoopCoilString = FaradaysLawA11yStrings.twoLoopCoil.value;
  const theCoilPatternString = FaradaysLawA11yStrings.theCoilPattern.value;
  const theFourLoopCoilString = StringUtils.fillIn( theCoilPatternString, { coil: fourLoopCoilString } );
  const theTwoLoopCoilString = StringUtils.fillIn( theCoilPatternString, { coil: twoLoopCoilString } );
  const circuitNowHasPatternString = FaradaysLawA11yStrings.circuitNowHasPattern.value;
  const oneCoilString = FaradaysLawA11yStrings.oneCoil.value;
  const twoCoilsString = FaradaysLawA11yStrings.twoCoils.value;

  const magnetLocationAlertPatternString = FaradaysLawA11yStrings.magnetLocationAlertPattern.value;
  const magnetLocationExtraAlertPatternString = FaradaysLawA11yStrings.magnetLocationExtraAlertPattern.value;

  const slidingStoppedString = FaradaysLawA11yStrings.slidingStopped.value;
  const magnetSlidingAlertPatternString = FaradaysLawA11yStrings.magnetSlidingAlertPattern.value;

  const connectedString = FaradaysLawA11yStrings.connected.value;
  const removedString = FaradaysLawA11yStrings.removed.value;
  const voltmeterAlertPatternString = FaradaysLawA11yStrings.voltmeterAlertPattern.value;
  const fieldStrengthPassingCoilPatternString = FaradaysLawA11yStrings.fieldStrengthPassingCoilPattern.value;
  const fieldStrengthPassingBothCoilsPatternString = FaradaysLawA11yStrings.fieldStrengthPassingBothCoilsPattern.value;
  const fieldLinesVisibilityPatternString = FaradaysLawA11yStrings.fieldLinesVisibilityPattern.value;
  const hiddenString = FaradaysLawA11yStrings.hidden.value;
  const visibleString = FaradaysLawA11yStrings.visible.value;
  const fieldLinesDescriptionUpdatedString = FaradaysLawA11yStrings.fieldLinesDescriptionUpdated.value;

  const flippingMagnetPatternString = FaradaysLawA11yStrings.flippingMagnetPattern.value;

  const proximityToFourCoilPatternString = FaradaysLawA11yStrings.proximityToFourCoilPattern.value;
  const proximityToTwoCoilPatternString = FaradaysLawA11yStrings.proximityToTwoCoilPattern.value;

  const bumpingCoilPatternString = FaradaysLawA11yStrings.bumpingCoilPattern.value;
  const singleCoilDescriptionString = FaradaysLawA11yStrings.singleCoilDescription.value;
  const doubleCoilDescriptionString = FaradaysLawA11yStrings.doubleCoilDescription.value;
  const circuitFourCoilOnlyString = FaradaysLawA11yStrings.circuitFourCoilOnly.value;
  const circuitFourCoilAndVoltmeterString =FaradaysLawA11yStrings.circuitFourCoilAndVoltmeter.value;
  const circuitDescriptionPatternString = FaradaysLawA11yStrings.circuitDescriptionPattern.value;

  // constants
  const REGION_DESCRIPTIONS = [ topLeftString,    topCenterString,    topRightString,
                              middleLeftString, centerString,       middleRightString,
                              bottomLeftString, bottomCenterString, bottomRightString ];

  // can create a linear function to map distances to integers 0 - 2
  const PROXIMITY_STRINGS = [ inString, veryCloseToString, closeToString, farFromString ];
  // const proximityMapFunction = new LinearFunction( 95, 260, 0, 2, true ); // determined empirically from sim testing

  const FIELD_STRENGTHS = [ minimalString, veryWeakString, weakString, strongString, veryStrongString ];
  const DIRECTIONS = { LEFT: leftString, RIGHT: rightString };

  class MagnetDescriber {

    constructor( model, regionManager ) {
      // @private
      this._model = model;
      this._bounds = model.bounds;
      this._magnet = model.magnet;
      this._topCoil = model.topCoil;
      this._bottomCoil = model.bottomCoil;

      // @public
      this.regionManager = regionManager;
    }

    magnetMovedAlertText() {
      let slidingAndPositionPhrase = null;
      let alertText = this.fourCoilProximityString;
      let twoCoilFieldLines = null;

      if ( this.regionManager.magnetStoppedByKeyboard ) {
        slidingAndPositionPhrase = slidingStoppedString;
      }

      if ( !this.regionManager.magnetInOrVeryCloseToCoil ) {
        if ( slidingAndPositionPhrase ) {
          // phrase exists, magnet stopped by keyboard
          const pattern = {
            slidingStopped: slidingStoppedString,
            magnetPosition: this.magnetLocationAlertText
          };
          slidingAndPositionPhrase = StringUtils.fillIn( slidingStoppedPositionPatternString, pattern );
        } else {
          slidingAndPositionPhrase = this.magnetLocationAlertText;
        }
      }

      if ( this._model.topCoilVisibleProperty.get() ) {
        // both coils visible
        twoCoilFieldLines = this.twoCoilProximityString;
      }

      if ( this._magnet.fieldLinesVisibleProperty.get() ) {
        if ( twoCoilFieldLines ) {
          const pattern = {
            twoCoil: twoCoilFieldLines,
            fieldLines: fieldLinesDescriptionUpdatedString
          };
          twoCoilFieldLines = StringUtils.fillIn( twoCoilFieldLinesPatternString, pattern );
        } else {
          twoCoilFieldLines = fieldLinesDescriptionUpdatedString;
        }
      }

      if ( slidingAndPositionPhrase && twoCoilFieldLines ) {
        alertText = StringUtils.fillIn(
          slidingStoppedPositionFourCoilTwoCoilFieldLinesPatternString,
          {
            slidingAndPositionPhrase: slidingAndPositionPhrase,
            twoCoilFieldLines: twoCoilFieldLines,
            fourCoil: this.fourCoilProximityString
          }
        );
      } else if ( slidingAndPositionPhrase ) {
        alertText = StringUtils.fillIn(
          slidingAndPositionFourCoilPatternString,
          {
            slidingAndPositionPhrase: slidingAndPositionPhrase,
            fourCoil: this.fourCoilProximityString
          }
        );
      } else if ( twoCoilFieldLines ) {
        alertText = StringUtils.fillIn(
          fourCoilTwoCoilFieldLinesPatternString,
          {
            fourCoil: this.fourCoilProximityString,
            twoCoilFieldLines: twoCoilFieldLines
          }
        );
      }

      return alertText;
    }

    getBumpingCoilString( coil ) {
      return StringUtils.fillIn( bumpingCoilPatternString, { coil: coil } );
    }

    getFlipMagnetAlertText( orientation ) {
      let northSide = leftString;
      let southSide = rightString;
      const alertPattern = flippingMagnetPatternString;

      if ( orientation === OrientationEnum.SN ) {
        northSide = rightString;
        southSide = leftString;
      }

      let alert = StringUtils.fillIn( alertPattern, { northSide: northSide, southSide: southSide } );

      if ( this._model.magnet.fieldLinesVisibleProperty.get() ) {
        alert += ' ' + fieldLinesDescriptionUpdatedString;
      }

      return alert;
    }

    get strengthThroughFourCoilText() {
      const strength = FIELD_STRENGTHS[ this.regionManager.getBottomCoilFieldStrengthRegion() ];
      return StringUtils.fillIn( fieldStrengthPassingCoilPatternString, { strength: strength, coil: theFourLoopCoilString } );
    }

    get strengthThroughTwoCoilText() {
      const strength = FIELD_STRENGTHS[ this.regionManager.getTopCoilFieldStrengthRegion() ];
      return StringUtils.fillIn( fieldStrengthPassingCoilPatternString, { strength: strength, coil: theTwoLoopCoilString } );
    }

    get strengthThroughBothCoilsText() {
      const strength = FIELD_STRENGTHS[ this.regionManager.getTopCoilFieldStrengthRegion() ];
      return StringUtils.fillIn( fieldStrengthPassingBothCoilsPatternString, { strength: strength } );
    }

    get magnetLocationAlertText() {
      return StringUtils.fillIn( magnetLocationAlertPatternString, { position: this.positionString } );
    }

    // get magnetFocusAlertText() {
    //   var position = this.positionString;
    //   var pattern = this.regionManager.showExtraMoveText ? magnetLocationAlertPatternString : magnetLocationExtraAlertPatternString;
    //   return StringUtils.fillIn( pattern, { position: position } );
    // }

    get magnetFocusAlertText() {
      const pattern = this.regionManager.showExtraMoveText ? magnetLocationExtraAlertPatternString : magnetLocationAlertPatternString;
      return StringUtils.fillIn( pattern, { position: this.positionString } );
    }

    get fieldLinesDescription() {
      var northSide = this._magnet.orientationProperty.get() === OrientationEnum.NS ? leftString : rightString;
      var southSide = this._magnet.orientationProperty.get() === OrientationEnum.SN ? leftString : rightString;
      return StringUtils.fillIn( fieldLinesDescriptionPatternString, { northSide: northSide, southSide: southSide } );
    }

    get fourLoopOnlyFieldStrength() {
      var valueString = FIELD_STRENGTHS[ this.regionManager.getFieldStrengthAtCoilRegion( this._bottomCoil ) ];
      return StringUtils.fillIn( fourLoopOnlyFieldStrengthPatternString, { fieldStrength: valueString } );
    }

    get fourLoopFieldStrength() {
      return this.getFieldStrengthAtCoil( this._bottomCoil );
    }

    get twoLoopFieldStrength() {
      return this.getFieldStrengthAtCoil( this._topCoil );
    }

    getFieldStrengthAtCoil( coil ) {
      var fieldStrengthString = FIELD_STRENGTHS[ this.regionManager.getFieldStrengthAtCoilRegion( coil ) ];
      var coilString = coil === this._topCoil ? theTwoLoopCoilString : theFourLoopCoilString;
      return StringUtils.fillIn(
        fieldStrengthPatternString,
        {
          fieldStrength: fieldStrengthString,
          coil: coilString
        } );
    }

    get fourCoilOnlyPolarityDescription() {
      const pattern = '{{first}}, {{second}}';
      return StringUtils.fillIn( pattern, { first: this.northPoleSideString, second: this.southPoleSideString } );
    }

    get northPoleSideString() {
      return this.getPoleSideString( northString, OrientationEnum.NS );
    }

    get southPoleSideString() {
      return this.getPoleSideString( southString, OrientationEnum.SN );
    }

    getPoleSideString( pole, orientation ) {
      const side = this._magnet.orientationProperty.get() === orientation ? leftString : rightString;
      return StringUtils.fillIn( poleOnThePatternString, { pole: pole, side: side } );
    }

    get fourLoopOnlyMagnetPosition() {
      const touchingCoil = this.regionManager.getTouchingCoil();
      const magnetPosition = StringUtils.fillIn( barMagnetPositionPatternString, { areaPosition: this.positionOfPlayAreaString } );
      const coilProximity = this.fourCoilProximityString;

      if ( this.regionManager.magnetInCoil ) {
        return coilProximity;
      }

      if ( touchingCoil >= 0 && !this.regionManager.magnetInCoil ) {
        return StringUtils.fillIn( touchingSideOfCoilPatternString, touchingCoil );
      }
      return StringUtils.fillIn( magnetPositionProximityPatternString, { magnetPosition: magnetPosition, coilProximity: coilProximity } );
    }

    get positionOfPlayAreaString() {
      return StringUtils.fillIn( positionOfPlayAreaPatternString, { position: this.positionString } );
    }

    get barMagnetHelpText() {
      return barMagnetHelpTextString;
    }

    // handles getting the current position description (e.g. top-left edge, bottom-center, center, etc...)
    get positionString() {
      var description = REGION_DESCRIPTIONS[ this.regionManager.positionRegion ];
      if ( this.regionManager.magnetAtEdge ) {
        description = StringUtils.fillIn( twoWordsPatternString, { first: description, second: edgeString } );
      }

      return description;
    }

    get fourCoilProximityString() {

      // if ( this.regionManager.magnetInCoil ) {
      //   return th
      // }
      const proximity = PROXIMITY_STRINGS[ this.regionManager.magnetToBottomCoilProximity ];

      return this.getCoilProximityString( proximity, CoilTypeEnum.FOUR_COIL );
    }

    get twoCoilProximityString() {
      const proximity = PROXIMITY_STRINGS[ this.regionManager.magnetToTopCoilProximity ];

      return this.getCoilProximityString( proximity, CoilTypeEnum.TWO_COIL );
    }

    getCoilProximityString( proximity, coil ) {
      const pattern = coil === CoilTypeEnum.FOUR_COIL ? proximityToFourCoilPatternString : proximityToTwoCoilPatternString;
      const { adjacentCoil, magnetInCoil } = this.regionManager;
      let coilDirection = '.';
      if ( adjacentCoil === coil && !magnetInCoil ) {
        coilDirection = this.regionManager.magnetScreenSide === 'left' ? ' to the right.' : ' to the left.';
      }

      return StringUtils.fillIn( pattern, { proximity: proximity ? proximity : '' } ) + coilDirection;
    }

    static getMagnetSlidingAlertText( speedValue, directionValue ) {
      const direction = DIRECTIONS[ directionValue ];
      return StringUtils.fillIn( magnetSlidingAlertPatternString, { direction: direction } );
    }

    static getFieldLinesVisibilityAlertText( showLines ) {
      const visibility = showLines ? visibleString : hiddenString;
      let alert = StringUtils.fillIn( fieldLinesVisibilityPatternString, { visibility: visibility } );

      if ( showLines ) {
        alert += ' ' + fieldLinesDescriptionUpdatedString;
      }

      return alert;
    }
    /*******************************************
     * CIRCUIT DESCRIPTION AND ALERT FUNCTIONS *
     *******************************************/

    static getVoltmeterAttachmentAlertText( showVoltmeter ) {
      const attachmentState = showVoltmeter ? connectedString : removedString;
      return StringUtils.fillIn( voltmeterAlertPatternString, { attachmentState: attachmentState } );
    }

    static getCoilConnectionAlertText( showTopCoil ) {
      const coil = showTopCoil ? twoCoilsString : oneCoilString;
      return StringUtils.fillIn( circuitNowHasPatternString, { coil: coil } );
    }

    static getCoilDescription( showTopCoil ) {
      return showTopCoil ? doubleCoilDescriptionString : singleCoilDescriptionString;
    }

    static getFourCoilOnlyDescription( showVoltmeter ) {
      const circuitContents = showVoltmeter ? circuitFourCoilAndVoltmeterString : circuitFourCoilOnlyString;
      const coilDescription = singleCoilDescriptionString;
      return StringUtils.fillIn( circuitDescriptionPatternString, { circuitContents: circuitContents, coilDescription: coilDescription } );
    }
  }

  return faradaysLaw.register( 'MagnetDescriber', MagnetDescriber );
} );