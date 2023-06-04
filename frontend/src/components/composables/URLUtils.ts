export const getDynamicImage = (imageName: string, nestedPath= "", extension = "png") => {
    const path = new URL('@/img/' + nestedPath, import.meta.url);
    return `${path.pathname}/${imageName}.${extension}`.replace("/@", "")
}