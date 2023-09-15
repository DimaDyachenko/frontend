<template>
  <div>
    <div class="tabs">
      <button
        class="tab-button"
        :class="{ active: activeTab === 'transport' }"
        @click="changeTab('transport')"
      >
        Transport
      </button>
      <button
        class="tab-button"
        :class="{ active: activeTab === 'routes' }"
        @click="changeTab('routes')"
      >
        Routes
      </button>
    </div>
    <div class="tab-content">
      <div v-if="activeTab === 'transport'">
        <!-- Display Transport Tab Content -->
        <TransportTab />
      </div>
      <div v-else-if="activeTab === 'routes'">
        <!-- Display Routes Tab Content -->
        <RoutesTab />
      </div>
    </div>
  </div>
</template>

<script>
import RoutesTab from "@/layouts/Routes.vue";
import TransportTab from "@/layouts/Transport.vue";

export default {
  components: {
    TransportTab,
    RoutesTab,
  },
  data() {
    return {
      activeTab: "routes",
    };
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<style>
@import "styles/main.scss";
.tabs {
  display: flex;
  justify-content: center;
  margin: 20px;
}

.tab-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 18px;
}

.tab-button.active {
  font-weight: bold;
}

.tab-content {
  margin-top: 20px;
}
</style>

