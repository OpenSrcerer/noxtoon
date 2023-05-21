import type {ButtonClickDto} from "@/components/composables/dto/ButtonClickDto";
import type {CommentDto} from "@/components/composables/dto/CommentDto";
import axios from "axios";

const postHeaderConfig = {
    headers: { "Content-Type": "multipart/form-data" }
};

export const getCartoons = async () => {
    return (await axios.get("http://localhost:1718/controllers/cartoons/get_cartoons.php")).data;
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
    const bodyFormData = new FormData();
    bodyFormData.append("cartoonId", commentDto.cartoonId!!);
    bodyFormData.append("userId", "1") // TODO: temporarily 1 until implement user feat
    bodyFormData.append("comment", commentDto.comment!!)
    bodyFormData.append("date", new Date().toISOString())

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
