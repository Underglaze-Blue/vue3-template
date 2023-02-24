# dietcare-new

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# 技术选型



Vue3 + ts + vite + router + Pinia + eslint + husky + element-plus + echarts + sass + axios + UnoCSS + vueUse



`ts` : 类型检查

`vite` : 构建工具

`router`: 路由

`pinia` : 状态管理

`eslint`: 代码规范校验

`husky`: git提交钩子

`element-plus`: UI框架

`sass`: css 预处理器

`echarts`:   Apache 图表库

`axios`: http请求

`UnoCSS`: 原子化 css

`vueUse`: hooks 库



# 插件库文档等

`vueUse`： https://vueuse.org/

`UnoCSS`:  https://uno.antfu.me/

`element-plus`: https://element-plus.gitee.io/zh-CN/

`pinia-plugin-persistedstate`: https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/config.html   持久化数据



# 说明

## UnoCSS

`UnoCSS`是一个原子化的 css 库，兼容了其他主流的原子 CSS 的写法， 这里有个作者的文章 [重新构想原子化 CSS（antfu.me）](https://antfu.me/posts/reimagine-atomic-css-zh), 可以了解一下原子化 css 是什么（只需要半个小时，你就会爱上这个东西）



### 基本配置

```ts
// vite.config.ts

import UnoCSS from '@unocss/vite';
import { presetAttributify, presetUno } from 'unocss';

export default defineConfig({
  // ...
		plugins: [
			UnoCSS({
        presets: [presetAttributify(), presetUno()],
      }),
		]
})
```

```ts
// main.ts
import 'uno.css';
```

默认的 `UnoCSS` 是按照 `rem` 的 __四分之一__ 来计算宽高的，所以给 `html` 设置 `font-size:4px;` ，可以让`UnoCSS` 按照我们的预期呈现样式

**方便unocss计算：1单位 = 0.25rem = 1px**

### 基本使用

```tsx
<div bg-red-300 b-rd-3 w-100 h-100></div>
<div
  bg-green-400
  b-rd-3
  w-100
  h-100
  ml-20
></div>
```

会生成两个 `div` 块，宽高都是 100（`w-100 h-100`）， 圆角为 3px （`b-rd-3`），`bg-red-300` 和 `bg-green-400` 为背景色，可以通过 https://uno.antfu.me/?s=color 查看颜色呈现效果



## vueUse

首先需要理解 `hooks` 组合式函数，按照[官方定义](https://cn.vuejs.org/guide/reusability/composables.html)

> 在 Vue 应用的概念中，“组合式函数”(Composables) 是一个利用 Vue 的组合式 API 来封装和复用**有状态逻辑**的函数。
>
> 当构建前端应用时，我们常常需要复用公共任务的逻辑。例如为了在不同地方格式化时间，我们可能会抽取一个可复用的日期格式化函数。这个函数封装了**无状态的逻辑**：它在接收一些输入后立刻返回所期望的输出。复用无状态逻辑的库有很多，比如你可能已经用过的 [lodash](https://lodash.com/) 或是 [date-fns](https://date-fns.org/)。
>
> 相比之下，有状态逻辑负责管理会随时间而变化的状态。一个简单的例子是跟踪当前鼠标在页面中的位置。在实际应用中，也可能是像触摸手势或与数据库的连接状态这样的更复杂的逻辑。

也就是说，我们可以把逻辑抽离出来，形成一个独立的文件或者封装，在需要的地方调用



`vueUse` 就是一个大型的` hooks` 库，有很多已经封装好的方法，可以直接使用

例： 日期格式化 `useDateFormat`

```tsx
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
const formatterDate = useDateFormat(+new Date(), 'YYYY-MM-DD');
</script>
<template>
<p>{{ formatterDate }}</p>
</template>
```

官方文档有很多其他的例子，需要的时候可以直接使用



## 代码提交说明 - 重要

> 真诚的建议，不要一次性提交太多的文件，eslint 自动修复 加上 vscode ，很可能给你修复没了。
>
> 除非你保证你的文件 eslint 错误很少，需要修复的比较少

项目中 使用了 `husky` 来处理`git` 提交钩子，使用了 `commitizen` 来统一 `commit` 的风格

```shell
# 添加提交文件
git add .  
# 提交commit
yarn commit 
# or
# npm run commit
```

然后会进行 `eslint` 的校验及 `prettier` 的修复

如果最后 没有 `eslint` 的报错，则会 添加成功，此时通过 `git push` 就可以提交了

如果 `eslint` 有报错，则需求修复报错后，重新从 `git add .` 开始



## eslint规则

> 已经配置好的 `extends` 的顺序，轻易不要打乱，不然可能会出现 `ts` 报错，比较麻烦

除 vue 的默认规则外，额外添加了 [airbnb-base](https://github.com/airbnb/javascript) 的规则

在开发过程中，如非必要，则不要修改 `eslint` 规则，按照报错进行修改



## axios 请求

关于 axios 请求的封装，借鉴了 https://github.com/ywanzhou/vue3-template/blob/master/src/service/request/index.ts ，在此基础上针对于 知了 和 其他的请求做了区分，分成了两个实例

```ts
import type { IApi } from './http.type';

const Api: IApi = {
  http: Instance,
  zlHttp: ZlInstance,
};
```

## useRequest

useRequest 借鉴了 https://github.com/yanzhandong/v3hooks/tree/master/packages/useRequest ，在封装的过程中，

- 删掉了一些业务用不到的冗余的内容
- 对于返回的 `response` 做了类型规定
- 请求参数和 `options` 配置进行了分离
- 对于多个参数进行了处理

使用示例

```ts
// api
import Api from '@/service/request';
import type { NormalizeData } from '@/service/request/http.type';

interface TestType {
  recipeId: string | number;
  weekDay: number;
  token: string;
  schoolId: number;
}
interface SuccessType {
  nutrientEval: string;
  nutrientId: string;
  nutrientName: string;
  persent: string;
  remark: string;
  standardWeight: string;
  weight: string;
}

export default class Test {
  static testRequest(
    params?: TestType,
    data?: any
  ): Promise<NormalizeData<SuccessType[]>> {
    return Api.http.postFormData<SuccessType[]>(
      '/gateway/dietcare/saas/diet/evaluation/getEvaluations',
      params,
      data
    );
  }
}

```

```tsx
// about.vue
<script>
import { useRequest } from '@/hooks';
const { data, run } = useRequest(Test.testRequest, [
  {
    recipeId: 180777,
    weekDay: 1,
    token: 'xxx-xxx-xxx',
    schoolId: 6101130670,
  },
  { a: 33 },
]);
</script>
```



## element-plus 主题色覆盖

在 `assets/styles/element/index.scss` 中，进行 `elemen`t 的主题色设置，具体文档见https://element-plus.gitee.io/zh-CN/guide/theming.html 

这里采用的引入方式是自动引入，配置如下

```ts
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/styles/element/index.scss" as *;',
      },
    },
  },
})
```

## 其他说明

- `.cz-config.js` -- `git` 提交校验的自定义配置文件
- `commitlint.config.js` -- `git` 钩子校验
- `.prettierrc.json` -- `pretter` 格式化规则
