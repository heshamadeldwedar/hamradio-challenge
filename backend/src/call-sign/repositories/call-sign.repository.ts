import { Injectable } from "@nestjs/common";
import { FirebaseService } from "@/firebase/firebase.service";
import { CallSignDto } from "@/call-sign/dto/call-sign.dto";
import {
  collection,
  where,
  query,
  getDocs,
  Timestamp,
  orderBy,
} from 'firebase/firestore/lite';

@Injectable()
export class CallSignRepository {

  constructor(private readonly firebaseService: FirebaseService) {}

  async search(keyword: string) : Promise<CallSignDto | null> {
    try {
      const db = this.firebaseService.getDB();
      const callSignCollection = collection(db, 'CallsignTest');
      const callSignSearchQuery = await query(
        callSignCollection,
        where('callsign', '==', keyword),
      );
      const snapShot = await getDocs(callSignSearchQuery);
      if (snapShot.docs.length > 0) {
        return snapShot.docs[0].data() as CallSignDto;
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

}