<template>
  <el-dropdown trigger="click">
    <span>
      <el-badge :value="notify_count" :max="10">
        <span
          style="
            background: green;
            padding: 9px;
            border-radius: 5px;
            line-height: 40px;
            height: 40px;
          "
        >
          <i class="el-icon-bell" style="font-size: 20px; color: whitesmoke"></i
        ></span>
      </el-badge>
    </span>
    <el-dropdown-menu slot="dropdown" class="header_notify">
      <div class="notification_dropdown">
        <div class="notification_head">
          <h2>Notifications</h2>

          <span v-if="notify_count > 0"
            ><i class="el-icon-delete"></i> Clear all</span
          >
        </div>
        <div class="notification_content">
          <div v-if="notify_count > 0">
            <div class="notifications clickable">
              <div class="d-flex justify_between">
                <span>
                  <i class="el-icon-message-solid notify"></i>
                </span>
                <div>
                  <small>
                    <b>Charles</b> just made an order for a product
                  </small>
                  <!-- <span class="d-block timestamp">3 minutes ago</span> -->
                </div>
                <div>
                  <i class="el-icon-circle-close"></i>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="no-notification">
            <i class="el-icon-bell"></i>
            <p>You have no new notifications</p>
          </div>
        </div>
      </div>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Notification',
  data() {
    return {
      notify_count: 0,
    }
  },
})
</script>

<style lang="scss" scoped>
.notification_dropdown {
  width: 310px;
  height: 300px;
  border-radius: 5px;
  background: whitesmoke;
  overflow-y: scroll;

  .notification_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgb(4, 147, 65);
    border-radius: 5px 5px 0 0;
    color: white;
    padding: 10px;
    height: 60px;

    h2 {
      font-size: 16px;
    }

    span {
      color: var(--color-primary);
      cursor: pointer;
    }
  }

  .notification_content {
    .notifications {
      padding: 10px 5px;
      -webkit-box-shadow: 1px 1px 1px 1px rgb(241, 220, 220); /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
      -moz-box-shadow: 1px 1px 1px 1px rgb(241, 227, 227); /* Firefox 3.5 - 3.6 */
      box-shadow: 1px 1px 1px 1px rgb(212, 203, 203);

      img {
        width: 35px;
        border-radius: 30px;
      }

      i.notify {
        color: var(--color-primary);
        font-size: 20px;
      }

      .timestamp {
        font-size: 10px;
        font-style: italic;
      }
    }

    .no-notification {
      text-align: center;
      margin: 70px auto;

      i {
        font-size: 30px;
        color: #049340;
      }

      p {
        font-size: 17px;
      }
    }
  }
}
</style>
