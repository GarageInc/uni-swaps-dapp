const BA_LIST = 'https://raw.githubusercontent.com/The-Blockchain-Association/sec-notice-list/master/ba-sec-list.json'
// TODO(WEB-2282): Re-enable CMC list once we have a better solution for handling large lists.
const CMC_ALL_LIST = 'https://s3.coinmarketcap.com/generated/dex/tokens/eth-tokens-all.json'
const COINGECKO_LIST = 'https://tokens.coingecko.com/uniswap/all.json'
const COINGECKO_BNB_LIST = 'https://tokens.coingecko.com/binance-smart-chain/all.json'
const COINGECKO_ARBITRUM_LIST = 'https://tokens.coingecko.com/arbitrum-one/all.json'
const COINGECKO_OPTIMISM_LIST = 'https://tokens.coingecko.com/optimistic-ethereum/all.json'
const COINGECKO_CELO_LIST = 'https://tokens.coingecko.com/celo/all.json'
const COINGECKO_POLYGON_LIST = 'https://tokens.coingecko.com/polygon-pos/all.json'
const COINGECKO_AVAX_LIST = 'https://tokens.coingecko.com/avalanche/all.json'
const COMPOUND_LIST = 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json'
const GEMINI_LIST = 'https://www.gemini.com/uniswap/manifest.json'
const SET_LIST = 'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/set.tokenlist.json'

const OPTIMISM_LIST = 'https://static.optimism.io/optimism.tokenlist.json'
const ARBITRUM_LIST = 'https://bridge.arbitrum.io/token-list-42161.json'
const CELO_LIST = 'https://celo-org.github.io/celo-token-list/celo.tokenlist.json'
const PLASMA_BNB_LIST = 'https://raw.githubusercontent.com/plasmadlt/plasma-finance-token-list/master/bnb.json'
const AVALANCHE_LIST = 'https://raw.githubusercontent.com/ava-labs/avalanche-bridge-resources/main/token_list.json'
const BASE_LIST =
  'https://raw.githubusercontent.com/ethereum-optimism/ethereum-optimism.github.io/master/optimism.tokenlist.json'

const UNSUPPORTED_LIST_URLS: string[] = [BA_LIST]

const OSMOSIS_LIST = 'https://raw.githubusercontent.com/osmosis-labs/assetlists/main/osmosis-1/osmosis-1.assetlist.json'

// default lists to be 'active' aka searched across
const DEFAULT_ACTIVE_LIST_URLS: string[] = []
const DEFAULT_INACTIVE_LIST_URLS: string[] = [
  COMPOUND_LIST,
  CMC_ALL_LIST,
  COINGECKO_LIST,
  COINGECKO_BNB_LIST,
  COINGECKO_ARBITRUM_LIST,
  COINGECKO_OPTIMISM_LIST,
  COINGECKO_CELO_LIST,
  COINGECKO_POLYGON_LIST,
  COINGECKO_AVAX_LIST,
  GEMINI_LIST,
  SET_LIST,
  ARBITRUM_LIST,
  OPTIMISM_LIST,
  CELO_LIST,
  PLASMA_BNB_LIST,
  AVALANCHE_LIST,
  BASE_LIST,
  OSMOSIS_LIST,
  ...UNSUPPORTED_LIST_URLS,
]

export const DEFAULT_LIST_OF_LISTS: string[] = [...DEFAULT_ACTIVE_LIST_URLS, ...DEFAULT_INACTIVE_LIST_URLS]
