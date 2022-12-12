<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <Sidebar />

    <el-container>
      <el-header>
        <Header />
      </el-header>

      <el-main>
        <Nuxt />
      </el-main>
      <footer class="d-flex justify_between">
        <p>Dwellys © 2022. All right reserved.</p>

        <p>v-0.5.0</p>
        <!-- <a
          href="https://www.freepik.com/free-photo/facade-residential-building_7303285.htm#&position=19&from_view=detail#&position=19&from_view=detail#position=19"
          >Property Image by ArthurHidden</a
        >
        on Freepik -->
      </footer>
    </el-container>
  </el-container>
</template>

<script>
import Vue from 'vue'
import global from '~/mixins/global.ts'

Vue.mixin(global)
export default {}
</script>
