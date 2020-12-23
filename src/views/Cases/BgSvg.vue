<template>
  <div class="demo">
    <p>背景图</p>
    <div class="img1"></div>
    <div class="img2"></div>
    <!-- 图3 -->
    <p>图片</p>
    <img src="~@/assets/svg/model-trans.svg" width="100">
    <img src="~@/assets/image/logo.png" width="100">
  </div>
</template>
<style>
    .img1{
        width: 100px;
        height: 100px;
        background: url('~@/assets/svg/model-trans.svg') center center no-repeat;
        background-size: 100px auto;
    }
    .img2{
        width: 100px;
        height: 100px;
        background: url('~@/assets/image/logo.png') center center no-repeat;
        background-size: 100px auto;
    }
</style>