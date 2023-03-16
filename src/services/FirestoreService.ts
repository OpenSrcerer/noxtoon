import {
    doc,
    where,
    query,
    getDocs,
    addDoc,
    updateDoc,
    collection,
    QueryOrderByConstraint,
    QueryLimitConstraint,
    QueryStartAtConstraint
} from "firebase/firestore";
import type {Firestore} from "@firebase/firestore"
import type {ButtonClickDto} from "@/components/composables/dto/ButtonClickDto";
import type {PartialCartoon} from "@/components/composables/dto/CartoonDto";

type Constraint = QueryOrderByConstraint | QueryLimitConstraint | QueryStartAtConstraint;

let firestore: Firestore;

export const setFirestore = (fstore: Firestore) => {
    firestore = fstore;
}

// GET

export const getCartoons = async () => {
    return getDocs(collection(firestore, "cartoons"))
}

// export const getCartoonsCount = async () => {
//     const cartoonsRef = collection(firestore, "cartoons");
//     return (await getCountFromServer(cartoonsRef)).data().count
// }

// Tried to make this work but does not provide the functionality needed due to firebase limitations
// export const getCartoonsPaginated = async (pageSize: number, anchor: DocumentSnapshot | null) => {
//     const conditions: Array<Constraint> = [
//         orderBy("name"),
//         limit(pageSize)
//     ]
//     if (anchor) { conditions.push(startAfter(anchor)) }
//     return getDocs(query(collection(firestore, "cartoons"), ...conditions))
// }

export const getCartoonBySlug = async (slug: string) => {
    const cartoonsRef = collection(firestore, "cartoons")
    const qwery = query(cartoonsRef, where("slug", "==", slug))
    return getDocs(qwery)
}

// POST

export const createCartoon = async (cartoon: PartialCartoon) => {
    const newCartoon = {
        ...cartoon,
        slug: cartoon.name?.toLowerCase().replace(" ", "-"),
        hearts: 0,
        stars: 0
    }
    await addDoc(collection(firestore, "cartoons"), newCartoon)
}

// PATCH

export const updateCartoonStats = async (dto: ButtonClickDto) => {
    const cartoon = doc(firestore, "cartoons", dto.cartoonId)
    return updateDoc(cartoon, dto.property)
}