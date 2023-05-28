import type {ButtonClickDto} from "@/components/composables/dto/ButtonClickDto";
import type {CommentDto} from "@/components/composables/dto/CommentDto";
import axios from "axios";
import router from "../router";
import {getCookie} from "../components/composables/GetCookie";

const postHeaderConfig = {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true
};

export const getCartoons = async () => {
    return (await axios.get("http://localhost:1718/controllers/cartoons/get_cartoons.php",
        { withCredentials: true }
      )).data;
}

export const getCartoonBySlug = async (slug: string) => {
    const bodyFormData = new FormData();
    bodyFormData.append("slug", slug);

    const res = await axios.post(
      "http://localhost:1718/controllers/cartoons/get_cartoon_by_slug.php",
      bodyFormData,
      postHeaderConfig
    )

    return res.data
}

export const getCartoonComments = async (cartoonId: string) => {
    const bodyFormData = new FormData();
    bodyFormData.append("cartoonId", cartoonId);

    const res = await axios.post(
      "http://localhost:1718/controllers/comments/get_cartoon_comments.php",
      bodyFormData,
      postHeaderConfig
    )

    return res.data
}

export const addComment = async (commentDto: CommentDto) => {
    const currentUser = JSON.parse(decodeURIComponent(getCookie("noxtoon-session"))).username;

    const bodyFormData = new FormData();
    bodyFormData.append("cartoonId", commentDto.cartoonId!!);
    bodyFormData.append("comment", commentDto.comment!!)

    const res = await axios.post(
      "http://localhost:1718/controllers/comments/post_comment.php",
      bodyFormData,
      postHeaderConfig
    )

    return res.data
}

// PATCH

export const updateCartoonStats = async (dto: ButtonClickDto) => {
    const bodyFormData = new FormData();
    bodyFormData.append(
      dto.property.hearts ? "hearts" : "likes",
      dto.property.hearts ? dto.property.hearts.toString() : dto.property.likes.toString()
    );
    bodyFormData.append("cartoonId", dto.cartoonId);

    await axios.post(
      "http://localhost:1718/controllers/cartoons/patch_cartoon_stats.php",
      bodyFormData,
      postHeaderConfig
    )
}

// USER REQUESTS

export const createUser = async (username: string, password: string) => {
    return doOnUser(username, password, "post_user")
}

export const loginUser = async (username: string, password: string) => {
    return doOnUser(username, password, "get_login")
}

const doOnUser = async (username: string, password: string, api: "get_login" | "post_user") => {
    const bodyFormData = new FormData();
    bodyFormData.append("username", username);
    bodyFormData.append("password", password)

    const res = await axios.post(
      `http://localhost:1718/controllers/users/${api}.php`,
      bodyFormData,
      postHeaderConfig
    ).catch(e => e)

    if (res.status === 200 || res.status === 201) {
        router.push("/")
    }
}
