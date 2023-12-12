<template>
  <div style="height: 100vh; position: relative">
    <n-layout position="absolute">
      <n-layout-header class="header">
        <n-menu
          mode="horizontal"
          :value="menuValue"
          :options="menuOptions"
        />

        <n-space>
          <n-button
            size="small"
            quaternary
            @click="showAPIKeyModal"
          >
            <template #icon>
              <n-icon>
                <BuildOutline />
              </n-icon>
            </template>
            Set API Key
          </n-button>
          <n-button
            size="small"
            quaternary
            @click="generalStore.toggleTheme"
          >
            <template #icon>
              <n-icon>
                <Sunny v-if="generalStore.isDarkTheme" />
                <Moon v-else />
              </n-icon>
            </template>
            Toggle Theme
          </n-button>
        </n-space>
      </n-layout-header>
      <n-layout
        has-sider
        position="absolute"
        style="top: 4em; bottom: 4em"
      >
        <n-layout :native-scrollbar="false">
          <slot />
        </n-layout>
      </n-layout>
      <n-layout-footer
        class="footer"
        position="absolute"
      >
        <n-text>
          Released under
          <n-button
            text
            type="tertiary"
            tag="a"
            href="https://opensource.org/license/mit/"
            target="_blank"
          >
            the MIT License
          </n-button>
        </n-text>
        <n-divider vertical />
        <n-text> Copyright © 2023 Gao Zesen </n-text>
        <n-divider vertical />
        <n-button
          text
          type="tertiary"
          tag="a"
          href="https://github.com/TakaSoap/PromptCraft"
          target="_blank"
        >
          <template #icon>
            <n-icon>
              <LogoGithub />
            </n-icon>
          </template>
          Source Code
        </n-button>
      </n-layout-footer>
    </n-layout>
  </div>

  <n-modal
    v-model:show="generalStore.isAPIKeyModalVisible"
    preset="card"
    title="Set OpenAI API Key"
    style="width: 500px"
  >
    <n-input
      v-model:value="generalStore.apiKey"
      placeholder="Input your OpenAI API Key Here"
    />
    <template #footer>
      <n-space justify="end">
        <n-button
          secondary
          type="primary"
          @click="generalStore.isAPIKeyModalVisible = false"
        >
          Confirm
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { Sunny, Moon, BuildOutline, LogoGithub } from '@vicons/ionicons5'
import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'

const generalStore = useGeneralStore()

function showAPIKeyModal () {
  generalStore.isAPIKeyModalVisible = true
}

const route = useRoute()

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/'
        },
        () => 'Playground'
      ),
    key: 'index'
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/resources'
        },
        () => 'Resources'
      ),
    key: 'resources'
  }
]

const menuValueRef = computed(() => {
  if (route.path.includes('/resources')) return 'resources'
  else if (route.name === 'index') return 'index'
  return null
})

const menuValue = ref(menuValueRef)
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
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
