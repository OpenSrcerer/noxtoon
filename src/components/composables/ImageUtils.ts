export const srcRoot = import.meta.url;
export function cartoonImg(name: string){
    return new URL(`../../assets/img/cartoons/${name}.png`, srcRoot)
}