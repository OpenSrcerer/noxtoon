import {
    doc,
    where,
    query,
    getDocs,
    addDoc,
    updateDoc,
    collection,
} from "firebase/firestore";
import type {Firestore} from "@firebase/firestore"
import type {ButtonClickDto} from "@/components/composables/dto/ButtonClickDto";
import type {PartialCartoon} from "@/components/composables/dto/CartoonDto";
import type {CommentDto} from "@/components/composables/dto/CommentDto";
import axios from "axios";

let firestore: Firestore;

export const setFirestore = (fstore: Firestore) => {
    firestore = fstore;
}

// GET

// export const getCartoons = async () => {
//     var bodyFormData = new FormData();
//     bodyFormData.append("wtf", "hello");
//
//     const res = await axios.post(
//       "http://cs325project.dvl.to/controllers/test.php",
//       bodyFormData,
//       {
//           headers: { "Content-Type": "multipart/form-data" }
//       }
//     )
//     console.log(res.data)
//
//     return getDocs(collection(firestore, "cartoons"))
// }

export const getCartoons = async () => {
    var bodyFormData = new FormData();
    bodyFormData.append("wtf", "hello");

    const res = await axios.post(
      "http://cs325project.dvl.to/controllers/test.php",
      bodyFormData,
      {
          headers: { "Content-Type": "multipart/form-data" }
      }
    )
    console.log(res.data)

    return getDocs(collection(firestore, "cartoons"))
}

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
      { username: commentDto.username, comment: commentDto.comment, date: new Date().toISOString() }
    )
}

// PATCH

export const updateCartoonStats = async (dto: ButtonClickDto) => {
    const cartoon = doc(firestore, "cartoons", dto.cartoonId)
    return updateDoc(cartoon, dto.property)
}
