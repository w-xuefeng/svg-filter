declare const _default: {
    textOnImage: {
        options: {
            image: {
                type: string;
                attrs: {
                    href: string;
                    x: number;
                    y: number;
                    width: string;
                    height: string;
                    preserveAspectRatio: string;
                };
            };
            text: {
                type: string;
                content: string;
                attrs: {
                    x: string;
                    y: string;
                    "font-size": string;
                    "text-anchor": string;
                    "alignment-baseline": string;
                    fill: string;
                    filter: string;
                };
            };
        };
        schema(): {
            x: number;
            y: number;
            width: number;
            height: number;
            children: ({
                type: string;
                attrs: {
                    href: string;
                    x: number;
                    y: number;
                    width: string;
                    height: string;
                    preserveAspectRatio: string;
                };
            } | {
                type: string;
                content: string;
                attrs: {
                    x: string;
                    y: string;
                    "font-size": string;
                    "text-anchor": string;
                    "alignment-baseline": string;
                    fill: string;
                    filter: string;
                };
            })[];
            filters: {
                attrs: {
                    id: string;
                };
                filters: ({
                    type: string;
                    attrs: {
                        href: string;
                        x: string;
                        y: string;
                        width: string;
                        height: string;
                        preserveAspectRatio: string;
                        result: string;
                        in?: undefined;
                        type?: undefined;
                        values?: undefined;
                        in2?: undefined;
                        scale?: undefined;
                        xChannelSelector?: undefined;
                        yChannelSelector?: undefined;
                        mode?: undefined;
                    };
                } | {
                    type: string;
                    attrs: {
                        in: string;
                        type: string;
                        values: string;
                        result: string;
                        href?: undefined;
                        x?: undefined;
                        y?: undefined;
                        width?: undefined;
                        height?: undefined;
                        preserveAspectRatio?: undefined;
                        in2?: undefined;
                        scale?: undefined;
                        xChannelSelector?: undefined;
                        yChannelSelector?: undefined;
                        mode?: undefined;
                    };
                } | {
                    type: string;
                    attrs: {
                        in: string;
                        in2: string;
                        scale: string;
                        xChannelSelector: string;
                        yChannelSelector: string;
                        result: string;
                        href?: undefined;
                        x?: undefined;
                        y?: undefined;
                        width?: undefined;
                        height?: undefined;
                        preserveAspectRatio?: undefined;
                        type?: undefined;
                        values?: undefined;
                        mode?: undefined;
                    };
                } | {
                    type: string;
                    attrs: {
                        in: string;
                        in2: string;
                        mode: string;
                        result: string;
                        href?: undefined;
                        x?: undefined;
                        y?: undefined;
                        width?: undefined;
                        height?: undefined;
                        preserveAspectRatio?: undefined;
                        type?: undefined;
                        values?: undefined;
                        scale?: undefined;
                        xChannelSelector?: undefined;
                        yChannelSelector?: undefined;
                    };
                })[];
            }[];
        };
    };
};
export default _default;
