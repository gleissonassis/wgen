const {
  LITECOIN,
  LITECOIN_TESTNET,
  DOGECOIN,
  SMARTCASH,
  DASHCOIN,
  BITCOIN_REGTEST,
  BITCOIN_TESTNET,
} = require('./constants');
const { argv } = require('yargs');
const bjs = require('bitcoinjs-lib');
const bip32 = require('bip32');
const bip39 = require('bip39');
const HDKey = require('hdkey');
const { default: Wallet } = require('ethereumjs-wallet');

const generateSeed = async (phrase) => {
  if (!phrase) {
    phrase = bip39.generateMnemonic();
  }
  let seedBuffer = await bip39.mnemonicToSeed(phrase);

  console.log('Mnemonic:', phrase);
  console.log('Seed:', seedBuffer.toString('hex'));

  return seedBuffer;
};


const run = async () => {
  let seed = null;
  const path = argv.path || 'm/44/0/0/0';

  if (!argv.mnemonic) {
    seed = await generateSeed();
  } else {
    seed = await generateSeed(argv['mnemonic']);
  }

  let masterKey = null;
  let key = null;
  let network = null;

  switch(argv.coin) {
    case 'ETH':
      masterKey = HDKey.fromMasterSeed(seed);
      break;
    case 'BTC':
      masterKey = HDKey.fromMasterSeed(seed);
      break;
    case 'BTC-REGTEST':
      masterKey = HDKey.fromMasterSeed(seed, BITCOIN_REGTEST.bip32);
      network = BITCOIN_REGTEST;
      break;
    case 'BTC-TESTNET':
      masterKey = HDKey.fromMasterSeed(seed, BITCOIN_TESTNET.bip32);
      network = BITCOIN_TESTNET;
      break;
    case 'LTC':
      masterKey = HDKey.fromMasterSeed(seed, LITECOIN.bip32);
      network = LITECOIN;
      break;
    case 'LTC-TESTNET':
      masterKey = HDKey.fromMasterSeed(seed, LITECOIN_TESTNET.bip32);
      network = LITECOIN_TESTNET;
      break;
    case 'DOGE':
      masterKey = HDKey.fromMasterSeed(seed, DOGECOIN.bip32);
      network = DOGECOIN;
      break;
    case 'SMART':
      masterKey = HDKey.fromMasterSeed(seed, SMARTCASH.bip32);
      network = SMARTCASH;
      break;
    case 'DASH':
      masterKey = HDKey.fromMasterSeed(seed, DASHCOIN.bip32);
      network = DASHCOIN;
      break;
  }


  key = bip32.fromSeed(seed, network);
  derive = key.derivePath(path);

  if (argv.coin === 'ETH') {
    const wallet = Wallet.fromPrivateKey(derive.privateKey);

    const address = wallet.getAddressString();
    const privateKey = wallet.getPrivateKeyString();

    console.log(`${path} private key`, privateKey);
    console.log(`${path} address`, address);
  } else {
    const { address } = bjs.payments.p2pkh({
      pubkey: bip32.fromBase58(masterKey.publicExtendedKey, network).derivePath(path).publicKey,
      network
    });

    console.log(`${path} private key`, derive.toWIF());
    console.log(`${path} address`, address);
  }

  console.log('Extended private key:', masterKey.privateExtendedKey);
  console.log('Extended public key:', masterKey.publicExtendedKey);
}

run();
