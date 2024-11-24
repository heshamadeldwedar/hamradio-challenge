import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import dayjs from 'dayjs';

import {
  collection,
  where,
  query,
  getDocs,
  limit,
} from 'firebase/firestore/lite';

@Injectable()
export class LogBookContactsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async findAll() {
    try {
      // get one week ago using dayjs /
      const oneWeekAgo = dayjs().subtract(4, 'year').unix();

      const db = this.firebaseService.getDB();
      const LogBookContactCollection = collection(db, 'LogBookContact');
      const logBookQuery = await query(
        LogBookContactCollection,
        where('timestamp', '>', oneWeekAgo),
        limit(100),
      );
      const logBookSnapShot = await getDocs(logBookQuery);
      const logBookContacts = logBookSnapShot.docs.map((doc) => doc.data());
      return logBookContacts;
    } catch (error) {
      console.error(error);
      return {
        notFound: 'notFound',
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} logBookContact`;
  }
}
