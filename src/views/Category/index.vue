<script setup>
import { getTopCategoryAPI } from "@/apis/category";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { getBannerAPI } from "@/apis/home";
import GoodsItem from "../Home/components/GoodsItem.vue";

import { useBanner } from './composables/useBanner'
import { useCategory } from './composables/useCategory'
const { bannerList } = useBanner()
const { categoryData } = useCategory()

// const categoryData = ref({});
// // 获取当前路由信息（路径、参数和params、query等属性）
// const route = useRoute();
// const getCategory = async (id) => {
//   // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
//   const res = await getTopCategoryAPI(id);
//   categoryData.value = res.result;
//   // downloadData(categoryData.value);
// };
// // 传入当前路由的id参数
// getCategory(route.params.id);

// // 获取banner
// const bannerList = ref([]);

// const getBanner = async () => {
//   const res = await getBannerAPI({
//     distributionSite: "2",
//   });
//   console.log(res);
//   bannerList.value = res.result;
//   // downloadData(bannerList.value);
// };

// onMounted(() => getBanner());

const downloadData = (data) => {
  // 将categoryList的数据转换为JSON文件
  const jsonData = JSON.stringify(data, null, 2); // 格式化JSON
  // 创建Blob对象用于下载json格式数据
  const blob = new Blob([jsonData], { type: "application/json" });
  // 使用URL.createObjectURL()来生成一个可下载的文件链接
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sortBannerList.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 轮播图 -->
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.imgUrl" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- 分类列表 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryData.children" :key="i.id">
            <RouterLink :to="`/category/sub/${i.id}`">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div
        class="ref-goods"
        v-for="item in categoryData.children"
        :key="item.id"
      >
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.home-banner {
  width: 1240px;
  margin: 0 auto;
}

.top-category {
  width: 1500px;
  margin: 0 auto;

  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      list-style: none;
      justify-content: space-between;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
    margin-left: 130px;
  }
}
</style>