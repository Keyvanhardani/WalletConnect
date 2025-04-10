import { ref, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

export function useAuth() {
    const page = usePage();
    
    const user = computed(() => page.props.auth?.user);
    const isLoggedIn = computed(() => !!user.value);
    
    return {
        user,
        isLoggedIn
    };
}
