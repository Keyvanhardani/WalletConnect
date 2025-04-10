import { ethers } from 'ethers';
import { Connection, PublicKey } from '@solana/web3.js';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, ADAPTER_EVENTS } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

class Web3Service {
    constructor() {
        this.provider = null;
        this.solanaConnection = new Connection('https://api.mainnet-beta.solana.com');
        this.web3auth = null;
    }

    async initWeb3Auth() {
        try {
            const clientId = "YOUR_WEB3AUTH_CLIENT_ID"; // Ersetzen Sie dies durch Ihre Web3Auth Client ID
            this.web3auth = new Web3Auth({
                clientId,
                chainConfig: {
                    chainNamespace: CHAIN_NAMESPACES.EIP155,
                    chainId: "0x1", // Ethereum Mainnet
                    rpcTarget: "https://rpc.ankr.com/eth",
                },
            });

            const openloginAdapter = new OpenloginAdapter({
                adapterSettings: {
                    clientId,
                    network: "testnet",
                    uxMode: "popup",
                }
            });
            this.web3auth.configureAdapter(openloginAdapter);

            await this.web3auth.initModal();
            return this.web3auth;
        } catch (error) {
            console.error("Error initializing Web3Auth", error);
            throw error;
        }
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
                case 'web3auth':
                    if (!this.web3auth) {
                        await this.initWeb3Auth();
                    }
                    const web3authProvider = await this.web3auth.connect();
                    const ethersProvider = new ethers.providers.Web3Provider(web3authProvider);
                    const signer = ethersProvider.getSigner();
                    const address = await signer.getAddress();
                    this.provider = ethersProvider;
                    return {
                        address,
                        network: 'ethereum',
                        provider: ethersProvider
                    };
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
            throw new Error('MetaMask ist nicht installiert');
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
            console.error('MetaMask Verbindungsfehler:', error);
            throw error;
        }
    }

    async connectWalletConnect() {
        try {
            const provider = new WalletConnectProvider({
                infuraId: 'YOUR_INFURA_ID', // Ersetzen Sie dies durch Ihre Infura ID
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
                network: 'ethereum', // oder prüfen Sie chainId zur Bestimmung
                provider: web3Provider
            };
        } catch (error) {
            console.error('WalletConnect Fehler:', error);
            throw error;
        }
    }

    async connectPhantom() {
        if (!window.solana || !window.solana.isPhantom) {
            throw new Error('Phantom Wallet ist nicht installiert');
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
            console.error('Phantom Verbindungsfehler:', error);
            throw error;
        }
    }

    async connectFantomWallet() {
        if (!window.ethereum) {
            throw new Error('MetaMask oder ein kompatibles Wallet ist nicht installiert');
        }

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            
            // Anfrage zum Wechsel zum Fantom-Netzwerk
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
            console.error('Fantom Wallet Verbindungsfehler:', error);
            throw error;
        }
    }

    async signMessage(message, walletType = 'ethereum') {
        if (!this.provider) {
            throw new Error('Wallet nicht verbunden');
        }

        try {
            if (walletType === 'solana') {
                // Für Solana (Phantom)
                const encodedMessage = new TextEncoder().encode(message);
                const signedMessage = await window.solana.signMessage(encodedMessage, 'utf8');
                return {
                    signature: signedMessage.signature.toString('hex'),
                    message
                };
            } else {
                // Für Ethereum-basierte Chains (MetaMask, WalletConnect, Fantom, Web3Auth)
                const signer = this.provider.getSigner();
                const signature = await signer.signMessage(message);
                return {
                    signature,
                    message
                };
            }
        } catch (error) {
            console.error('Fehler beim Signieren der Nachricht:', error);
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
                throw new Error(errorData.message || 'Authentifizierung fehlgeschlagen');
            }

            return await response.json();
        } catch (error) {
            console.error('Authentifizierungsfehler:', error);
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
                throw new Error(errorData.message || 'Abmeldung fehlgeschlagen');
            }

            // Provider-Verbindungen bei Bedarf bereinigen
            if (this.provider && typeof this.provider.disconnect === 'function') {
                await this.provider.disconnect();
            }
            
            if (this.web3auth) {
                await this.web3auth.logout();
            }
            
            this.provider = null;
            this.web3auth = null;

            return await response.json();
        } catch (error) {
            console.error('Abmeldefehler:', error);
            throw error;
        }
    }
}

export default new Web3Service();
