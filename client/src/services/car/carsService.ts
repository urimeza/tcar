import type { AxiosInstance } from "axios";
import authAxiosInstance from "../auth/authAxiosInstance";
import { CarT, EngineT, FiltersT, TransmissionT } from "@/types/db";

class CarService {
  constructor(private client: AxiosInstance) {}

  async getCars(data: FiltersT): Promise<CarT[]> {
    const res = await this.client.post<CarT[]>("/car", data);
    if (res.status !== 200) return Promise.reject(new Error("Failed"));
    return res.data;
  }

  async postCar(data: Omit<CarT, 'id' | 'engine' | 'transmission'>): Promise<CarT> {
    const res = await this.client.post<CarT>("/car/create", data);
    if (res.status !== 201) return Promise.reject(new Error("Failed"));
    return res.data;
  }

  async getEngines(): Promise<EngineT[]> {
    const res = await this.client.get<EngineT[]>("/engine");
    if (res.status !== 200) return Promise.reject(new Error("Failed"));
    return res.data;
  }

  async getTransmissions(): Promise<TransmissionT[]> {
    const res = await this.client.get<TransmissionT[]>("/transmission");
    if (res.status !== 200) return Promise.reject(new Error("Failed"));
    return res.data;
  }
}

const carService = new CarService(authAxiosInstance);

export default carService;
