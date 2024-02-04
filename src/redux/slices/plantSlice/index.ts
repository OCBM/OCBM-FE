import { MACHINE_LINE_SERVICES } from '@/services/machineLineServices';
import { PLANT_SERVICES } from '@/services/plantServices';
import { SHOP_SERVICES } from '@/services/shopServices';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  shops: {
    data: [],
    loading: false,
    selectedShop: {},
  },
  plants: {
    data: [],
    loading: false,
    selectedPlant: {},
    plantToggle: false,
  },
  machines: {
    data: [],
    loading: false,
    selectedMachine: {},
  },
  show: 'plant',
  currentPlant: '',
  allPlants: [],
};

export const plantData = createAsyncThunk('plants/plantData', (id: any) => {
  return PLANT_SERVICES.getAllPlantsbyUserid(id);
});

export const fetchShopsByPlantId = createAsyncThunk('shops/fetchShopsByPlantId', (data: any) => {
  return SHOP_SERVICES.getAllShopsByPlantId(data);
});

export const fetchMachineLineByShopId = createAsyncThunk('machineLine/fetchMachineLineByShopId', (data: any) => {
  return MACHINE_LINE_SERVICES.getMachineLinesByShopId(data);
});

const PlantSlice = createSlice({
  name: 'plants',
  initialState,
  reducers: {
    toggleShopOpen: (state, { payload }) => {
      state.show = payload;
    },
    resetPlantData: (state) => {
      state.show = 'plant';
      state.plants = initialState.plants;
      state.shops = initialState.shops;
      state.machines = initialState.machines;
    },
    togglePlantOpen: (state) => {
      state.plantToggle = !state.plantToggle;
    },
    setSelectedPlant: (state, { payload }) => {
      state.plants.selectedPlant = payload;
    },
    setSelectedShop: (state, { payload }) => {
      state.shops.selectedShop = payload;
    },
    setSelectedMachine: (state, { payload }) => {
      state.machines.selectedMachine = payload;
    },
    setCurrentPlant: (state, { payload }) => {
      state.currentPlant = payload;
    },
    setAllPlants: (state, { payload }) => {
      state.allPlants = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(plantData.pending, (state: any) => {
        state.plants.loading = true;
      })
      .addCase(plantData?.fulfilled, (state, { payload }) => {
        state.plants.loading = false;
        state.plants.data = payload?.message;
      })
      .addCase(fetchShopsByPlantId.pending, (state: any) => {
        state.shops.loading = true;
      })
      .addCase(fetchShopsByPlantId.fulfilled, (state, { payload }) => {
        state.shops.loading = false;
        state.shops.data = payload.message;
      })
      .addCase(fetchMachineLineByShopId.pending, (state: any) => {
        state.machines.loading = true;
      })
      .addCase(fetchMachineLineByShopId.fulfilled, (state, { payload }) => {
        state.machines.loading = false;
        state.machines.data = payload.message;
      });
  },
});

export default PlantSlice.reducer;
export const {
  toggleShopOpen,
  setSelectedPlant,
  setSelectedShop,
  setSelectedMachine,
  togglePlantOpen,
  resetPlantData,
  setCurrentPlant,
  setAllPlants,
} = PlantSlice.actions;
