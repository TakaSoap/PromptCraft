<template>
    <n-config-provider
        :theme="themeStore.theme"
        :locale="enGB"
        :date-locale="dateEnGB"
    >
        <n-loading-bar-provider>
            <n-message-provider>
                <n-notification-provider>
                    <n-dialog-provider>
                        <NuxtPage />
                    </n-dialog-provider>
                </n-notification-provider>
            </n-message-provider>
        </n-loading-bar-provider>
    </n-config-provider>
</template>

<script setup lang="ts">
import { useThemeStore } from './stores/theme';
import { enGB, dateEnGB } from 'naive-ui';

const themeStore = useThemeStore();

</script>