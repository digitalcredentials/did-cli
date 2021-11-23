# Decentralized Identifier client CLI _(did-cli)_

> A command line client for managing DIDs, VCs, zCaps, and corresponding cryptographic key pairs.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [Commercial Support](#commercial-support)
- [License](#license)

## Background

By default, keys and DID Documents will be stored in `~/.dids/<method>/`,
see [Setting Up Storage](STORAGE.md) for more details.

Relevant Specifications:

* [Decentralized Identifiers (DIDs) v1.0](https://www.w3.org/TR/did-core/)

## Install

Requires Node.js >= v14.

Install in a development directory:

    npm install did-cli
    ./node_modules/.bin/did ...

Install globally:

    npm install -g did-cli
    did ...

Run from npx:

    npx did-cli ...

## Usage

Help is available with the `--help/-h` command line option:

```
./did -h
./did COMMAND -h
```

### Decentralized Identifiers (DIDs)

#### `did:key` Method - Create

To generate a new `did:key` DID:

```
./did id create --method <method>
```

Options:

* `method` - Supported methods: 'key' (`did:key`). Default: 'key'.

Examples:

```
./did id create
{
  "id": "did:key:z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR",
  "secretKeySeed": "z1AZK4h5w5YZkKYEgqtcFfvSbWQ3tZ3ZFgmLsXMZsTVoeK7",
  "didDocument": {
    "@context": [
      "https://www.w3.org/ns/did/v1",
      "https://w3id.org/security/suites/ed25519-2020/v1",
      "https://w3id.org/security/suites/x25519-2020/v1"
    ],
    "id": "did:key:z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR",
    "verificationMethod": [
      {
        "id": "did:key:z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR#z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR",
        "type": "Ed25519VerificationKey2020",
        "controller": "did:key:z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR",
        "publicKeyMultibase": "z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR"
      }
    ],
    "authentication": [
      "did:key:z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR#z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR"
    ],
    "assertionMethod": [
      "did:key:z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR#z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR"
    ],
    "capabilityDelegation": [
      "did:key:z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR#z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR"
    ],
    "capabilityInvocation": [
      "did:key:z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR#z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR"
    ],
    "keyAgreement": [
      {
        "id": "did:key:z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR#z6LSiMBrnXGbSJ6ZGQ3yRu8F8y75oR85fpq6NBrxHUjB4M3A",
        "type": "X25519KeyAgreementKey2020",
        "controller": "did:key:z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR",
        "publicKeyMultibase": "z6LSiMBrnXGbSJ6ZGQ3yRu8F8y75oR85fpq6NBrxHUjB4M3A"
      }
    ]
  }
}
```

If you have a secret key seed already, set the `SECRET_KEY_SEED` env variable,
and the DID will be deterministically generated from it:

```
SECRET_KEY_SEED=z1AZK4h5w5YZkKYEgqtcFfvSbWQ3tZ3ZFgmLsXMZsTVoeK7 ./did id create
// same as previous example
```

### Key Pairs

#### Generating a key pair

To generate a new public/private key pair:

```
 ./did key create
{
  "secretKeySeed": "z1AhV1bADy7RepJ64mvH7Kk7htFNGc7EA1WA5nGzLSTWc6o",
  "keyPair": {
    "type": "Ed25519VerificationKey2020",
    "@context": "https://w3id.org/security/suites/ed25519-2020/v1",
    "publicKeyMultibase": "z6MkmDMjfkjs9XPCN1LfoQQRHz1mJ8PEdiVYC66XKhj3wGyB",
    "privateKeyMultibase": "zrv3wmB9AVHitGUTEf9MVMB6afscXMmzGY7hwuYL5gZZdspFr2DDrTA97qzZS6T1MsJM4mTKVWQWkjY5asc8FBppKt9"
  }
}
```

If you have a secret key seed already, set the `SECRET_KEY_SEED` env variable,
and the key pair will be deterministically generated from it:

```
SECRET_KEY_SEED=z1Ajrg3wpDYiKS1EKAZKDd8qwR5mG3wKvh6gYi5YEz9T89P ./did key create
{
  "secretKeySeed": "z1Ajrg3wpDYiKS1EKAZKDd8qwR5mG3wKvh6gYi5YEz9T89P",
  "keyPair": {
    "type": "Ed25519VerificationKey2020",
    "@context": "https://w3id.org/security/suites/ed25519-2020/v1",
    "publicKeyMultibase": "z6Mkf9XLrKqb6kch96MU61aciKrnQwQmBnFw9MGpyqHor81V",
    "privateKeyMultibase": "zrv4ef4DVKCmCzy9733LKCnghDP1mytArm7Jddtnq54M1sVThc95bxJ2H4TiuWXRChjGHWtocqKciPrnqUBAatLUKqq"
  }
}
```

## Contribute

See [the contribute file](https://github.com/digitalbazaar/bedrock/blob/master/CONTRIBUTING.md)!

PRs accepted.

If editing the Readme, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## Commercial Support

Commercial support for this library is available upon request from
Digital Bazaar: support@digitalbazaar.com

## License

[New BSD License (3-clause)](LICENSE) © Digital Bazaar
