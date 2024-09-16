import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Transmission from 'src/models/Transmission';

@Injectable()
export class TransmissionRouteService {
  constructor(
    @InjectModel(Transmission)
    private readonly TransmissionModel: typeof Transmission,
  ) {}

  async gellAll() {
    const res = await this.TransmissionModel.findAll();
    return res;
  }
}
