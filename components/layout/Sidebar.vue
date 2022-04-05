<template>
  <el-aside>
    <div>
      <div class="sidebar_logo_div">
        <img src="/logo.png" alt="logo" width="180px" />
      </div>
      <br />
      <el-menu :default-openeds="['1']" router active-text-color="black">
        <el-menu-item index="1" :route="{ path: '/' }">
          <i class="el-icon-s-data"></i>
          Dasboard</el-menu-item
        >
        <el-menu-item index="2" :route="{ path: '/calendar' }">
          <i class="el-icon-shopping-cart-full"></i>
          Orders</el-menu-item
        >

        <el-menu-item index="4-1" :route="{ path: '/products' }">
          <i class="el-icon-goods mr-5"></i>
          Products
        </el-menu-item>

        <!-- <el-menu-item index="3">Memberships</el-menu-item> -->
        <el-menu-item index="3">
          <i class="el-icon-s-custom"></i>
          Vendors</el-menu-item
        >

        <el-menu-item index="3">
          <i class="el-icon-money"></i>
          Payments</el-menu-item
        >

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-menu"></i>
            Manage</template
          >
          <el-menu-item-group>
            <el-menu-item index="4-3" :route="{ path: '/trainers' }"
              >Stores</el-menu-item
            >
            <el-menu-item index="4-2" :route="{ path: '/facilities' }">
              Categories</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            System</template
          >
          <el-menu-item-group>
            <el-menu-item index="5-1" :route="{ path: '/memberships' }"
              >Users</el-menu-item
            >
            <el-menu-item index="5-2" :route="{ path: '/clients' }"
              >Currency</el-menu-item
            >

            <el-menu-item index="5-3" :route="{ path: '/clients' }"
              >Country</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>

    <!-- <div>
      <el-menu router active-text-color="rgb(229, 221, 241);">
        <el-menu-item index="6" :route="{ path: '/' }">
          <i class="el-icon-setting"></i>
          Settings</el-menu-item
        >
        <el-menu-item index="7" :route="{ path: '/schedules' }">
          <i class="el-icon-help"></i>
          Help</el-menu-item
        >
      </el-menu>
    </div> -->
  </el-aside>
</template>

<script>
export default {
  name: 'Sidebar',
}
</script>

<style lang="scss" scoped>
.el-aside {
  width: 250px !important;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: margin 0.6s ease-in-out 0s;

  .sidebar_logo_div {
    box-shadow: 0 2px 10px rgb(0 0 0 / 8%);
    padding: 15px 15px 13px 15px;
    background-color: #fff;
  }
}

.el-menu {
  background-color: transparent;
}
</style>
