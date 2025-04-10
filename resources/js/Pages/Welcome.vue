<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { useAuth } from '@/composables/useAuth';

const { user } = useAuth();
</script>

<template>
    <Head title="Welcome" />

    <div class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
        <div v-if="user" class="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
            <Link :href="route('dashboard')" class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Dashboard
            </Link>
        </div>
        <div v-else class="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
            <Link :href="route('login')" class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Log in
            </Link>

            <Link :href="route('register')" class="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Register
            </Link>
            
            <Link :href="route('web3-login')" class="ml-4 font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus:outline focus:outline-2 focus:rounded-sm focus:outline-blue-500">
                Web3 Login
            </Link>
        </div>

        <div class="max-w-7xl mx-auto p-6 lg:p-8">
            <div class="flex justify-center">
                <img src="/logo.svg" alt="Logo" class="h-16 w-auto bg-white p-2 rounded-lg">
            </div>

            <div class="mt-16">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <div class="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                        <div>
                            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Web3 Authentication</h2>
                            <p class="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                Our application supports Web3 wallet-based authentication, allowing users to sign in securely using their crypto wallets, including Ethereum, Solana, and Fantom wallets.
                            </p>
                            <p class="mt-4 text-sm">
                                <Link :href="route('web3-login')" class="inline-flex items-center font-semibold text-blue-700 dark:text-blue-300">
                                    Try Web3 Login
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="ml-1 w-5 h-5 fill-blue-500 dark:fill-blue-200">
                                        <path fill-rule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clip-rule="evenodd" />
                                    </svg>
                                </Link>
                            </p>
                        </div>
                    </div>

                    <div class="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                        <div>
                            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Supported Wallets</h2>
                            <p class="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                We support multiple wallet types:
                            </p>
                            <ul class="mt-2 text-gray-500 dark:text-gray-400 text-sm leading-relaxed space-y-1">
                                <li>• MetaMask (Ethereum)</li>
                                <li>• Phantom (Solana)</li>
                                <li>• Fantom Wallet</li>
                                <li>• WalletConnect (Multi-chain)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.bg-dots-darker {
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
}
@media (prefers-color-scheme: dark) {
    .dark\:bg-dots-lighter {
        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
    }
}
</style>
