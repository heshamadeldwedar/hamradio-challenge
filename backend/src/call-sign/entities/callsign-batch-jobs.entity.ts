import { Column, DataType, Model, Table } from "sequelize-typescript";

interface CallSignBatchJobsDto {
    id?: number;
    fccids: string[];
    status: 'in-progress' | 'completed' | 'failed';
    checksum: string;
    createdAt?: Date;
    updatedAt?: Date;
}

@Table({ tableName: 'callsign_batch_jobs', timestamps: true })
export class CallsignBatchJobsEntity extends Model<CallSignBatchJobsDto, CallSignBatchJobsDto> {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.JSON() })
    fccids: string[];

    @Column({ type: DataType.STRING, defaultValue: 'in-progress' })
    status: string;

    @Column({ type: DataType.STRING })
    checksum: string;

    @Column({ type: DataType.DATE })
    createdAt: Date;

    @Column({ type: DataType.DATE })
    updatedAt: Date;
}
