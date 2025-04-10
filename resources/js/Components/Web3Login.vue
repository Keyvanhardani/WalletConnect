<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import web3Service from '@/services/web3Service';

const router = useRouter();
const loading = ref(false);
const error = ref('');
const walletSupported = ref({
    metamask: false,
    phantom: false,
    walletconnect: true, // Immer verfügbar
    web3auth: true, // Immer verfügbar
});

onMounted(() => {
    // Überprüfen Sie verfügbare Wallets
    walletSupported.value.metamask = typeof window.ethereum !== 'undefined';
    walletSupported.value.phantom = typeof window.solana !== 'undefined' && window.solana.isPhantom;
});

async function connectWallet(walletType) {
    try {
        loading.value = true;
        error.value = '';
        
        // Mit dem ausgewählten Wallet verbinden
        const walletData = await web3Service.connectWallet(walletType);
        
        // Eine zufällige Nachricht zur Authentifizierung signieren
        const nonce = Math.floor(Math.random() * 1000000).toString();
        const message = `Signieren Sie diese Nachricht, um sich bei unserer App zu authentifizieren: ${nonce}`;
        const { signature } = await web3Service.signMessage(message, walletData.network);
        
        // Mit dem Backend authentifizieren
        const authResult = await web3Service.authenticate(walletData, signature, message);
        
        // Nach erfolgreicher Authentifizierung zum Dashboard weiterleiten
        if (authResult.redirectUrl) {
            router.push(authResult.redirectUrl);
        }
    } catch (err) {
        console.error('Login-Fehler:', err);
        error.value = err.message || 'Wallet-Verbindung fehlgeschlagen';
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="space-y-6">
        <div class="text-center">
            <h1 class="text-2xl font-bold">Verbinden Sie Ihr Wallet</h1>
            <p class="text-muted-foreground mt-2">Wählen Sie Ihr bevorzugtes Wallet zur Anmeldung</p>
        </div>
        
        <div class="space-y-4">
            <button 
                v-if="walletSupported.metamask" 
                class="w-full justify-start flex items-center p-3 rounded-lg border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
                @click="connectWallet('metamask')"
                :disabled="loading"
            >
                <img src="/images/metamask.svg" alt="MetaMask" class="mr-2 h-5 w-5" />
                <span>MetaMask</span>
            </button>
            
            <button 
                v-if="walletSupported.phantom" 
                class="w-full justify-start flex items-center p-3 rounded-lg border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
                @click="connectWallet('phantom')"
                :disabled="loading"
            >
                <img src="/images/phantom.svg" alt="Phantom" class="mr-2 h-5 w-5" />
                <span>Phantom (Solana)</span>
            </button>
            
            <button 
                class="w-full justify-start flex items-center p-3 rounded-lg border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
                @click="connectWallet('fantom')"
                :disabled="loading"
            >
                <img src="/images/fantom.svg" alt="Fantom" class="mr-2 h-5 w-5" />
                <span>Fantom Wallet</span>
            </button>
            
            <button 
                class="w-full justify-start flex items-center p-3 rounded-lg border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
                @click="connectWallet('walletconnect')"
                :disabled="loading"
            >
                <img src="/images/walletconnect.svg" alt="WalletConnect" class="mr-2 h-5 w-5" />
                <span>WalletConnect</span>
            </button>
            
            <button 
                class="w-full justify-start flex items-center p-3 rounded-lg border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
                @click="connectWallet('web3auth')"
                :disabled="loading"
            >
                <img src="/images/web3auth.svg" alt="Web3Auth" class="mr-2 h-5 w-5" />
                <span>Web3Auth (Email, Social Login)</span>
            </button>
        </div>
        
        <div v-if="error" class="text-red-500 text-center">
            {{ error }}
        </div>
        
        <div v-if="loading" class="text-center">
            <div class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" aria-label="loading"></div>
        </div>
    </div>
</template>
