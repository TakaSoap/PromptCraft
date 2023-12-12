<template>
    <div class="content">
        <n-gradient-text class="title" type="success"> PromptCraft </n-gradient-text>
        <n-space class="main-body" vertical>
            <n-form inline>
                <n-form-item label="Your Prompt">
                    <n-input
                        v-model:value="userPromptInput"
                        class="textarea"
                        type="textarea"
                        show-feedback="false"
                        :autosize="autoSize"
                        :validation-status="userInputStatus"
                        :feedback="userInputFeedback"
                    />
                </n-form-item>
                <n-form-item label="Improved Prompt">
                    <n-spin :show="isPromptLoading" description="Crafting your prompt...">
                        <n-input
                            v-model:value="improvedPromptComputed"
                            class="textarea"
                            type="textarea"
                            placeholder="Nothing Here"
                            show-feedback="false"
                            :autosize="autoSize"
                        />
                    </n-spin>
                </n-form-item>
            </n-form>

            <n-form inline>
                <n-form-item label="Response 1">
                    <n-spin :show="isFirstResLoading" description="Waiting Response...">
                        <n-input
                            v-model:value="userPromptResponseComputed"
                            class="textarea"
                            type="textarea"
                            placeholder="Nothing Here"
                            :autosize="autoSize"
                        />
                    </n-spin>
                </n-form-item>
                <n-form-item label="Response 2">
                    <n-spin :show="isSecondResLoading" description="Waiting Response...">
                        <n-input
                            v-model:value="improvedPromptResponseComputed"
                            class="textarea"
                            type="textarea"
                            placeholder="Nothing Here"
                            :autosize="autoSize"
                        />
                    </n-spin>
                </n-form-item>
            </n-form>

            <n-grid cols="10" style="margin-bottom: 2em" x-gap="18">
                <n-gi span="3" offset="2">
                    <n-button block secondary type="Error" @click="clearAll">
                        <template #icon>
                            <n-icon>
                                <TrashBinOutline />
                            </n-icon>
                        </template>
                        Clear All
                    </n-button>
                </n-gi>
                <n-gi span="3" offset="">
                    <n-button block secondary type="primary" @click="handleSubmit">
                        <template #icon>
                            <n-icon>
                                <BulbOutline />
                            </n-icon>
                        </template>
                        Craft & Compare
                    </n-button>
                </n-gi>
            </n-grid>

            <n-collapse-transition class="feedback" :show="showFeedback">
                <n-card bordered style="max-width: 858px">
                    <template #header> Feedback </template>
                    <div v-if="isPromptLoading">
                        <n-skeleton text :repeat="2" />
                        <n-skeleton text style="width: 60%" />
                    </div>
                    <div v-else>
                        {{ promptFeedback }}
                    </div>
                </n-card>
            </n-collapse-transition>
        </n-space>
    </div>
</template>

<script setup lang="ts">
import { BulbOutline, TrashBinOutline } from '@vicons/ionicons5';
import { OpenAI } from 'openai';
import { useMessage } from 'naive-ui';

const generalStore = useGeneralStore();

const message = useMessage();

const userPromptInput = ref('');
const userInputStatus = ref('');
const userInputFeedback = ref('');
const improvedPrompt = ref('');
const improvedPromptComputed = computed(() => {
    return improvedPrompt.value;
});
const userPromptResponse = ref('');
const userPromptResponseComputed = computed(() => {
    return userPromptResponse.value;
});
const improvedPromptResponse = ref('');
const improvedPromptResponseComputed = computed(() => {
    return improvedPromptResponse.value;
});
const promptFeedback = ref('');

const autoSize = {
    minRows: 4,
    maxRows: 20
};

const showFeedback = ref(false);
const isPromptLoading = ref(false);
const isFirstResLoading = ref(false);
const isSecondResLoading = ref(false);

const openai = new OpenAI({
    apiKey: generalStore.apiKey,
    dangerouslyAllowBrowser: true
});

const modelSystemPrompt = 'You are a helpful assistant.';
const promptImprovingSystemPrompt = `You are a professional prompt engineer.
Your task is to improve the input prompt, apply different prompt engineering techniques, return to the improved prompt and provide a feedback that explains what improvements you made and the reasons behind them in order to better enable the user to learn prompt engineering.
The output is formatted into a JSON structure with "improvedPrompt" and "feedback" keys.
{"improvedPrompt": "string","feedback": "string"}`;

const promptImprovingUserPrompt = computed(() => {
    return `${userPromptInput.value}
---
The user inputted prompt is above, now try to improve it and return in given JSON format.`;
});

const gpt3ModelName = 'gpt-3.5-turbo-1106';

async function openaiRequest(systemPrompt: string, contentPrompt: string, isJsonMode: boolean = false, model: string = 'gpt-4-1106-preview') {
    openai.apiKey = generalStore.apiKey;

    if (isJsonMode) {
        try {
            const completion = await openai.chat.completions.create({
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: contentPrompt }
                ],
                model: 'gpt-4-1106-preview',
                response_format: { type: 'json_object' }
            });

            console.log(completion.choices[0].message.content);
            return completion.choices[0].message.content;
        } catch (err) {
            console.error(err);
            message.error('OpenAI API Request Failed\n' + err);
        }
    } else {
        try {
            const completion = await openai.chat.completions.create({
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: contentPrompt }
                ],
                model
            });

            console.log(completion.choices[0].message.content);
            return completion.choices[0].message.content;
        } catch (err) {
            console.error(err);
            message.error('OpenAI API Request Failed\n' + err);
        }
    }
}

function handleSubmit() {
    if (generalStore.apiKey === '') {
        message.error('Please set your OpenAI API Key first');
        generalStore.isAPIKeyModalVisible = true;
        return;
    }

    if (userPromptInput.value === '') {
        userInputStatus.value = 'error';
        userInputFeedback.value = 'Please input your prompt first';
        return;
    }

    userInputStatus.value = 'success';
    showFeedback.value = true;
    isPromptLoading.value = true;
    isFirstResLoading.value = true;
    isSecondResLoading.value = true;

    openaiRequest(promptImprovingSystemPrompt, promptImprovingUserPrompt.value, true).then((response) => {
        if (response) {
            const responseObject = JSON.parse(response);
            improvedPrompt.value = responseObject.improvedPrompt;
            promptFeedback.value = responseObject.feedback;
            userInputStatus.value = '';

            openaiRequest(modelSystemPrompt, improvedPrompt.value, false).then((response) => {
                if (response) {
                    improvedPromptResponse.value = response;
                } else {
                    message.error('OpenAI API Request Failed');
                }
                isSecondResLoading.value = false;
            });
        } else {
            message.error('OpenAI API Request Failed');
            showFeedback.value = false;
        }
        isPromptLoading.value = false;
    });

    openaiRequest(modelSystemPrompt, userPromptInput.value, false, gpt3ModelName).then((response) => {
        if (response) {
            userPromptResponse.value = response;
        } else {
            message.error('OpenAI API Request Failed');
            showFeedback.value = false;
        }
        isFirstResLoading.value = false;
    });
}

function clearAll() {
    userPromptInput.value = '';
    improvedPrompt.value = '';
    userPromptResponse.value = '';
    improvedPromptResponse.value = '';
    promptFeedback.value = '';
    showFeedback.value = false;
    userInputStatus.value = '';
    userInputFeedback.value = '';
}
</script>

<style scoped>
.title {
    font-size: 4em;
    font-weight: 700;
    margin: 8rem 0 1em 0;
    user-select: none;
}

.content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: calc(100vh - 8em);
}

.textarea {
    width: 30em;
}

.main-body {
    margin-bottom: 8rem;
}
</style>
