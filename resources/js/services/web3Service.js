import { ethers } from 'ethers';
import { Connection, PublicKey } from '@solana/web3.js';
import WalletConnectProvider from '@walletconnect/web3-provider';

class Web3Service {
    constructor() {
        this.provider = null;
        this.solanaConnection = new Connection('https://api.mainnet-beta.solana.com');
    }

    async connectWallet(walletType) {
        try {
            switch (walletType) {
                case 'metamask':
                    return await this.connectMetaMask();
                case 'walletconnect':
                    return await this.connectWalletConnect();
                case 'phantom':
                    return await this.connectPhantom();
                case 'fantom':
                    return await this.connectFantomWallet();
                default:
                    throw new Error('Unsupported wallet type');
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
            throw error;
        }
    }

    async connectMetaMask() {
        if (!window.ethereum) {
            throw new Error('MetaMask is not installed');
        }

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            
            this.provider = provider;
            return {
                address,
                network: 'ethereum',
                provider
            };
        } catch (error) {
            console.error('MetaMask connection error:', error);
            throw error;
        }
    }

    async connectWalletConnect() {
        try {
            const provider = new WalletConnectProvider({
                infuraId: 'YOUR_INFURA_ID', // Replace with your Infura ID
                rpc: {
                    1: 'https://mainnet.infura.io/v3/YOUR_INFURA_ID',
                    250: 'https://rpc.ftm.tools/'  // Fantom
                }
            });
            
            await provider.enable();
            const web3Provider = new ethers.providers.Web3Provider(provider);
            const signer = web3Provider.getSigner();
            const address = await signer.getAddress();
            
            this.provider = web3Provider;
            return {
                address,
                network: 'ethereum', // or check chainId to determine
                provider: web3Provider
            };
        } catch (error) {
            console.error('WalletConnect error:', error);
            throw error;
        }
    }

    async connectPhantom() {
        if (!window.solana || !window.solana.isPhantom) {
            throw new Error('Phantom wallet is not installed');
        }

        try {
            const resp = await window.solana.connect();
            const publicKey = resp.publicKey.toString();
            
            return {
                address: publicKey,
                network: 'solana',
                provider: window.solana
            };
        } catch (error) {
            console.error('Phantom connection error:', error);
            throw error;
        }
    }

    async connectFantomWallet() {
        if (!window.ethereum) {
            throw new Error('MetaMask or compatible wallet is not installed');
        }

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            
            // Request to switch to Fantom network
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: '0xfa',
                    chainName: 'Fantom Opera',
                    nativeCurrency: {
                        name: 'FTM',
                        symbol: 'FTM',
                        decimals: 18
                    },
                    rpcUrls: ['https://rpc.ftm.tools/'],
                    blockExplorerUrls: ['https://ftmscan.com/']
                }]
            });
            
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            
            this.provider = provider;
            return {
                address,
                network: 'fantom',
                provider
            };
        } catch (error) {
            console.error('Fantom wallet connection error:', error);
            throw error;
        }
    }

    async signMessage(message, walletType = 'ethereum') {
        if (!this.provider) {
            throw new Error('Wallet not connected');
        }

        try {
            if (walletType === 'solana') {
                // For Solana (Phantom)
                const encodedMessage = new TextEncoder().encode(message);
                const signedMessage = await window.solana.signMessage(encodedMessage, 'utf8');
                return {
                    signature: signedMessage.signature.toString('hex'),
                    message
                };
            } else {
                // For Ethereum-based chains (MetaMask, WalletConnect, Fantom)
                const signer = this.provider.getSigner();
                const signature = await signer.signMessage(message);
                return {
                    signature,
                    message
                };
            }
        } catch (error) {
            console.error('Error signing message:', error);
            throw error;
        }
    }

    async authenticate(walletData, signature, message) {
        try {
            const response = await fetch('/api/auth/web3', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify({
                    wallet_address: walletData.address,
                    signature: signature,
                    message: message,
                    network: walletData.network,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Authentication failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Authentication error:', error);
            throw error;
        }
    }

    async logout() {
        try {
            const response = await fetch('/api/auth/web3/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Logout failed');
            }

            // Clean up provider connections if needed
            if (this.provider && typeof this.provider.disconnect === 'function') {
                await this.provider.disconnect();
            }
            this.provider = null;

            return await response.json();
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }
}

export default new Web3Service();
