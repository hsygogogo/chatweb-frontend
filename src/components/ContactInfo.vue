<template>
  <div class="contactWrapper">
    <div class="contactInfo" :style="{ width: isWindowsDevice ? '40%' : '90%'}">
      <div class="contactInfoItem">About</div>
      <div class="contactInfoItem">Hire</div>
      <div class="contactInfoItem">Business</div>
      <div class="contactInfoItem">Contact</div>
      <div class="contactInfoItem"><img :src="image" alt="QR code" /></div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'ContactInfo',
  data() {
    return {
      image: require("../assets/QR_code.png"),
    }
  },
  computed: {
    isWindowsDevice() {
      return this.$device.windows;
    },
  },
};
</script>

<style scoped>

.contactWrapper {
  position: relative;
  height: 60px;
  margin: 20px;
}

.contactInfo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 使用变换将子块移到中心 */
  background-color: gray;
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 0px solid blue;
}

.contactInfoItem {
  display: flex;
  align-items: center;
  font-family: Arial, sans-serif;
  color: white;
  border: 0px solid green;
}
img {
  width: 50px;
  height: 50px;
}
</style>
