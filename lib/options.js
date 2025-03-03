/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
import {decodeSecretKeySeed, generateSecretKeySeed} from 'bnid';
import assert from 'assert-plus';
import {decode as base58Decode} from 'base58-universal';
import dayjs from 'dayjs';

export function _setupCanonicalizeOption(yargs) {
  return yargs
    .option('canonicalize', {
      type: 'string',
      describe: 'Canonicalization algorithm.',
      choices: ['jcs'],
      default: 'jcs'
    });
}

export function _setupFileOption(yargs) {
  return yargs
    .option('file', {
      type: 'string',
      describe: 'Input file path.'
    });
}

export function _setupFormatOption(yargs) {
  return yargs
    .option('format', {
      type: 'string',
      describe: 'Output format.',
      choices: [
        'json-compact',
        'json'
      ],
      default: 'json',
      alias: 'f'
    });
}

export function _setupSaveOption(yargs) {
  return yargs
    .option('save', {
      type: 'boolean',
      describe: 'Save generated object in local file storage?',
      default: false,
      alias: 'S'
    });
}

export function _setupDescriptionOption(yargs) {
  return yargs
    .option('description', {
      type: 'string',
      describe: 'Short description.'
    });
}

export function _setupUrlOption(yargs) {
  return yargs
    .option('url', {
      type: 'string',
      describe: 'Resource URL.'
    });
}

/**
 * Initializes a secret key seed Uint8Array buffer, either from an env
 * variable, or generates a new one (if none was passed in).
 *
 * @returns {Promise<{encoded: string, bytes: Uint8Array}>} Secret key seed.
 */
export async function _initSecretKeySeed() {
  const secretKeySeed = process.env.SECRET_KEY_SEED ||
    await generateSecretKeySeed();

  return _decodeSecretKeySeed({secretKeySeed});
}

/**
 * Decodes a text encoded key seed. (Used for deterministically generating
 * key pairs).
 *
 * @param {object} options - Options hashmap.
 * @param {string} options.secretKeySeed - Text-encoded random key seed.
 *
 * @returns {{bytes: Uint8Array, encoded: string}} Secret key seed object.
 */
export function _decodeSecretKeySeed({secretKeySeed}) {
  assert.string(secretKeySeed, 'secretKeySeed');

  let secretKeySeedBytes;
  try {
    secretKeySeedBytes = decodeSecretKeySeed({secretKeySeed});
  } catch(e) {
    const error = new TypeError(
      'Secret key seed must be a 32 byte random ' +
      'value multihash identified and multibase encoded.');
    error.cause = e;
    console.error(error);
    process.exit(1);
  }

  return {encoded: secretKeySeed, bytes: secretKeySeedBytes};
}

/**
 * Decodes a multibase encoded capability (passed in as a CLI param).
 *
 * @param {object} options - Options hashmap.
 * @param {string} options.capability - Multibase encoded capability.
 *
 * @returns {object} Decoded capability.
 */
export function _parseCapability({capability}) {
  assert.string(capability, 'capability');
  if(!capability.startsWith('z')) {
    throw new TypeError('"capability" must be base58 multibase encoded.');
  }
  try {
    const capabilityBytes = base58Decode(capability.slice(1));
    return JSON.parse(new TextDecoder().decode(capabilityBytes));
  } catch(e) {
    console.log('Could not decode capability. Must be serialized JSON, ' +
      'base58 multibase encoded.');
    console.error(e);
    process.exit(1);
  }
}

/**
 * Parses a time-to-live value (in dayjs format), and converts it to a
 * serialized expiration timestamp in XML DateTime format.
 *
 * @param {object} options - Options hashmap.
 * @param {string} [options.ttl='1y'] - Time-to-live, in dayjs format.
 *
 * @returns {string} Serialized expiration timestamp.
 */
export function _parseTtl({ttl}) {
  // split ttl into numbers and letters. For list of units, see:
  // https://day.js.org/docs/en/durations/creating#list-of-all-available-units
  ttl = ttl.match(/(\d+)(d|w|M|Q|y|h|ms|m|s)/);
  if(!ttl) {
    throw new Error('Invalid ttl format.');
  }
  const numberString = ttl[1];
  const unit = ttl[2];
  // Remove milliseconds and add 'Z' to indicate that the time zone is UTC
  return dayjs().add(numberString, unit).toISOString()
    .slice(0, -5) + 'Z';
}
