<script setup>
import HomePanel from "./HomePanel.vue";
import { findNewAPI } from "@/apis/home";
import { onMounted, ref } from "vue";
const newList = ref([]);
const getNewList = async () => {
  const res = await findNewAPI();
  newList.value = res.result;

  // downloadData(newList.value);
};

onMounted(() =>  getNewList())

const downloadData = (data) => {
  // 将categoryList的数据转换为JSON文件
  const jsonData = JSON.stringify(data, null, 2); // 格式化JSON
  // 创建Blob对象用于下载json格式数据
  const blob = new Blob([jsonData], { type: "application/json" });
  // 使用URL.createObjectURL()来生成一个可下载的文件链接
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "newListData.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
</script>

<template>
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <template #main>
      <ul class="goods-list">
        <li v-for="item in newList" :key="item.id">
          <RouterLink :to="`/detail/${item.id}`">
            <img :src="item.picture" alt="" />
            <p class="name">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
    </template>
  </HomePanel>
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    list-style: none;
    background: #f0f9f4;
    transition: all 0.5s;

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
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>