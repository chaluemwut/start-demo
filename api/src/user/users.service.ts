import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  create(userDto: User): Promise<User> {
    return this.usersRepository.save(userDto);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ order: { id: 'DESC' } });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async findCustom(month: number, isExpired: string): Promise<User[]> {
    const db = this.usersRepository.manager
    let sql = "select * from user where 1=1 "
    let where = ""
    if (month != 0) {
      where = ` and month(birthDay) = ${month}`
    }
    if (isExpired === 'true') {
      where = where + " and datediff(now(), cardExpiredDate) < 30"
    }
    return await db.query(sql + where)
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}