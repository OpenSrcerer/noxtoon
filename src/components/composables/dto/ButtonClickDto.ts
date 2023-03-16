import type {FieldValue} from "firebase/firestore";

export interface ButtonClickDto {
    cartoonId: string;
    property: {
        hearts?: FieldValue;
        likes?: FieldValue;
    }
}