import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Car from 'src/models/Car';
import EngineType from 'src/models/EngineType';
import Transmission from 'src/models/Transmission';
import { Op, Sequelize } from 'sequelize';

type Props = {
  color: {} | undefined;
  price: {} | undefined;
  brand: {} | undefined;
  model: {} | undefined;
  year: {} | undefined;
  engineId: number | undefined;
  transmissionId: number | undefined;
  range: {} | undefined;
};

@Injectable()
export class CarRouteService {
  constructor(
    @InjectModel(Car) private readonly CarModel: typeof Car,
    @InjectModel(EngineType)
    private readonly EngineTypeModel: typeof EngineType,
    @InjectModel(Transmission)
    private readonly TransmissionModel: typeof Transmission,
  ) {}

  async getAllFilters({
    color,
    minPrice,
    maxPrice,
    brand,
    minAge,
    maxAge,
    engineId,
    transmissionId,
    range,
    model,
  }) {
    const whereClause = {} as Props;

    if (brand) {
      whereClause.brand = Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('brand')),
        { [Op.like]: `%${brand.toLowerCase()}%` },
      );
    }

    if (color) {
      whereClause.color = Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('color')),
        { [Op.like]: `%${color.toLowerCase()}%` },
      );
    }

    if (model) {
      whereClause.model = Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('model')),
        { [Op.like]: `%${model.toLowerCase()}%` },
      );
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      whereClause.price = {};
      if (minPrice !== undefined) {
        whereClause.price[Op.gte] = minPrice;
      }
      if (maxPrice !== undefined) {
        whereClause.price[Op.lte] = maxPrice;
      }
    }

    if (minAge !== undefined || maxAge !== undefined) {
      whereClause.year = {};
      if (minAge !== undefined) {
        whereClause.year[Op.gte] = minAge;
      }
      if (maxAge !== undefined) {
        whereClause.year[Op.lte] = maxAge;
      }
    }

    if (engineId) {
      whereClause.engineId = engineId;
    }

    if (engineId == 3 && range !== undefined) {
      whereClause.range = {
        [Op.gte]: range,
      };
    }

    if (engineId == 1 || engineId == 2) {
      if (transmissionId) {
        whereClause.transmissionId = transmissionId;
      }
    }

    console.log({
      color,
      minPrice,
      maxPrice,
      minAge,
      maxAge,
      engineId,
      transmissionId,
      range,
    });

    const results = await this.CarModel.findAll({
      where: whereClause,
      include: [
        {
          model: Transmission,
          as: 'transmission',
        },
        {
          model: EngineType,
          as: 'engine',
        },
      ],
    });

    return results;
  }

  async createCar(body) {
    console.log(body);

    const clone = {
      ...body,
      transmissionId: body.transmissionId == 0 ? 4 : body.transmissionId,
    };
    console.log(clone);

    const data = await this.CarModel.create(clone);

    const results = await this.CarModel.findOne({
      where: { id: data.id },
      include: [
        {
          model: Transmission,
          as: 'transmission',
        },
        {
          model: EngineType,
          as: 'engine',
        },
      ],
    });
    return results;
  }
}
