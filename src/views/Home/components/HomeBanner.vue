<script setup>
import { getBannerAPI } from "@/apis/home";
import { onMounted, ref } from "vue";
// import { getViewportWidth } from "@/script/index";

// const viewportWidth = getViewportWidth();
// console.log(viewportWidth); // 1920

const bannerList = ref([]);

const getBanner = async () => {
  const res = await getBannerAPI();
  console.log(res);
  bannerList.value = res.result;
  // downloadData(bannerList.value);
};

onMounted(() => getBanner());

const downloadData = (data) => {
  // 将categoryList的数据转换为JSON文件
  const jsonData = JSON.stringify(data, null, 2); // 格式化JSON
  // 创建Blob对象用于下载json格式数据
  const blob = new Blob([jsonData], { type: "application/json" });
  // 使用URL.createObjectURL()来生成一个可下载的文件链接
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "bannerListData.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
</script>

<template>
  <div class="home-banner" :style="{ left : (viewportWidth - 1200)/2 - 8 + 'px' }">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  // left: 160px;
  top: 185px;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>