import {
	addDoc,
	collection,
	doc,
	getDocs,
	limit,
	orderBy,
	query,
	serverTimestamp,
	Timestamp,
	updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

export type Character = {
	character_id: number;
	character_name: string;
	industry?: string;
	description?: string;
	asset_key: string;
	is_active: boolean;
};

export type Item = {
	item_id: number;
	item_name: string;
	character_id?: number | null;
	item_type: string;
	item_info?: string;
	rarity: string;
	asset_key: string;
	is_active: boolean;
};

export type Gacha = {
	gacha_id: number;
	gacha_name: string;
	many: number;
	start_at?: Timestamp | null;
	end_at?: Timestamp | null;
	is_active: boolean;
};

export type Capsule = {
	capsule_id: number;
	capsule_name: string;
	asset_key: string;
	description?: string;
	is_active: boolean;
};

export type GachaContent = {
	gacha_content_id: number;
	gacha_id: number;
	item_id: number;
	drop_rate: number;
	capsule_id: number;
	quantity: number;
};

export type FirestoreRecord = Character | Item | Gacha | Capsule | GachaContent;
export type CollectionName = 'characters' | 'items' | 'gachas' | 'capsules' | 'gacha_contents';

export async function listRecords<T extends FirestoreRecord>(collectionName: CollectionName, maxRecords = 100) {
	const snapshot = await getDocs(query(collection(db, collectionName), orderBy('__name__'), limit(maxRecords)));
	return snapshot.docs.map((document) => ({ documentId: document.id, ...document.data() })) as Array<T & { documentId: string }>;
}

export async function createRecord<T extends FirestoreRecord>(collectionName: CollectionName, record: T) {
	return addDoc(collection(db, collectionName), { ...record, created_at: serverTimestamp(), updated_at: serverTimestamp() });
}

export async function updateRecord(collectionName: CollectionName, documentId: string, changes: Partial<FirestoreRecord>) {
	return updateDoc(doc(db, collectionName, documentId), { ...changes, updated_at: serverTimestamp() });
}