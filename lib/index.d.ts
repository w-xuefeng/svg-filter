import preset from "./presets/index";
export interface IFilterChild {
    type: "image" | "text";
    content?: string;
    attrs?: Record<string, any>;
}
export interface IFilter {
    type: string | "feImage" | "feColorMatrix" | "feDisplacementMap" | "feBlend";
    attrs?: Record<string, any>;
}
export interface IFilterContainer {
    attrs?: Record<string, any>;
    filters?: IFilter[];
}
export interface IFilterOptions {
    x?: number;
    y?: number;
    attrs?: Record<string, any>;
    width?: number | string;
    height?: number | string;
    children?: IFilterChild[];
    filters?: IFilterContainer[];
}
export declare function extendPreset(presetName: keyof typeof preset, options: Partial<IFilterOptions> & {
    options?: Record<string, any>;
}): Partial<IFilterOptions>;
export declare function createSvgFilter(options: Partial<IFilterOptions>): {
    svg: SVGSVGElement;
    show(selector?: HTMLElement | string): void;
};
export declare function textOnImage(text?: string, href?: string, options?: {
    text?: Record<string, any>;
    image?: Record<string, any>;
}): {
    svg: SVGSVGElement;
    show(selector?: string | HTMLElement | undefined): void;
};
export default createSvgFilter;
