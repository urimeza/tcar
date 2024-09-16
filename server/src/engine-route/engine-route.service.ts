import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import EngineType from 'src/models/EngineType';

@Injectable()
export class EngineRouteService {
    constructor(
        @InjectModel(EngineType)
        private readonly EngineTypeModel: typeof EngineType,
      ) {}
    
      async gellAll() {
        const res = await this.EngineTypeModel.findAll();
        return res;
      }
}
