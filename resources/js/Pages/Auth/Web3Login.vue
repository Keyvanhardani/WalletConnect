<script setup>
import { Head } from '@inertiajs/vue3';
import Web3Login from '@/Components/Web3Login.vue';
</script>

<template>
    <Head title="Web3 Login" />

    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
        <div>
            <a href="/">
                <img src="/logo.svg" alt="Logo" class="w-20 h-20" />
            </a>
        </div>

        <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
            <Web3Login />
        </div>
    </div>
</template>
