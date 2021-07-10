// Copyright 2020-2021, University of Colorado Boulder

/**
 * VoltageSoundGenerator is a sound generator that produces sounds based on the voltage level.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import SoundClip from '../../../../tambo/js/sound-generators/SoundClip.js';
import SoundGenerator from '../../../../tambo/js/sound-generators/SoundGenerator.js';
import soundManager from '../../../../tambo/js/soundManager.js';
import lightBulbToneTop2Sound from '../../../sounds/lightbulb-voltage-note-b-flat-4_mp3.js';
import lightBulbTone1Sound from '../../../sounds/lightbulb-voltage-note-c-4_mp3.js';
import lightBulbToneTop1Sound from '../../../sounds/lightbulb-voltage-note-c-5_mp3.js';
import lightBulbTone2Sound from '../../../sounds/lightbulb-voltage-note-e-4_mp3.js';
import lightBulbTone3Sound from '../../../sounds/lightbulb-voltage-note-g-4_mp3.js';
import faradaysLaw from '../../faradaysLaw.js';

// constants
const SOUND_GENERATION_THRESHOLD_VOLTAGE = 0.01; // in volts, empirically determined, must be greater than zero
const TONE_OPTIONS = { loop: true, initialOutputLevel: 0 };

// By design, the voltage in this sim hits its max at pi/2 so that it is easy to integrate with the voltmeter, so use
// that value for the maximum voltage in the calculations for this sound generator.
const MAX_VOLTAGE_FOR_CALCULATIONS = Math.PI / 2;

class VoltageSoundGenerator extends SoundGenerator {

  /**
   * @param {NumberProperty} voltageProperty
   * @param {Object} [options]
   * @constructor
   */
  constructor( voltageProperty, options ) {

    options = merge( {
      initialOutputLevel: 0.2
    }, options );

    super( options );

    // sound clips that represent individual tones and that are layered to produce the voltage sound
    const voltageSoundClips = [
      new SoundClip( lightBulbTone1Sound, TONE_OPTIONS ),
      new SoundClip( lightBulbTone2Sound, TONE_OPTIONS ),
      new SoundClip( lightBulbTone3Sound, TONE_OPTIONS )
    ];
    voltageSoundClips.forEach( voltageSoundClip => {
      voltageSoundClip.connect( this.masterGainNode );
    } );

    // high notes that are played or not based on the sign of the voltage
    const highNoteOutputLevelMultiplier = 0.2;
    const positiveVoltmeterHighTone = new SoundClip( lightBulbToneTop1Sound, TONE_OPTIONS );
    soundManager.addSoundGenerator( positiveVoltmeterHighTone );
    const positiveVoltmeterLowTone = new SoundClip( lightBulbToneTop2Sound, TONE_OPTIONS );
    soundManager.addSoundGenerator( positiveVoltmeterLowTone );

    // closure for adjusting the sound based on the voltage
    const voltageListener = voltage => {

      const voltageMagnitude = Math.abs( voltage );

      if ( voltageMagnitude > SOUND_GENERATION_THRESHOLD_VOLTAGE ) {

        // Set the level for each of the lower tones based on the voltage level.  The lowest tones kick in first (i.e at
        // the lowest voltage), then the next ones are layered in.
        voltageSoundClips.forEach( ( clip, index ) => {
          if ( !clip.isPlaying ) {
            clip.play();
          }
          const playThreshold = index * ( MAX_VOLTAGE_FOR_CALCULATIONS / voltageSoundClips.length );
          const outputLevel = Utils.clamp( 0, voltageMagnitude - playThreshold, 1 );
          clip.setOutputLevel( outputLevel );
        } );

        // top tone, which varies based on whether the voltage is positive or negative
        const topNoteOutputLevel = Utils.clamp( 0, voltageMagnitude, 1 ) * highNoteOutputLevelMultiplier;
        if ( voltage > 0 ) {
          if ( !positiveVoltmeterHighTone.isPlaying ) {
            positiveVoltmeterHighTone.play();
          }
          positiveVoltmeterHighTone.setOutputLevel( topNoteOutputLevel );
          positiveVoltmeterLowTone.stop();
        }
        else if ( voltage < 0 ) {
          if ( !positiveVoltmeterLowTone.isPlaying ) {
            positiveVoltmeterLowTone.play();
          }
          positiveVoltmeterLowTone.setOutputLevel( topNoteOutputLevel );
          positiveVoltmeterHighTone.stop();
        }
      }
      else {

        // The voltage is below the sound generation threshold, so stop all tones.
        voltageSoundClips.forEach( clip => {
          if ( clip.isPlaying ) {
            clip.stop();
          }
        } );
        positiveVoltmeterHighTone.stop();
        positiveVoltmeterLowTone.stop();
      }
    };

    voltageProperty.link( voltageListener );

    // @private {function}
    this.disposeVoltageSoundGenerator = () => { voltageProperty.unlink( voltageListener ); };
  }

  /**
   * @public
   */
  dispose() {
    this.disposeVoltageSoundGenerator();
    super.dispose();
  }
}

faradaysLaw.register( 'VoltageSoundGenerator', VoltageSoundGenerator );
export default VoltageSoundGenerator;