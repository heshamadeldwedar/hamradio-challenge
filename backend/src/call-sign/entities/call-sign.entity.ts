import { Column, DataType, Model, Table } from "sequelize-typescript";
import { CallSignDto } from "@/call-sign/dto/call-sign.dto";

@Table({ tableName: 'en', timestamps: false })
export class CallSignEntity extends Model<CallSignDto, CallSignDto> {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false })
    fccid: number;

    @Column({ type: DataType.STRING, allowNull: false })
    callsign: string;

    @Column({ type: DataType.STRING, allowNull: false, field: 'full_name' })
    fullName: string;

    @Column({ type: DataType.STRING, allowNull: false })
    first: string;

    @Column({ type: DataType.STRING, allowNull: false })
    middle: string;

    @Column({ type: DataType.STRING, allowNull: false })
    last: string;

    @Column({ type: DataType.STRING, allowNull: false, field: 'address1' })
    address: string;

    @Column({ type: DataType.STRING, allowNull: false })
    city: string;

    @Column({ type: DataType.STRING, allowNull: false })
    state: string;

    @Column({ type: DataType.STRING, allowNull: false })
    zip: string;
}
