export const getDynamicImage = (imageName: string, nestedPath= "") => {
    const path = new URL('@/img/' + nestedPath, import.meta.url);
    return `${path.pathname}/${imageName}.png`.replace("/@", "")
}