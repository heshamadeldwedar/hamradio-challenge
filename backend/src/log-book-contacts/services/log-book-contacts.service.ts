import { Injectable } from '@nestjs/common';
import { GetCountPerDayValidation } from '@/log-book-contacts/validations/get-count-per-day.validation';
import { groupBy, AggregationType } from '@/shared/helper/group-by';
import { LogBookContactsRepository } from '@/log-book-contacts/repositories/log-book-contacts.repository';
import { ITimelineDataPoint } from '../interface/timeline.interface';
import dayjs from 'dayjs';



@Injectable()
export class LogBookContactsService {
  constructor(private readonly logRepo: LogBookContactsRepository) {}

  async getCountPerDay(filter: GetCountPerDayValidation): Promise<Array<ITimelineDataPoint>> {

    const logBookContacts = await this.logRepo.getLogBookContentByDate(filter);
    const groupedByDate: Array<ITimelineDataPoint> = groupBy<any>(logBookContacts, 'date', {
      id: { type: AggregationType.COUNT, as: 'count' },
    }) as unknown as Array<ITimelineDataPoint>;

    // construct a timeline of the data
    const timeline: Array<ITimelineDataPoint> = [];

    // remove time from date
    const start = dayjs(filter.from).startOf('day');
    const end = dayjs(filter.to).endOf('day');

    for (let date = start; date.isBefore(end); date = date.add(1, 'day')) {
      const dateStr = date.format('MM-DD');
      const count = groupedByDate.find((item) => item.date === date.format('YYYY-MM-DD'))?.count || 0;
      timeline.push({
        date: dateStr,
        count,
      });
    }
    return timeline;
  }
}
