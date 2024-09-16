import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCarsThunk,
  getEnginesThunk,
  getTransmissinThunk,
  postCarsThunk,
} from "./thunks";
import { CarT, EngineT, FiltersT, TransmissionT } from "@/types/db";

type stateCar = {
  cars: CarT[];
  filters: FiltersT;
  engines: EngineT[];
  transmissons: TransmissionT[];
  selectedCar: CarT | null;
  modalShow: boolean;
};

type MyPayload = {
  payload: Partial<FiltersT> | undefined;
};

const initialState: stateCar = {
  cars: [],
  filters: {
    color: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    brand: undefined,
    model: undefined,
    minAge: undefined,
    maxAge: undefined,
    engineId: undefined,
    transmissionId: undefined,
    range: undefined,
  },
  engines: [],
  transmissons: [],
  selectedCar: null,
  modalShow: false,
};

export const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setFilters: (state, action: MyPayload) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    clearFilters: (state) => {
      state.filters = {
        color: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        brand: undefined,
        model: undefined,
        minAge: undefined,
        maxAge: undefined,
        engineId: undefined,
        transmissionId: undefined,
        range: undefined,
      };
    },
    selectCar: (state, action: PayloadAction<CarT>) => {
      state.selectedCar = action.payload;
    },
    setShowModal: (state) => {
      state.modalShow = !state.modalShow;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCarsThunk.fulfilled, (state, action) => {
      state.cars = action.payload;
    });
    builder.addCase(getEnginesThunk.fulfilled, (state, action) => {
      state.engines = action.payload;
    });
    builder.addCase(getTransmissinThunk.fulfilled, (state, action) => {
      state.transmissons = action.payload;
    });
    builder.addCase(postCarsThunk.fulfilled, (state, action) => {
      state.cars.push(action.payload);
    });
  },
});

export const { setFilters, selectCar, clearFilters, setShowModal } =
  carSlice.actions;

export default carSlice.reducer;
