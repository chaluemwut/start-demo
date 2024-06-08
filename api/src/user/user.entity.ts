import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({name:"last_name"})
  lastName: string;

  @Column({name: "sex"})
  sex: string;

  @Column({name: "address"})
  address: string;

  @Column({name: "sub_district"})
  subdistrict: string;

  @Column({name: "district"})
  district: string;

  @Column({name: "province"})
  province: string;

  @Column({name: "card_number"})
  cardNumber: string;
}