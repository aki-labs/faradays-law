/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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';
const soundByteArray = base64SoundToByteArray( phetAudioContext, soundURI );
const unlock = simLauncher.createLock( soundURI );
const wrappedAudioBuffer = new WrappedAudioBuffer();

// safe way to unlock
let unlocked = false;
const safeUnlock = () => {
  if ( !unlocked ) {
    unlock();
    unlocked = true;
  }
};

const onDecodeSuccess = decodedAudio => {
  if ( wrappedAudioBuffer.audioBufferProperty.value === null ) {
    wrappedAudioBuffer.audioBufferProperty.set( decodedAudio );
    safeUnlock();
  }
};
const onDecodeError = decodeError => {
  console.warn( 'decode of audio data failed, using stubbed sound, error: ' + decodeError );
  wrappedAudioBuffer.audioBufferProperty.set( phetAudioContext.createBuffer( 1, 1, phetAudioContext.sampleRate ) );
  safeUnlock();
};
const decodePromise = phetAudioContext.decodeAudioData( soundByteArray.buffer, onDecodeSuccess, onDecodeError );
if ( decodePromise ) {
  decodePromise
    .then( decodedAudio => {
      if ( wrappedAudioBuffer.audioBufferProperty.value === null ) {
        wrappedAudioBuffer.audioBufferProperty.set( decodedAudio );
        safeUnlock();
      }
    } )
    .catch( e => {
      console.warn( 'promise rejection caught for audio decode, error = ' + e );
      safeUnlock();
    } );
}
export default wrappedAudioBuffer;