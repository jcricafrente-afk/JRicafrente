//in the delete method, return a message instead of the deleted position.
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

export interface Position {
  position_id: number;
  position_code: string;
  position_name: string;
  id: string;
  created_at: string;
  updated_at: string;
}

@Injectable()
export class PositionsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<Position[]> {
    return await this.db.query<Position>('SELECT * FROM positions');
  }

  async findOne(position_id: number): Promise<Position | null> {
    const rows = await this.db.query<Position>(
      'SELECT * FROM positions WHERE position_id = ?',
      [position_id]
    );
    return rows.length ? rows[0] : null;
  }

  async create(data: { position_code: string; position_name: string }): Promise<Position> {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const result: any = await this.db.execute(
      'INSERT INTO positions (position_code, position_name, created_at, updated_at) VALUES (?, ?, ?, ?)',
      [data.position_code, data.position_name, now, now]
    );

    const position_id = result.insertId;
    return {
      position_id,
      position_code: data.position_code,
      position_name: data.position_name,
      id: position_id.toString(),
      created_at: now,
      updated_at: now,
    };
  }

  async update(position_id: number, updateData: Partial<Position>): Promise<Position | null> {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    await this.db.execute(
      'UPDATE positions SET position_code = ?, position_name = ?, updated_at = ? WHERE position_id = ?',
      [updateData.position_code, updateData.position_name, now, position_id]
    );

    return this.findOne(position_id);
  }

  async remove(position_id: number): Promise<{ message: string }> {
  const position = await this.findOne(position_id);
  if (!position) {
    throw new Error(`Position with ID ${position_id} not found`);
  }

  await this.db.execute('DELETE FROM positions WHERE position_id = ?', [position_id]);

  return { message: `Deleted Successfully` };
}
 // async remove(position_id: number): Promise<Position | null> {
   // const position = await this.findOne(position_id);
    //if (!position) return null;
    //await this.db.execute('DELETE FROM positions WHERE position_id = ?', [position_id]);
    //return { message: Position with id ${id} remove }
    //return position;  }
}
