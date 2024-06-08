import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  sex: string;

  @Column()
  birthDay: Date;

  @Column()
  address: string;

  @Column()
  subdistrict: string;

  @Column()
  district: string;

  @Column()
  province: string;

  @Column()
  cardExpiredDate: Date;
}