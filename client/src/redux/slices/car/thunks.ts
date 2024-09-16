import { createAsyncThunk } from "@reduxjs/toolkit";
import { CarT, EngineT, FiltersT, TransmissionT } from "@/types/db";
import carService from "@/services/car/carsService";

export const getCarsThunk = createAsyncThunk<CarT[], FiltersT>(
  "auth/getCarsThunk",
  (data: FiltersT) => carService.getCars(data)
);

export const postCarsThunk = createAsyncThunk<CarT, Omit<CarT, 'id' | 'engine' | 'transmission'>>(
  "auth/postCarsThunk",
  (data: Omit<CarT, 'id' | 'engine' | 'transmission'>) => carService.postCar(data)
);

export const getEnginesThunk = createAsyncThunk<EngineT[], void>(
  "auth/getEnginesThunk",
  () => carService.getEngines()
);

export const getTransmissinThunk = createAsyncThunk<TransmissionT[], void>(
  "auth/getTransmissinThunk",
  () => carService.getTransmissions()
);
export const a = 3;
