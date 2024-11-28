import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { GetCountPerDayValidation } from '@/log-book-contacts/validations/get-count-per-day.validation';
import { groupBy, AggregationType } from '@/shared/helper/group-by';

import dayjs from 'dayjs';

import {
  collection,
  where,
  query,
  getDocs,
  Timestamp,
  orderBy,
} from 'firebase/firestore/lite';

@Injectable()
export class LogBookContactsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getCountPerDay(filter: GetCountPerDayValidation) {
    try {

      const from = Timestamp.fromDate(dayjs(filter.from).startOf('day').toDate());
      const to = Timestamp.fromDate(dayjs(filter.to).endOf('day').toDate());

      const db = this.firebaseService.getDB();
      const LogBookContactCollection = collection(db, 'LogBookContact');
      const logBookQuery = await query(
        LogBookContactCollection,
        where('contactTimeStamp', '!=', null),
        where('contactTimeStamp', '>=', from),
        where('contactTimeStamp', '<=', to),
        orderBy('contactTimeStamp', 'desc'),
      );

      const logBookSnapShot = await getDocs(logBookQuery);
      const logBookContacts = logBookSnapShot.docs.map((document) => {
        const data = document.data();
        return {
          id: document.id,
          date: data.date,
          contactTimeStamp: data.contactTimeStamp,
        }
      });

      return groupBy<any>(logBookContacts, 'date', {
        id: { type: AggregationType.COUNT, as: 'count' },
      });

    } catch (error) {
      return {
        notFound: 'notFound',
      };
    }
  }
}
