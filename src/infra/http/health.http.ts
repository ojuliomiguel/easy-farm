import { Controller, Get } from "@nestjs/common";


@Controller({
  path: 'health',
  version: '1',
})
export class HealthHttpApi {
  @Get()
  getById() {
    return;
  }
}
