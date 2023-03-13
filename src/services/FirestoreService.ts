import {doc, where, query, getDoc, getDocs, updateDoc, collection, increment} from "firebase/firestore";
import type {Firestore} from "@firebase/firestore"
import type {ButtonClickDto} from "@/components/composables/ButtonClickDto";

let firestore: Firestore;

export const setFirestore = (fstore: Firestore) => {
    firestore = fstore;
}

// GET

export const getCartoons = async () => {
    return getDocs(collection(firestore, "cartoons"))
}

export const getCartoonBySlug = async (slug: string) => {
    const cartoonsRef = collection(firestore, "cartoons")
    const qwery = query(cartoonsRef, where("slug", "==", slug))
    return getDocs(qwery)
}

// PATCH

export const updateCartoonStats = async (dto: ButtonClickDto) => {
    const cartoon = doc(firestore, "cartoons", dto.cartoonId)
    return updateDoc(cartoon, dto.property)
}