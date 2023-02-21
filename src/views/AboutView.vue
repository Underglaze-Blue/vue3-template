<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button @click="test">333</el-button>
  </div>
</template>

<script setup lang="ts">
import Api from '@/service/request';

interface RequsetType {
  recipeId: string;
  weekDay: number;
  token: string;
  schoolId: number;
}

function test() {
  Api.http
    .postFormData<RequsetType>(
      'https://testsaas.imeduplus.com/gateway/dietcare/saas/diet/evaluation/getEvaluations',
      {
        recipeId: 180777,
        weekDay: 1,
        token: '5214fde8-ef6a-4048-b337-95340f09e9d6',
        schoolId: 6101130670,
      }
    )
    .then((res) => {
      console.log(res);
    });
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
