<template>
  <div class="tab-control">
    <div v-for="(item,key) in title" :key="key" class="tab-control-items" 
    :class = "{active: key === isActive}"
    @click = "itemclick(key)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name:'tabcontrol',
  props: {
    title: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isActive: 0
    };
  },
  methods: {
    itemclick(key) {
      this.isActive = key
      this.$emit('SwitchClick',key) /* 发送自定义事件，带一个参数key */
    }
  }
 }
</script>
<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 18px;
  height: 40px;
  line-height: 40px;
}
.tab-control-items {
  flex: 1;
} 
.tab-control-items span {
  padding: 3px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-high-text);
}
</style>