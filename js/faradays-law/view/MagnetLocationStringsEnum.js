// Copyright 2018-2020, University of Colorado Boulder

/**
 * Possible magnet region location strings.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */

import faradaysLaw from '../../faradaysLaw.js';
import FaradaysLawA11yStrings from '../../FaradaysLawA11yStrings.js';

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

const MagnetLocationStringsEnum = [
  topLeftString,
  topCenterString,
  topRightString,
  middleLeftString,
  centerString,
  middleRightString,
  bottomLeftString,
  bottomCenterString,
  bottomRightString
];

if ( assert ) { Object.feeze( MagnetLocationStringsEnum ); }

faradaysLaw.register( 'MagnetLocationStringsEnum', MagnetLocationStringsEnum );
export default MagnetLocationStringsEnum;