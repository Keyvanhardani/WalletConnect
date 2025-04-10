<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { useAuth } from '@/composables/useAuth';

const { user } = useAuth();
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900 dark:text-gray-100">
                        <h3 class="text-lg font-semibold mb-4">Welcome, {{ user.name }}!</h3>
                        
                        <div v-if="user.wallet_address" class="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <h4 class="text-md font-medium mb-2">Your Wallet Information</h4>
                            <div class="grid grid-cols-1 gap-2">
                                <div class="flex flex-col">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">Wallet Address:</span>
                                    <span class="font-mono text-xs truncate">{{ user.wallet_address }}</span>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">Network:</span>
                                    <span class="capitalize">{{ user.wallet_network }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
