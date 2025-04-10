<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import web3Service from '@/services/web3Service';
import Button from '@/Components/ui/button.vue';

const router = useRouter();
const loading = ref(false);
const error = ref('');
const walletSupported = ref({
    metamask: false,
    phantom: false,
    walletconnect: true, // Always available
});

onMounted(() => {
    // Check for available wallets
    walletSupported.value.metamask = typeof window.ethereum !== 'undefined';
    walletSupported.value.phantom = typeof window.solana !== 'undefined' && window.solana.isPhantom;
});

async function connectWallet(walletType) {
    try {
        loading.value = true;
        error.value = '';
        
        // Connect to the selected wallet
        const walletData = await web3Service.connectWallet(walletType);
        
        // Sign a random message for authentication
        const nonce = Math.floor(Math.random() * 1000000).toString();
        const message = `Sign this message to authenticate with our app: ${nonce}`;
        const { signature } = await web3Service.signMessage(message, walletData.network);
        
        // Authenticate with the backend
        const authResult = await web3Service.authenticate(walletData, signature, message);
        
        // Redirect to dashboard upon successful authentication
        if (authResult.redirectUrl) {
            router.push(authResult.redirectUrl);
        }
    } catch (err) {
        console.error('Login error:', err);
        error.value = err.message || 'Failed to connect wallet';
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="space-y-6">
        <div class="text-center">
            <h1 class="text-2xl font-bold">Connect Your Wallet</h1>
            <p class="text-muted-foreground mt-2">Choose your preferred wallet to sign in</p>
        </div>
        
        <div class="space-y-4">
            <Button 
                v-if="walletSupported.metamask" 
                variant="outline" 
                class="w-full justify-start" 
                @click="connectWallet('metamask')"
                :disabled="loading"
            >
                <img src="/images/metamask.svg" alt="MetaMask" class="mr-2 h-5 w-5" />
                MetaMask
            </Button>
            
            <Button 
                v-if="walletSupported.phantom" 
                variant="outline" 
                class="w-full justify-start" 
                @click="connectWallet('phantom')"
                :disabled="loading"
            >
                <img src="/images/phantom.svg" alt="Phantom" class="mr-2 h-5 w-5" />
                Phantom (Solana)
            </Button>
            
            <Button 
                variant="outline" 
                class="w-full justify-start" 
                @click="connectWallet('fantom')"
                :disabled="loading"
            >
                <img src="/images/fantom.svg" alt="Fantom" class="mr-2 h-5 w-5" />
                Fantom Wallet
            </Button>
            
            <Button 
                variant="outline" 
                class="w-full justify-start" 
                @click="connectWallet('walletconnect')"
                :disabled="loading"
            >
                <img src="/images/walletconnect.svg" alt="WalletConnect" class="mr-2 h-5 w-5" />
                WalletConnect
            </Button>
        </div>
        
        <div v-if="error" class="text-destructive text-center">
            {{ error }}
        </div>
        
        <div v-if="loading" class="text-center">
            <div class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-primary rounded-full" aria-label="loading"></div>
        </div>
    </div>
</template>
