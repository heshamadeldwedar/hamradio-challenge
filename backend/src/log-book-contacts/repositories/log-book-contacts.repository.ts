import { Injectable } from "@nestjs/common";
import { FirebaseService } from "@/firebase/firebase.service";
import dayjs from 'dayjs';
import {
  collection,
  where,
  query,
  getDocs,
  Timestamp,
  orderBy,
} from 'firebase/firestore/lite';
import { GetCountPerDayValidation } from '@/log-book-contacts/validations/get-count-per-day.validation';

@Injectable()
export class LogBookContactsRepository {

  constructor(
    private readonly firebaseService: FirebaseService
  ) {}


  async getLogBookContentByDate(filter: GetCountPerDayValidation) {
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
      return logBookSnapShot.docs.map((document) => {
        const data = document.data();
        return {
          id: document.id,
          date: data.date,
          contactTimeStamp: data.contactTimeStamp,
        }
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }

}