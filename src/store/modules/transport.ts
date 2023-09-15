// store/modules/transport.ts

import { ActionContext, Module } from "vuex";
import ApiService from "@/services/api";
// import { RootState } from "@/store/types"; // Import RootState type if you have it

interface Transport {
  uuid: string;
  licensePlate: string;
  status: TransportStatusType;
  model: string;
  acquisitionDate: Date;
  mileage: number;
  transportType: TransportType;
  routeId: string;
}

export type TransportType = "private" | "passenger" | "cargo";
export type StatusType = "waiting" | "ongoing";
export type TransportStatusType = "free" | "busy";

interface TransportState {
  transport: Transport[];
}

const transportModule: Module<TransportState, any> = {
  state: {
    transport: [], // Initial empty array for transport data
  },
  mutations: {
    SET_TRANSPORT(state, transport) {
      state.transport = transport;
    },
    // Add more mutations for updating and deleting transports if needed
  },
  actions: {
    async getTransport(context: ActionContext<TransportState, any>) {
      try {
        const response = await ApiService.get("/transport");
        const transport = response.data;

        context.commit("SET_TRANSPORT", transport);
      } catch (error) {
        console.error("Error fetching transport:", error);
      }
    },

    async addTransport(
      context: ActionContext<TransportState, any>,
      newTransport: Transport,
    ) {
      try {
        const response = await ApiService.post("/transport", newTransport);
        const addedTransport = response.data;

        console.log(newTransport)
        context.commit("SET_TRANSPORT", [
          ...context.state.transport,
          addedTransport,
        ]);
      } catch (error) {
        console.error("Error adding transport:", error);
      }
    },

    async removeTransport(
      context: ActionContext<TransportState, any>,
      uuid: string,
    ) {
      try {
        await ApiService.delete("/transport", { data: { uuid: uuid } });

        const updatedTransport = context.state.transport.filter(
          (transport) => transport.uuid !== uuid,
        );
        context.commit("SET_TRANSPORT", updatedTransport);
      } catch (error) {
        console.error("Error deleting transport:", error);
      }
    },

    async updateTransport(
      context: ActionContext<TransportState, any>,
      updatedTransport: Transport,
    ) {
      try {
        console.log(updatedTransport.acquisitionDate)
        const response = await ApiService.patch(`/transport`, {
          uuid: updatedTransport.uuid,
          route: {...updatedTransport, acquisitionDate: `2022-12-07`},
        });
        const updatedData = response.data;


        // Update the transport in the state with the updated data
        const updatedTransportList = context.state.transport.map((item) => {
          if (item.uuid === updatedData.uuid) {
            return updatedData;
          }
          return item;
        });

        context.commit("SET_TRANSPORT", updatedTransportList);
      } catch (error) {
        console.error("Error updating transport:", error);
      }
    },
  },
  getters: {
    getTransport: (state) => state.transport,
    // Add more getters if needed
  },
};

export default transportModule;
