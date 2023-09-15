<template>
  <v-menu
    ref="dateMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
    max-width="290px"
  >
    <template v-slot:activator="{ props }">
      <v-text-field
        :label="label"
        :aria-required="isRequired"
        prepend-inner-icon="event"
        v-bind="props"
        v-model="formattedDateValue"
        @focus="focusDate"
        @blur="blurDate"
      >
      </v-text-field>
    </template>
    <v-date-picker
      v-model="dateValue"
      no-title
      @change="handleDateInput"
      @click:save="handleDateInput"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      dateMenu: false,
      dateValue: null,
    };
  },
  props: {
    value: {

    },
    label: {
      type: String,
      required: true,
    },
    isRequired: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    focusDate() {
      setTimeout(() => {
        if (!this.dateMenu) {
          this.dateMenu = true;
        }
      }, 200);
    },
    blurDate() {
      setTimeout(() => {
        if (this.dateMenu) {
          this.dateMenu = false;
        }
      }, 200);
    },
    handleDateInput() {
      this.dateMenu = false;
    },
  },
  computed: {
    formattedDateValue() {
      return this.dateValue ? this.dateValue.toLocaleDateString() : "";
    },
  },
};
</script>
