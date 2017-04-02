<template>
  <div class="bills">

  <ul id="example-1">
    <li v-for="item in items">
      <span class="date">{{ item.date | date }}</span>
      <span class="title">{{ item.title }}</span>
      <span class="value">{{ item.value | currency }}</span>
    </li>
  </ul>

  </div>
</template>

<script>

import { getBills } from '../api'

export default {
  name: 'bills',
  data () {
    return {
      items: null,
      loading: false,
      error: null
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.error = this.items = null
      this.items = getBills()
    }
  },
  computed: {

  }
}
</script>
<style>

</style>
