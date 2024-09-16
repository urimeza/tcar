import { Controller, Get, Req, Res } from '@nestjs/common';
import { EngineRouteService } from './engine-route.service';

@Controller('engine')
export class EngineRouteController {
  constructor(private readonly engineRouteService: EngineRouteService) {}

  @Get()
  async getAll(@Req() req, @Res() res) {
    try {
      const data = await this.engineRouteService.gellAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'server error' });
    }
  }
}
