<template>
  <div class="container">
    <div class="headerContainer">
      <h2>Transport Tab Content</h2>
      <div>
        <v-dialog v-model="editDialog" persistent width="600">
          <v-card>
            <v-card-title>
              <span class="text-h5">Edit Transport</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedTransport.licensePlate"
                      label="License Plate*"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedTransport.status"
                      :items="['free', 'busy']"
                      label="Status*"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <DatePicker
                    :date="editedTransport.acquisitionDate"
                      label="Acquisition Date*"
                      @submit="saveEditDate"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedTransport.model"
                      label="model*"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedTransport.mileage"
                      label="mileage*"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedTransport.transportType"
                      :items="['private', 'passenger', 'cargo']"
                      label="Transport type*"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedTransport.routeId"
                      :items="[
                        'd3d2e7e2-7ef7-4a37-86f7-a4f6474d0942',
                        'eb0c8c1a-2a71-4e62-884b-e06a00b50c8e',
                      ]"
                      label="Route id*"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="editDialog = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="saveEditedTransport"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props"> Add transport </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">New Transport</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newTransport.licensePlate"
                        label="License Plate*"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="newTransport.status"
                        :items="['free', 'busy']"
                        label="Status*"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <DatePicker
                        :date="newTransport.acquisitionDate"
                        label="Acquisition Date*"
                        is-required
                        @submit="saveNewDate"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newTransport.model"
                        label="model*"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="newTransport.mileage"
                        label="mileage*"
                        required
                      ></v-text-field
                    ></v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="newTransport.transportType"
                        :items="['private', 'passenger', 'cargo']"
                        label="Transport type*"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="newTransport.routeId"
                        :items="[
                          'd3d2e7e2-7ef7-4a37-86f7-a4f6474d0942',
                          'eb0c8c1a-2a71-4e62-884b-e06a00b50c8e',
                        ]"
                        label="Route id*"
                        required
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="dialog = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="addTransport"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </div>

    <v-table>
      <thead>
        <tr>
          <th class="text-left">License Plate</th>
          <th class="text-left">Status</th>
          <th class="text-left">Model</th>
          <th class="text-left">Acquisition Date</th>
          <th class="text-left">Mileage</th>
          <th class="text-left">Type</th>
          <th class="text-left">Route</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in computedTransport" :key="item.uuid">
          <td>{{ item.licensePlate }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.model }}</td>
          <td>{{ item.acquisitionDate }}</td>
          <td>{{ item.mileage }}</td>
          <td>{{ item.transportType }}</td>
          <td>{{ item.routeId.slice(0, 8) }}</td>
          <td>
            <v-menu offset-y>
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" small>mdi-dots-vertical</v-icon>
              </template>
              <v-list>
                <v-list-item @click="editItem(item)">Edit</v-list-item>
                <v-list-item @click="deleteItem(item.uuid)">Delete</v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import { computed } from "vue";
import DatePicker from "@/components/DatePicker.vue";

export default {
  components: { DatePicker },
  data() {
    return {
      transport: [],
      dialog: false,
      editDialog: false,
      dateMenu: false,
      dateValue: null,
      newTransport: {
        licensePlate: null,
        status: null,
        model: null,
        acquisitionDate: null,
        mileage: null,
        transportType: null,
        routeId: null,
      },
      editedTransport: {
        licensePlate: null,
        status: null,
        model: null,
        acquisitionDate: null,
        mileage: null,
        transportType: null,
        routeId: null,
      },
    };
  },
  props: {
    label: String,
  },

  computed: {
    // Use a computed property to get the transport data
    computedTransport() {
      return this.$store.getters["getTransport"];
    },
  },

  mounted() {
    this.$store.dispatch("getTransport");
  },

  methods: {
    closeDialog() {
      this.dialog = false;
    },

    async addTransport() {
      validateTransport(this.newTransport);
      try {
        console.log(this.newTransport)
        await this.$store.dispatch("addTransport", this.newTransport);
        this.closeDialog();
      } catch (e) {
        console.log(e);
      }
    },

    async deleteItem(uuid) {
      const index = this.transport.findIndex((item) => item.uuid === uuid);
      if (index !== -1) {
        this.transport.splice(index, 1);
      }

      await this.$store.dispatch("removeTransport", uuid);
    },

    editItem(item) {
      this.editedTransport = { ...item };
      this.editDialog = true;
    },

    async saveEditedTransport() {
      try {
        await this.$store.dispatch('updateTransport', this.editedTransport);

        this.editDialog = false;
      } catch (error) {
        console.error("Error updating transport:", error);
      }
    },

    saveNewDate(date) {
      this.newTransport.acquisitionDate = date;
    },
    saveEditDate(date) {
      this.editedTransport.acquisitionDate = date;
    }
  },

};

function validateTransport(obj) {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (value === null || value === undefined) {
        throw new Error(`${key} is ${value}`);
      } else if (typeof value === "string" && value.trim() === "") {
        throw new Error(`${key} is ${value}`);
      } else if (Array.isArray(value) && value.length === 0) {
        throw new Error(`${key} is ${value}`);
      }
    }
  }
  return true;
}
</script>
<style>
@import "src/styles/main.scss";

.headerContainer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
</style>
