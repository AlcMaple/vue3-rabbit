<script setup>
import HomePanel from "./HomePanel.vue";
import { getHotAPI } from "@/apis/home";
import { onMounted, ref, nextTick } from "vue";

const hotList = ref([]);
const getHotList = async () => {
  const res = await getHotAPI();
  console.log(res);
  hotList.value = res.result;

  // downloadData(hotList.value);
};
onMounted(() => {
  getHotList();

  getHotList().then(() => {
    nextTick(() => {
      // 现在DOM应该已经更新了
      console.log(document.querySelector(".goods-list"));
    });
  });
});

const downloadData = (data) => {
  // 将categoryList的数据转换为JSON文件
  const jsonData = JSON.stringify(data, null, 2); // 格式化JSON
  // 创建Blob对象用于下载json格式数据
  const blob = new Blob([jsonData], { type: "application/json" });
  // 使用URL.createObjectURL()来生成一个可下载的文件链接
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "hotListData.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

console.log(hotList);
</script>

<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过"></HomePanel>
  <ul class="goods-list" v-if="hotList.length">
    <li v-for="item in hotList" :key="item.id">
      <RouterLink to="/">
        <img v-img-lazy="item.picture" alt="" />
        <p class="name">{{ item.title }}</p>
        <p class="desc">{{ item.alt }}</p>
      </RouterLink>
    </li>
  </ul>
  <p v-else>正在加载中...</p>
</template>

<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    transition: all 0.5s;
    list-style: none;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>