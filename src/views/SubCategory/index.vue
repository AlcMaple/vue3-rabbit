<script setup>
import { ref, onMounted } from "vue";
import { getCategoryFilterAPI, getSubCategoryAPI } from "@/apis/category";
import { useRoute } from "vue-router";
import GoodsItem from "../Home/components/GoodsItem.vue";

const route = useRoute();

// 获取面包屑导航数据
const filterData = ref({});
const getFilterData = async () => {
  try {
    // console.log(route.params.id);
    const res = await getCategoryFilterAPI(route.params.id);
    // console.log(res);
    filterData.value = res.result;
    console.log("二级分类 - 面包屑导航数据：", res.result);
  } catch (error) {
    console.error("Failed to fetch filter data:", error);
  }
};

onMounted(() => {
  getFilterData();
});

// 获取基础列表数据渲染
const goodList = ref([]);
const reqData = ref({
  categoryId: route.params.id,
  // 设置初始页码为1
  page: 1,
  // 设置每页显示条数
  pageSize: 20,
  //   根据发布时间排序
  sortField: "publishTime",
});
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value);
  console.log(res);
  goodList.value = res.result.items;
};
onMounted(() => getGoodList());

const tabChange = () => {
  console.log("Tab切换了", reqData.value.sortField);
  // reqData.value.page = 1;
  getGoodList();
};

// 加载更多
const disabled = ref(false);
const load = async () => {
  // 获取下一页的数据
  reqData.value.page++;
  const res = await getSubCategoryAPI(reqData.value);
  goodList.value = [...goodList.value, ...res.result.items];
  // 加载完毕 停止监听
  //   console.log(res.result.items.length);
  // 如果没有数据了，则停止监听
  if (res.result.items.length === 0) {
    console.log(res.result.items.length);
    disabled.value = true;
  }
};
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${filterData.parentId}` }"
          >{{ filterData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ filterData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <!-- 使用v-model绑定reqData.sortField，实现选中标签页的双向绑定 -->
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div
        class="body"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
      >
        <!-- 商品列表-->
        <!-- :goods="goods"，将当前商品数据传递给GoodsItem组件 -->
        <GoodsItem v-for="goods in goodList" :goods="goods" :key="goods.id" />
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    justify-content: space-between;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>