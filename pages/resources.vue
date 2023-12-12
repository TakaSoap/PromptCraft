<template>
    <div class="content-resources">
        <n-space vertical :size="34">
            <div>
                <n-h1 prefix="bar"> Related Readings on Prompt Engineering Techniques</n-h1>
                <n-list hoverable clickable bordered>
                    <n-list-item v-for="reading in readings" @click="handleClick(reading.link)">
                        <template #prefix>
                            <n-icon size="24">
                                <DocumentTextOutline />
                            </n-icon>
                        </template>
                        <n-thing>
                            <template #header>
                                <div style="margin-bottom: 0">{{ reading.title }}</div>
                            </template>
                            <template #description>{{ reading.description }}</template>
                        </n-thing>
                        <template #suffix>
                            <n-icon size="24">
                                <ChevronForwardOutline />
                            </n-icon>
                        </template>
                    </n-list-item>
                </n-list>
            </div>
            <div>
                <n-h1 prefix="bar"> Useful Websites</n-h1>
                <n-list hoverable clickable bordered>
                    <n-list-item v-for="website in websites" @click="handleClick(website.link)">
                        <n-thing>
                            <template #header>
                                <div style="margin-bottom: 0">{{ website.title }}</div>
                            </template>
                            <template #description>{{ website.description }}</template>
                        </n-thing>
                        <template #suffix>
                            <n-icon size="24">
                                <ChevronForwardOutline />
                            </n-icon>
                        </template>
                    </n-list-item>
                </n-list>
            </div>
            <div>
                <n-h1 prefix="bar">Online Courses</n-h1>
                <n-list hoverable clickable bordered>
                    <n-list-item v-for="course in courses" @click="handleClick(course.link)">
                        <n-thing>
                            <template #header>
                                <div style="margin-bottom: 0">{{ course.title }}</div>
                            </template>
                            <template #description>{{ course.description }}</template>
                        </n-thing>
                        <template #suffix>
                            <n-icon size="24">
                                <ChevronForwardOutline />
                            </n-icon>
                        </template>
                    </n-list-item>
                </n-list>
            </div>
            <div>
                <n-h1 prefix="bar">Communities</n-h1>
                <n-list hoverable clickable bordered>
                    <n-list-item v-for="community in communities" @click="handleClick(community.link)">
                        <template #prefix>
                            <n-icon size="24" :component="community.icon" />
                        </template>
                        <n-thing>
                            <template #header>
                                <div style="margin-bottom: 0">{{ community.title }}</div>
                            </template>
                        </n-thing>
                        <template #suffix>
                            <n-icon size="24">
                                <ChevronForwardOutline />
                            </n-icon>
                        </template>
                    </n-list-item>
                </n-list>
            </div>
        </n-space>
    </div>
</template>

<script setup lang="ts">
import { DocumentTextOutline, ChevronForwardOutline, LogoDiscord, LogoReddit } from '@vicons/ionicons5';

const readings = [
    {
        title: 'Techniques to improve reliability',
        description:
            'An article written by Ted Sanders that explains how users can improve the reliability of our large language model outputs with Prompt Engineering.',
        link: 'https://cookbook.openai.com/articles/techniques_to_improve_reliability'
    },
    {
        title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models',
        description: 'Wei, J., Wang, X., Schuurmans, D., Bosma, M., Ichter, B., Xia, F., Chi, E., Le, Q. V., & Zhou, D. (2022)',
        link: 'https://proceedings.neurips.cc/paper_files/paper/2022/hash/9d5609613524ecf4f15af0f7b31abca4-Abstract-Conference.html'
    },
    {
        title: 'A Prompt Pattern Catalog to Enhance Prompt Engineering with ChatGPT',
        description: 'White, J., Fu, Q., Hays, S., Sandborn, M., Olea, C., Gilbert, H., Elnashar, A., Spencer-Smith, J., & Schmidt, D. C. (2023)',
        link: 'https://doi.org/10.48550/arXiv.2302.11382'
    },
    {
        title: 'Large Language Models Understand and Can be Enhanced by Emotional Stimuli',
        description: 'Li, C., Wang, J., Zhang, Y., Zhu, K., Hou, W., Lian, J., Luo, F., Yang, Q., & Xie, X. (2023)',
        link: 'https://doi.org/10.48550/arXiv.2307.11760'
    },
    {
        title: 'Tree of Thoughts: Deliberate Problem Solving with Large Language Models',
        description: 'Yao, S., Yu, D., Zhao, J., Shafran, I., Griffiths, T. L., Cao, Y., & Narasimhan, K. (2023)',
        link: 'https://doi.org/10.48550/arXiv.2305.10601'
    }
];

const websites = [
    {
        title: 'ChatGPT',
        description:
            'An advanced language generation AI developed by OpenAI that can converse, answer questions, and provide information on a wide range of topics in a human-like manner.',
        link: 'https://chat.openai.com/'
    },
    {
        title: 'POE',
        description: 'A platform with a wide variety of bots powered by models from several sources, trained by different companies.',
        link: 'https://poe.com/'
    }
];

const courses = [
    {
        title: 'DeepLearning.AI',
        description:
            'Contains a range of free courses, from Generative AI for Everyone to Building Systems with the ChatGPT API, for either who interested in AI or AI developers.',
        link: 'https://www.deeplearning.ai/'
    },
    {
        title: 'AI Literacy for Education',
        description:
            'An online course develop by HKU that teaches the basics and applications of artificial intelligence, especially generative AI, in education.',
        link: 'https://tl.hku.hk/2023/08/ai-literacy-for-education/'
    }
];

const communities = [
    {
        title: 'OpenAI Discord Server',
        icon: LogoDiscord,
        link: 'https://discord.com/invite/openai'
    },
    {
        title: 'ChatGPT Reddit Community',
        icon: LogoReddit,
        link: 'https://www.reddit.com/r/ChatGPT/'
    }
];

function handleClick(link: string) {
    window.open(link, '_blank');
}
</script>

<style>
/* different margin in different screens (responsive) */

.content-resources {
    /* Default margin */
    margin: 4em 10em;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 8em);
}

/* Media queries for different screen sizes */
@media screen and (max-width: 1024px) {
    .content-resources {
        /* Mobile margin */
        margin: 2em;
    }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
    .content-resources {
        /* Tablet margin */
        margin: 3em 6em;
    }
}

@media screen and (min-width: 1025px) {
    .content-resources {
        /* PC margin */
        margin: 4em 10em;
    }
}

.n-list-item__prefix {
    max-height: 24px;
}
.n-list-item__suffix {
    max-height: 24px;
}
.n-thing-header {
    margin-bottom: 0 !important;
}
</style>
