import { Controller, Get, Req, Res } from '@nestjs/common';
import { TransmissionRouteService } from './transmission-route.service';

@Controller('transmission')
export class TransmissionRouteController {
  constructor(
    private readonly transmissionRouteService: TransmissionRouteService,
  ) {}

  @Get()
  async getAll(@Req() req, @Res() res) {
    try {
      const data = await this.transmissionRouteService.gellAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'server error' });
    }
  }
}
