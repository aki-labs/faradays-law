/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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ASFChWpZDLnCFURsNgANrtrZAFwbiSerfVuqPqXStUbytmQ3+X6TOqtbgkJrFXO+FPZfESoRhBv8ygNCL6KAKwqE1KRvDyW5//s0xP4ACYUC56MYY6itAGG0EIgGm+Klsc7ZxRyZR1xvp55rGsdGuxjsdyRJ25sL6JGXv7znJRKk4UynIuRSESIFJlpwvOKJHDQXDcYcZForMzjiYKMKobWjbbC3WyABWat11jadHppjn50idSNiUFYQVIrsdvgs93biUGHiIqmAqwlVTEFNRTMuOTkuNVVV//s0xP6AC5UMzSekxghxACB0AIgGVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRRgAAAANbIBXC///+slaVdnn48Gnu6J1ZnEvp8qBsBRb////5bUecPdnu4Zbz0kytbvUHVMQU1FMy45OS41VVVVVVVVVVVV//s0xPwACjEIyyMEySiHgl70EAhGVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy45OS41VVVVVVVVVVVV//s0xPwACUUMyaWEaSikFpz0UAkeVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy45OS41VVVVVVVVVVVV//s0xP+ACrESpQQEySCugRn0AQgGVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//s0xNwBw5wQx6AEQDBbgFaQAIgGVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//s0xMIDwAAAmgAMIDAAAAAAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//s0xMIDwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
const soundByteArray = base64SoundToByteArray( phetAudioContext, soundURI );
const unlock = asyncLoader.createLock( soundURI );
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