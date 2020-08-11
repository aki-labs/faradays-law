/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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IeS3/koIc/+ovjCb/0v/mSv/oARAAAAWFeHRUv++FoAAAA8kHVJWtxRNKxQEUFgNdsSKNdIjZ39abGGQDGwwYBasWuyqDxkxo1K8Agqiwy+GcWfRuDjsYsdfaRSn+f/s4fjjiVXKZCzVpLLdf+rH3a8btu3fj0pqS6tGvUUg8BSrlQD/+zLE6IBJXJc7pPYBwPcYqrW3tY5arSSDCgqSJE1toQy8hFIZZWFQqJsJAIlolVfBU7xLDX6f+PBX89//d/lVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//swxOgACUSVOU7xpxDwkqo1uZYeVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//syxOgAChjHQVXIABG6E6w/MaACVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7MsTMA8VwLzFckwAwAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
const soundByteArray = base64SoundToByteArray( phetAudioContext, soundURI );
const unlock = simLauncher.createLock( soundURI );
const wrappedAudioBuffer = new WrappedAudioBuffer();
const onDecodeSuccess = decodedAudio => {
  wrappedAudioBuffer.audioBufferProperty.set( decodedAudio );
  unlock();
};
const onDecodeError = decodeError => {
  console.warn( 'decode of audio data failed, using stubbed sound, error: ' + decodeError );
  wrappedAudioBuffer.audioBufferProperty.set( phetAudioContext.createBuffer( 1, 0, phetAudioContext.sampleRate ) );
  unlock();
};
phetAudioContext.decodeAudioData( soundByteArray.buffer, onDecodeSuccess, onDecodeError );
export default wrappedAudioBuffer;