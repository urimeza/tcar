import { Controller, Post, Req, Res } from '@nestjs/common';
import { CarRouteService } from './car-route.service';

@Controller('car')
export class CarRouteController {
  constructor(private readonly carRouteService: CarRouteService) {}

  @Post('')
  async getAllFilters(@Req() req, @Res() res) {
    try {
      const data = await this.carRouteService.getAllFilters(req.body);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'server error' });
    }
  }

  @Post('create')
  async createCar(@Req() req, @Res() res) {
    try {
      const data = await this.carRouteService.createCar(req.body);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'server error' });
    }
  }
}
