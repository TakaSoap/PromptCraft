<template>
    <div style="height: 100vh; position: relative">
        <n-layout position="absolute">
            <n-layout-header class="header" bordered> PromptCraft </n-layout-header>
            <n-layout has-sider position="absolute" style="top: 4em; bottom: 4em">
                <n-layout :native-scrollbar="false">
                    <div class="content">
                        <n-h2>平山道</n-h2>
                        <n-h2>平山道</n-h2>
                        <n-h2>平山道</n-h2>
                        <n-h2>平山道</n-h2>
                        <n-h2>平山道</n-h2>
                        <n-h2>平山道</n-h2>
                    </div>
                </n-layout>
            </n-layout>
            <n-layout-footer class="footer" bordered position="absolute">
                <n-text depth="3"> Copyright © 2023 &nbsp|&nbsp Gao Zesen </n-text>
            </n-layout-footer>
        </n-layout>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: calc(100vh - 8em);
}

.header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4em;
    padding: 1em;
}

.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4em;
    padding: 1em;
}
</style>
