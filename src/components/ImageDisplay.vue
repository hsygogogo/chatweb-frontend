<template>
  <div class="carousel-container" ref="carouselContainer">
    <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div
        class="carousel-slide"
        v-for="(image, index) in images"
        :key="index"
      >
        <img :src="image" alt="carousel image" />
      </div>
    </div>
    <button class="carousel-button prev" @click="prevImage">&#10094;</button>
    <button class="carousel-button next" @click="nextImage">&#10095;</button>
  </div>
</template>

<script>
export default {
  name: "ImageDisplay",
  data() {
    return {
      images: [
        require('../assets/logo.png'),
        require('../assets/logo.png'),
        require('../assets/logo.png'),
        // 添加更多图片URL
      ],
      currentIndex: 0,
      autoPlayInterval: null,
    };
  },
  methods: {
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevImage() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    startAutoPlay() {
      // 如果已经有一个定时器在运行，则先清除它
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
      }
      // 设置一个新的定时器，每隔3秒调用一次nextImage方法
      this.autoPlayInterval = setInterval(this.nextImage, 3000);
    },
    stopAutoPlay() {
      // 清除定时器
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    }
  },
  mounted() {
    // 组件挂载后开始自动播放
    this.startAutoPlay();
  },
  beforeDestroy() {
    // 组件销毁前停止自动播放
    this.stopAutoPlay();
  },
};
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 80%;
  margin: auto;
  overflow: hidden;
  border: 2px solid #ddd;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
  box-sizing: border-box;
}

.carousel-slide img {
  width: 100%;
  height: 200px;
  display: block;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
}

.carousel-button.prev {
  left: 10px;
}

.carousel-button.next {
  right: 10px;
}
</style>
