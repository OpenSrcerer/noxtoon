export const getDynamicImage = (imageName: string, nestedPath= "") => {
    const path = new URL(`@/assets/img/${nestedPath}`, import.meta.url);
    return `${path.pathname}/${imageName}.png`.replace("/@", "")
}