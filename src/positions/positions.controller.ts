/**
 * PositionsController handles HTTP requests related to job positions.
 * It provides RESTful endpoints for:
 * - Retrieving all positions (GET /positions)
 * - Retrieving a specific position by ID (GET /positions/:id)
 * - Creating a new position (POST /positions)
 * - Updating an existing position (PUT /positions/:id)
 * - Deleting a position (DELETE /positions/:id)
 *
 * Incoming request bodies are normalized to match the expected domain format.
 * Console logs are included for debugging and tracing endpoint activity.
 */

import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { PositionsService } from './positions.service';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  async findAll() {
    console.log('GET /positions triggered');
    return await this.positionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log(`GET /positions/${id} triggered`);
    return await this.positionsService.findOne(+id);
  }

  @Post()
  create(@Body() positionData: any) {
    console.log('POST /positions triggered', positionData);
    // Map incoming fields into the exact shape the service expects
    const domainPayload: { position_code: string; position_name: string } = {
      position_code:
        (positionData && (positionData.position_code ?? positionData.code)) ?? '',
      position_name:
        (positionData && (positionData.position_name ?? positionData.name ?? positionData.title)) ?? '',
    };

    return this.positionsService.create(domainPayload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: any) {
    console.log(`PUT /positions/${id} triggered`, updateData);
    // Build a Partial<Position> mapping incoming fields to the DB columns
    const domainPayload: Partial<any> = {};
    if (updateData.position_name ?? updateData.name ?? updateData.title) {
      domainPayload.position_name = updateData.position_name ?? updateData.name ?? updateData.title;
    }
    if (updateData.position_code ?? updateData.code ?? updateData.description) {
      domainPayload.position_code = updateData.position_code ?? updateData.code ?? updateData.description;
    }

    return this.positionsService.update(+id, domainPayload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(`DELETE /positions/${id} triggered`);
    return this.positionsService.remove(+id);
  }
}