<script setup lang="ts">
import Test from '@/api/test';
import { useRequest } from '@/hooks';
import { useDateFormat } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores/counter';

const { data, run } = useRequest(Test.testRequest, [
  {
    recipeId: 180777,
    weekDay: 1,
    token: '5214fde8-ef6a-4048-b337-95340f09e9d6',
    schoolId: 6101130670,
  },
  { a: 33 },
]);

const formatterDate = useDateFormat(new Date().getTime(), 'YYYY-MM-DD');

const counterStore = useCounterStore();
const { count } = storeToRefs(counterStore);
const { increment, incrementSync } = counterStore;
function test() {
  run({
    recipeId: 180777,
    weekDay: 2,
    token: '5214fde8-ef6a-4048-b337-95340f09e9d6',
    schoolId: 6101130670,
  });
  console.log(data.value);
}
</script>

<template>
  <div class="about" flex-col align-center justify-center>
    <h1>This is an about page</h1>
    <h1>{{ data?.data[0].nutrientEval }}</h1>
    <h1>{{ data?.data[0].persent }}</h1>
    <h1>{{ formatterDate }}</h1>
    <h1>{{ count }}</h1>
    <el-button type="primary" @click="test">useRequest again</el-button>
    <br />
    <el-button type="primary" @click="increment">Count</el-button>
    <br />
    <el-button type="primary" @click="incrementSync">{{
      counterStore.doubleCount
    }}</el-button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
