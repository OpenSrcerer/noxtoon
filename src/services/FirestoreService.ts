import {addDoc, collection} from "firebase/firestore";
import type {Firestore} from "@firebase/firestore"

let firestore: Firestore;

export const setFirestore = (fstore: Firestore) => {
    firestore = fstore;
}

export const testDoc = async () => {
    return addDoc(collection(firestore, "teachers"), {name: "test", lastname: "test"})
}