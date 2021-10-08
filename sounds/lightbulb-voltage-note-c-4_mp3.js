/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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s8BAIgCQlgUBXlam+7MJGygKc0Bal8vv8cMgAxun7hx42Dc+9YwxlFJer0ljD//VSYd9blIND4ZB9/u0KgAAHAAHBaLRaJAwAAAAvsyeZC5v+QzYoyqt/ncb//syxOYASIyZO05hp3DwD6j1x7UmoEQkEv/CS3z+LQM4nA4TdTX/B+AOg8QwwYS6J0qv/xWCFmOSNBKZpL7Knf/+XAtS2IQfjQysLpPYYv//2d0xx4c7y2NwfXX///nESDh9TEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7MsTpggjsmz2uYidxFQ/mad006lVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+zLE5wJJAH07TuWncWCOZqq7oAJVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//swxNqADVTJWbmHgBgAADSDgAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
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