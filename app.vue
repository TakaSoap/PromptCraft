<template>
    <n-config-provider :theme="generalStore.theme" :locale="enGB" :date-locale="dateEnGB">
        <n-loading-bar-provider>
            <n-message-provider>
                <n-notification-provider>
                    <n-dialog-provider>
                        <NuxtLayout>
                            <NuxtPage />
                        </NuxtLayout>
                    </n-dialog-provider>
                </n-notification-provider>
            </n-message-provider>
        </n-loading-bar-provider>
    </n-config-provider>
</template>

<script setup lang="ts">
import { useGeneralStore } from './stores/general';
import { enGB, dateEnGB } from 'naive-ui';

const generalStore = useGeneralStore();
</script>
./stores/general
