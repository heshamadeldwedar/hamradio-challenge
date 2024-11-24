import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { ConfigService } from '@nestjs/config';

interface IFirebaseConfiguration {
  API_KEY: string;
  AUTH_DOMAIN: string;
  PROJECT_ID: string;
  STORAGE_BUCKET: string;
  MESSAGING_SENDER_ID: string;
  APP_ID: string;
  MEASUREMENT_ID: string;
}

@Injectable()
export class FirebaseService {
  constructor(private configService: ConfigService) {}

  private initFirebase() {
    const firebaseConfiguration: IFirebaseConfiguration =
      this.configService.get<IFirebaseConfiguration>('FIREBASE');
    return initializeApp({
      apiKey: firebaseConfiguration.API_KEY,
      authDomain: firebaseConfiguration.AUTH_DOMAIN,
      projectId: firebaseConfiguration.PROJECT_ID,
      storageBucket: firebaseConfiguration.STORAGE_BUCKET,
      messagingSenderId: firebaseConfiguration.MESSAGING_SENDER_ID,
      appId: firebaseConfiguration.APP_ID,
      measurementId: firebaseConfiguration.MEASUREMENT_ID,
    });
  }

  public getDB() {
    return getFirestore(this.initFirebase());
  }
}
