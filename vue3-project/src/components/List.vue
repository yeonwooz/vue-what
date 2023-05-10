<template>
  <div class="card my-2" v-for="item in items" :key="item.id">
    <slot :item="item" />
  </div>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
  };
</script>

<style></style>
