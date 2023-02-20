<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <el-button @click="test">TEST</el-button> -->
  </div>
</template>

<script setup lang="ts">
import request from '@/http/http';

function test() {
  request
    .request({
      url: 'https://testgateway.imeduplus.com/eduplus-uc/wx/uc/applet/querySchoolListByUser?userId=5119759&externalUserNo=5119759&token=6cc4269f-d262-4b37-a06b-70b26b2956c3&schoolId=6101160137&code=',
      method: 'get',
      headers: {
        token: '536593e0-64ae-4ef9-85ec-dca2fb86500f',
      },
    })
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
