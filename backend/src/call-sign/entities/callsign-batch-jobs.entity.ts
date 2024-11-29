import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface CallSignBatchJobsDto {
    id?: number;
    fccids?: string[];
    status?: string;
    checksum?: string;
    retryCount?: 0,
    errorMessage?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

@Table({ tableName: 'callsign_batch_jobs', timestamps: true })
export class CallsignBatchJobsEntity extends Model<CallSignBatchJobsDto, CallSignBatchJobsDto> {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.JSON() })
    fccids: string[];

    @Column({ type: DataType.STRING, defaultValue: 'in-progress', field: 'migration_status' })
    status: string;

    @Column({ type: DataType.STRING })
    checksum: string;

    @Column({ type: DataType.DATE })
    createdAt: Date;

    @Column({ type: DataType.DATE })
    updatedAt: Date;

    @Column({ type: DataType.NUMBER, field: 'retry_count', defaultValue: 0 })
    retryCount: number;

    @Column({ type: DataType.STRING, field: 'error_message', allowNull: true })
    errorMessage: string;
}
