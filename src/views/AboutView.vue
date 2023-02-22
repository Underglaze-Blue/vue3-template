<template>
  <div class="about" flex-col align-center justify-center>
    <h1>This is an about page</h1>
    <h1>{{ data?.data[1] }}</h1>
    <el-button @click="test">333</el-button>
  </div>
</template>

<script setup lang="ts">
import Test from '@/api/test';
import useRequest from '@/hooks/useRequest';

const { data } = useRequest(Test.testRequest, {});
function test() {
  console.log(data.value);
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
