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

### zCaps (Authorization Capabilities)

#### Creating a Root zCap

To create a root zcap that allows `read` and `write` actions to the 
`https://example.com/api` URL:

```
ZCAP_CONTROLLER_KEY_SEED=z1AZK4h5w5YZkKYEgqtcFfvSbWQ3tZ3ZFgmLsXMZsTVoeK7 \
  ./did zcap create \
  --controller 'did:key:z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR' \
  --url 'https://example.com/api'
{
  "rootCapability": {
    "@context": [
      "https://w3id.org/zcap/v1",
      "https://w3id.org/security/suites/ed25519-2020/v1"
    ],
    "id": "urn:zcap:root:https%3A%2F%2Fexample.com%2Fapi",
    "controller": "did:key:z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR",
    "invocationTarget": "https://example.com/api"
  },
  "encoded": "zDWWVahKWhXpe9vYhuSeaRYDZradgnuhfJUnQGAGdbsXRPbD16AsJq6no2b9iHjZGqRfKSWRz9gGer1uJfwG5awKshKhWVuBK5fRJTwN54G4MRAhbMJsUKvwC1VYto5gkNEcoNqvFWNSgucumD4vzarDfDfyXG6BXFbk2SN314p5vgPPEkxkWkqyWdMcWAoFDJcYFK5WGdwKxs2xsZazJgPk8aJrtPRKvSVVQUb2i5qLguZn21JNuk6sNrC4SPhcskkbsEEctMzpxVr75qLX9zWGEaJwgCdZDPGwS4YKuvgHbRW6jU7wVUoTcFNSzevhK3hAswXDzNZp7kmAxJMZBtaBhoeTV9tG75DX1ek"
}
```

#### Delegating a zCap

To delegate an authorization capability:

```sh
export ADMIN_DID=did:key:z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR
export ADMIN_SECRET_KEY_SEED=z1AZK4h5w5YZkKYEgqtcFfvSbWQ3tZ3ZFgmLsXMZsTVoeK7
export TEACHER_DID=did:key:z6MknBxrctS4KsfiBsEaXsfnrnfNYTvDjVpLYYUAN6PX2EfG

ZCAP_CONTROLLER_KEY_SEED=$ADMIN_SECRET_KEY_SEED ./did zcap delegate \
  --delegatee $TEACHER_DID \
  --url https://example.com/documents \
  --controller $ADMIN_DID \
  --allow read
{
  "delegatedCapability": {
    "@context": [
      "https://w3id.org/zcap/v1",
      "https://w3id.org/security/suites/ed25519-2020/v1"
    ],
    "id": "urn:zcap:delegated:z9gLKoFmKHwhxCzmo91Ywnh",
    "parentCapability": "urn:zcap:root:https%3A%2F%2Fexample.com%2Fdocuments",
    "invocationTarget": "https://example.com/documents",
    "controller": "did:key:z6MknBxrctS4KsfiBsEaXsfnrnfNYTvDjVpLYYUAN6PX2EfG",
    "expires": "2022-11-28T20:53:06Z",
    "allowedAction": [
      "read"
    ],
    "proof": {
      "type": "Ed25519Signature2020",
      "created": "2021-11-28T20:53:06Z",
      "verificationMethod": "did:key:z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR#z6Mkfeco2NSEPeFV3DkjNSabaCza1EoS3CmqLb1eJ5BriiaR",
      "proofPurpose": "capabilityDelegation",
      "capabilityChain": [
        "urn:zcap:root:https%3A%2F%2Fexample.com%2Fdocuments"
      ],
      "proofValue": "z244yxzRuFMyGfK85QcE6UewEZ3JpGDDTCvBKuxNiwdnxF3AmsSAoVYTBPLvFpYV7SeeWB4tUBGMGTF7pka6xR3av"
    }
  },
  "encoded": "zWE9iCuaZNYTg5CA2HokbtjHcET3TnM7PDWgmYxmmT9zZqMM9cxPUJNi9URT3gbzSooPGKtevPix6saAE3TF6Zo44FGk6VK2pMpHHmdcQLjLDCaeXBv6KyPG6HkDiCu38UL1v66M9d88qUaYeC9Vr3gu3y6qMijzwyVxuf6tdw5ieNN5fBhMTPAdiEjbwuKKRHnXC1jXaxvJgrL2FZANH8iEpBzSk2s5MFdz8so9yMwrG8py9Jk9PBoXQcWBGLET9E9iU3ckVJsev9KRUyfpEsDCa6jzqDTcxDL3VDg1QgXW4ZqzYytFeKKsM67EbCepLQvgdU83E4sMXyHiKtinaJfKgd4Z9shXPFwHdtDDhFrZ1vVrtBPWtMy8iUhUFfRFqHtKGTxESv24hC5Dt1FZcmX1fHoWGxytchUyjyWhZYE7QJtGKc3fQHGiecynzGppsGuiZHf6ZpybNUkkaMCE7mgJonZTUS1hTa3mPwwxT8xv72c9s4GzGdQK56A1tX6QaTNm4o9vwY4zGuqEzfa8kDE7ejyLm68AAodotr5bH2BuQGcJHrHF1xVDp6AcNWiKB1GgRafX9WXe4Xfz5RXk3uyQwCqMz7aAhUWN8HNx1ThqzbGuuHiU2fDn7KW87DkJftr58ddHT4WovaW8FzLG54V6D3yTEZzEoTLugoPC9hnfYgBHYbVgG8ydFxz3UN8wHYSYQN9XmVem7ZVtbauQasrajppzSMh7ow4U5X6pJ6qqZTd5kXykXoZT7HSAst5384oBThjLTQpmFHGSsXfcemGmkZyXSXKFRupLAbbQftQCBZ9njHXy3qRanerZTP789B8ua2YMQ2sa195iDqNnLHeeQqbspvMEe7TKk4r8km5zwAsaPh98HB3Wtky5goB39xvuD2botE5GBsEvMqhAAVGx8cY3pD9oZJE1zH64FP1Bho5UtbkHEfWHL7nZjbwo29sckrjAUCYbSTy4eA719GA3Rk7TjYe1LioJVBACNz4Uy3f49vdJ84uaUzf5E1bFHNgLopnjL2bPr47d8iN2mZ4RXdZorHLX6XuwsjcKeb8MwttyeMmsM61Znrs9PCAPqSSJJGvW8q1xDp46Fw3p4k7hac"
}

# Further delegation (a teacher can delegate the previous zCap to a student, 
# for example)
export TEACHER_DID=did:key:z6MknBxrctS4KsfiBsEaXsfnrnfNYTvDjVpLYYUAN6PX2EfG
export TEACHER_SECRET_KEY_SEED=z1AWjKsCFB3kjcMVyuau6cg9bDeDTnKYnrkriGen6x3t7rF
export STUDENT_DID=did:key:z6MksBBhHUrjje3rLoLdJozNo7y29vTBCLL3TUvKP7peEtgC

ZCAP_CONTROLLER_KEY_SEED=$TEACHER_SECRET_KEY_SEED ./did zcap delegate \
--delegatee $STUDENT_DID --invocationTarget 'https://example.com/documents/chemistry/101' \
--controller $TEACHER_DID --allow read \
--capability zWE9iCuaZNYTg5CA2HokbtjHcET3TnM7PDWgmYxmmT9zZqMM9cxPUJNi9URT3gbzSooPGKtevPix6saAE3TF6Zo44FGk6VK2pMpHHmdcQLjLDCaeXBv6KyPG6HkDiCu38UL1v66M9d88qUaYeC9Vr3gu3y6qMijzwyVxuf6tdw5ieNN5fBhMTPAdiEjbwuKKRHnXC1jXaxvJgrL2FZANH8iEpBzSk2s5MFdz8so9yMwrG8py9Jk9PBoXQcWBGLET9E9iU3ckVJsev9KRUyfpEsDCa6jzqDTcxDL3VDg1QgXW4ZqzYytFeKKsM67EbCepLQvgdU83E4sMXyHiKtinaJfKgd4Z9shXPFwHdtDDhFrZ1vVrtBPWtMy8iUhUFfRFqHtKGTxESv24hC5Dt1FZcmX1fHoWGxytchUyjyWhZYE7QJtGKc3fQHGiecynzGppsGuiZHf6ZpybNUkkaMCE7mgJonZTUS1hTa3mPwwxT8xv72c9s4GzGdQK56A1tX6QaTNm4o9vwY4zGuqEzfa8kDE7ejyLm68AAodotr5bH2BuQGcJHrHF1xVDp6AcNWiKB1GgRafX9WXe4Xfz5RXk3uyQwCqMz7aAhUWN8HNx1ThqzbGuuHiU2fDn7KW87DkJftr58ddHT4WovaW8FzLG54V6D3yTEZzEoTLugoPC9hnfYgBHYbVgG8ydFxz3UN8wHYSYQN9XmVem7ZVtbauQasrajppzSMh7ow4U5X6pJ6qqZTd5kXykXoZT7HSAst5384oBThjLTQpmFHGSsXfcemGmkZyXSXKFRupLAbbQftQCBZ9njHXy3qRanerZTP789B8ua2YMQ2sa195iDqNnLHeeQqbspvMEe7TKk4r8km5zwAsaPh98HB3Wtky5goB39xvuD2botE5GBsEvMqhAAVGx8cY3pD9oZJE1zH64FP1Bho5UtbkHEfWHL7nZjbwo29sckrjAUCYbSTy4eA719GA3Rk7TjYe1LioJVBACNz4Uy3f49vdJ84uaUzf5E1bFHNgLopnjL2bPr47d8iN2mZ4RXdZorHLX6XuwsjcKeb8MwttyeMmsM61Znrs9PCAPqSSJJGvW8q1xDp46Fw3p4k7hac

{
  "delegatedCapability": {
    "@context": [
      "https://w3id.org/zcap/v1",
      "https://w3id.org/security/suites/ed25519-2020/v1"
    ],
    "id": "urn:zcap:delegated:zDdT5FfnQnpifMEJf8v3enk",
    "parentCapability": "urn:zcap:delegated:z9gLKoFmKHwhxCzmo91Ywnh",
    "invocationTarget": "https://example.com/documents/chemistry/101",
    "controller": "did:key:z6MksBBhHUrjje3rLoLdJozNo7y29vTBCLL3TUvKP7peEtgC",
    "expires": "2022-11-28T21:05:46Z",
    "allowedAction": [
      "read"
    ],
    "proof": {
      "type": "Ed25519Signature2020",
      "created": "2021-11-28T21:05:46Z",
      "verificationMethod": "did:key:z6MknBxrctS4KsfiBsEaXsfnrnfNYTvDjVpLYYUAN6PX2EfG#z6MknBxrctS4KsfiBsEaXsfnrnfNYTvDjVpLYYUAN6PX2EfG",
      "proofPurpose": "capabilityDelegation",
      "capabilityChain": [
        "urn:zcap:root:https%3A%2F%2Fexample.com%2Fdocuments",
        "urn:zcap:delegated:z9gLKoFmKHwhxCzmo91Ywnh"
      ],
      "proofValue": "zzMhvR6puq3ma3HrVag9mvh2VQokogT9D54BaXB93J3TM8CDhMxk67FpfReJrNNeMEucndoxwB7pF9bM59qgPAqB"
    }
  },
  "encoded": "zMtQjxpCzyxcmJD6SUpveQW5KsgvbnqNt3HN5VfSH1bPiusM4V5EFmdNaQRE9sPoyTM6uA15SPoBo1KEWfVkNxJDGqaKbRuVNX6fBY615x3miXLPXSmsM9Zk1bGZ9Bo29G4454qoLJ2J3xLE23aghr1Sq9QPrC9dP9JwveYyezkg4PoGzoeAcB1RfsULPmwCrzk5UKYoxEJ7vzTCsqWmsmGQuqZ8NBR9PxUV9LmeBS6npbudWmtRwRzu7RHs7upuvRR1Uy3QBa7AMuLWd8XazouZkbdZTCGkCjZEB8eoMneE6s6YRBrzAiFvDX9KAqCs2e11hrk36KPpqJvgku9hXoVhgEdjBmbTfUM8Sfrr4qSPhsjxUUASZXqvJaagdjyo2uPtYe1tqrF8u7JUA62MfBVsx6mHX8fV2DRHXpoykrrm6fkZL5eDHGsxutjnZKfx2bDECHFh5PeQxN9sZa6BZtrAUg7fd4SYHNm93t62uLxvc1SsHtmmzXoTepNMVTi9ytJJXogVpTCokG9t5f9UsLKbHQKaFG5xfZDDmRBsteJ1iSeX7Meukp8bzMzK6b8g7yckCPSTuoDkbBKx8kr3jEAFmv5JrggMK6dYSzFoKY16z5nHjXqdNSVKeSkt2g3xFGHKPVvcSFuv19vo5kuA66Tdab8ovo1ahqYmmtUCiYXtq7P2tPb33oZxirkR1JzkoSapTvYKGP9acpcnzyX99VxwqyzkM6T9WtHMbcM5jEe3nU2P2YuBU74gf7c9G82jkQ2wQc1koMw5ZvwqmxujEMw4ti3kp1LsUs5k2on9zyWqhwjHe367e6AJAqWHCr7JPEbXTwFvrUBN9WC1DokArQEZwfF8pkh4MfYXCCM87HyUSFGNPgmgAYyr3Jyv7YrbEWibwNQtCSddd9CAdkKjq2VBjF4AvGseoQdNQTFSVXiUowFji5kxRkZP8t5aTQKX3Jt9mDKQfT9xLn5kC8ZrRN6KvLf9easvHqkxSHQ7nEz9mYP6PAEBuR7K3dtBPStvFkZQEHuHRJndw8E4d5A4NJHsDgb5Gfm7kZR23oLTkwunP3iKh3nEqePe31UfCTBxb816kCmovsaQkY4CwGS39iGBAMxHHLtwLt9UvEZ841Uaax9yQqyvfvt16HNqAdUfTS652a7DmsngK1e1uTMPi2ftc45Qp"
}
```

### Key Pairs

#### Generating a Key Pair

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

### Anchored Resources

Parameters:
- Input: Either pass in a `--file` parameter, pipe something in via `stdin`,
  or provide a `--url` parameter (which will be fetched).
- `--file, -f` - Optional input file containing the resource to be anchored/hashed.
- `--canonicalize` - Optional `canonicalizationAlgorithm` value. The resource
  to be anchored will first be canonicalized with this algorithm. For JSON or
  JSON-LD type resources, the default algorithm is `jcs`.
- `url` - Optional URL parameter for the anchored resource. If no input `--file`
  or `stin` value is specified, the CLI will attempt to retrieve the resource
  at the `url`.
- Id: If a `url` param is provided, it will be used as the `anchoredResource.id`.
  Otherwise, the CLI will use the `id` property of the input resource.
  If neither exists (or if the resource is not a JSON object), no id will be
  used.

#### Creating an `anchoredResource`

To create an anchored resource (which includes a content hash and
a canonicalization algorithm): 

```
./did anchor create -f example-vc.json --canonicalize jcs
{
  "id": "<id of the object in example-vc.json>",
  "canonicalizationAlgorithm": "jcs",
  "contentHash": "z1Aaj5A4UCsdMpXwdYAReXa4bxWYiKJtdAvB1zMzCHtCbtD"
}
```

#### Verifying an `anchoredResource`

```
./did anchor verify -f example-vc.json --contentHash z1Aaj5A4UCsdMpXwdYAReXa4bxWYiKJtdAvB1zMzCHtCbtD
{
  "verified": true
}
# or
{
  "verified": false,
  "error": "Provided content hash does not match the hash of the resource."
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
