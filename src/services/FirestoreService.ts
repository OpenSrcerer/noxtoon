import {where, query, getDoc, getDocs, addDoc, collection} from "firebase/firestore";
import type {Firestore} from "@firebase/firestore"

let firestore: Firestore;

export const setFirestore = (fstore: Firestore) => {
    firestore = fstore;
}

export const testDoc = async () => {
    return addDoc(collection(firestore, "teachers"), {name: "test", lastname: "test"})
}

export const getCartoons = async () => {
    return getDocs(collection(firestore, "cartoons"))
}

export const getCartoonBySlug = async (slug: string) => {
    const cartoonsRef = collection(firestore, "cartoons")
    const qwery = query(cartoonsRef, where("slug", "==", slug))
    return getDocs(qwery)
}