<script setup>
import HomePanel from "./HomePanel.vue";
import { getGoodsAPI } from "@/apis/home";
import { ref, onMounted } from "vue";
import GoodsItem from "./GoodsItem.vue";
import { getViewportWidth } from "@/script/index";

const viewportWidth = getViewportWidth();

const goodsProduct = ref([]);
const getGoods = async () => {
  const { result } = await getGoodsAPI();
  goodsProduct.value = result;

  // downloadData(goodsProduct.value);
};
onMounted(() => getGoods());

const downloadData = (data) => {
  // 将categoryList的数据转换为JSON文件
  const jsonData = JSON.stringify(data, null, 2); // 格式化JSON
  // 创建Blob对象用于下载json格式数据
  const blob = new Blob([jsonData], { type: "application/json" });
  // 使用URL.createObjectURL()来生成一个可下载的文件链接
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "goodsProductData.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

console.log(goodsProduct);
</script>

<template>
  <div class="home-product">
    <div :title="cate.name" v-for="cate in goodsProduct" :key="cate.id">
      <h3>{{ cate.name }}</h3>
      <div class="box">
        <RouterLink class="cover" to="/">
          <img v-img-lazy="cate.picture" />
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list" :style="{ width : ( viewportWidth - 240 ) - 77 + 'px' }">
          <li v-for="goods in cate.goods" :key="goods.id">
            <!-- :goods="goods"：将goods传递给GoodsItem组件 -->
            <GoodsItem :goods="goods" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-product {
  background: #fff;
  margin-top: 20px;
  h3 {
    font-size: 32px;
    font-weight: normal;
    margin-left: 6px;
    height: 35px;
    line-height: 35px;
  }
  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: $xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;
    padding: 40px 0;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      width: 1603px;
      display: grid;
      // 指定网格的列数和宽度
      // auto-fill 会根据剩余空间自动分配列宽
      // 240px：不足以容纳240px时，自动计算调整列宽
      grid-template-columns: repeat(auto-fill, 240px);
      list-style: none;
      // 设置网格之间的空隙
      grid-gap: 10px;
      justify-content: space-between;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }

    .goods-item {
      display: block;
      width: 220px;
      padding: 20px 30px;
      text-align: center;
      transition: all 0.5s;

      &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
      }

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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .price {
        color: $priceColor;
        font-size: 20px;
      }
    }
  }
}
</style>