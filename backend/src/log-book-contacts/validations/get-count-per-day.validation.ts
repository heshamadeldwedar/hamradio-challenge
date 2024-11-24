
import { IsDateString } from 'class-validator';

export class GetCountPerDayValidation {


    @IsDateString()
    from: Date;

    @IsDateString()
    to: Date;
}