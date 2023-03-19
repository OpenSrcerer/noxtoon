import {
    doc,
    where,
    query,
    getDoc,
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
import type {CommentDto} from "@/components/composables/dto/CommentDto";

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
    return getDocs(query(cartoonsRef, where("slug", "==", slug)))
}

export const getCartoonComments = async (cartoonId: string) => {
    return getDocs(collection(firestore, `cartoons/${cartoonId}/comments`))
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

export const addComment = async (commentDto: CommentDto) => {
    await addDoc(collection(
        firestore,
        `cartoons/${commentDto.cartoonId}/comments`
      ),
      { username: commentDto.username, comment: commentDto.comment }
    )
}

// PATCH

export const updateCartoonStats = async (dto: ButtonClickDto) => {
    const cartoon = doc(firestore, "cartoons", dto.cartoonId)
    return updateDoc(cartoon, dto.property)
}