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

const svgNamespace = "http://www.w3.org/2000/svg";

const defaultOptions: Partial<IFilterOptions> = {
  x: 0,
  y: 0,
  attrs: {},
  width: 100,
  height: 100,
  children: [],
  filters: [],
};

function createImage(img: Partial<SVGImageElement>) {
  const svgImage = document.createElementNS(svgNamespace, "image");
  if (img) {
    Object.keys(img).forEach((k) => {
      svgImage.setAttribute(k, img?.[k as keyof SVGImageElement]);
    });
  }
  return svgImage;
}

function createText(content: string = "", text?: Partial<SVGTextElement>) {
  const svgText = document.createElementNS(svgNamespace, "text");
  svgText.innerHTML = content;
  if (text) {
    Object.keys(text).forEach((k) => {
      svgText.setAttribute(k, text?.[k as keyof SVGTextElement]);
    });
  }
  return svgText;
}

function createDefs(filters?: Node[]) {
  const defs = document.createElementNS(svgNamespace, "defs");
  if (filters?.length) {
    defs.append(...filters);
  }
  return defs;
}

function createFilter(filters?: IFilterContainer[]) {
  const res: SVGFilterElement[] = [];
  if (filters?.length) {
    filters.forEach((f) => {
      const svgFiler = document.createElementNS(
        svgNamespace,
        "filter"
      ) as unknown as SVGFilterElement;
      if (f.attrs) {
        Object.keys(f.attrs).forEach((k) => {
          svgFiler.setAttribute(k, f.attrs?.[k as keyof typeof f.attrs]);
        });
      }

      const item = f.filters?.map((e) => {
        const feItem = document.createElementNS(svgNamespace, e.type);
        e.attrs &&
          Object.keys(e.attrs).forEach((k) => {
            feItem.setAttribute(k, e.attrs?.[k as keyof typeof e.attrs]);
          });
        return feItem;
      });

      if (item?.length) {
        svgFiler.append(...item);
      }

      res.push(svgFiler);
    });
  }
  return res;
}

function createSvg(o: Partial<IFilterOptions>) {
  const svg = document.createElementNS(svgNamespace, "svg");
  svg.setAttribute("viewBox", `${o.x} ${o.y} ${o.width} ${o.height}`);
  if (o.attrs) {
    Object.keys(o.attrs).forEach((k) => {
      svg.setAttribute(k, o.attrs?.[k as keyof SVGAElement]);
    });
  }
  const children: Node[] = [];
  if (o.children?.length) {
    o.children.forEach((e) => {
      if (e.type === "image") {
        children.push(createImage(e.attrs as Partial<SVGImageElement>));
      }
      if (e.type === "text") {
        children.push(
          createText(e.content, e.attrs as Partial<SVGTextElement>)
        );
      }
    });
  }
  const defs = createDefs(createFilter(o.filters));
  svg.append(defs, ...children);
  return svg;
}

function merge(a: any, b: any) {
  if (
    typeof a === "object" &&
    typeof b === "object" &&
    a !== null &&
    b !== null
  ) {
    if (Array.isArray(a) && Array.isArray(b)) {
      return [...a, ...b];
    }

    return Object.keys(a).reduce(
      (t, ck) => {
        t[ck] = merge(t[ck], merge(a[ck], b[ck]));
        return t;
      },
      { ...a, ...b }
    );
  }

  return b ?? a;
}

export function extendPreset(
  presetName: keyof typeof preset,
  options: Partial<IFilterOptions> & { options?: Record<string, any> }
) {
  const p = preset[presetName];
  const merged: Partial<IFilterOptions> = {};
  if (p?.options && options.options) {
    Object.keys(options.options).forEach((key) => {
      const k = key as keyof typeof p.options;
      p.options[k] = merge(
        p.options[k],
        options.options?.[key as keyof typeof options.options]
      );
    });
  }
  const schema = p.schema() as Partial<IFilterOptions>;
  Object.keys(schema).forEach((k) => {
    const key = k as keyof IFilterOptions;
    merged[key] = merge(schema[key], merged[key]);
  });
  return merged;
}

export function createSvgFilter(options: Partial<IFilterOptions>) {
  const svg = createSvg(merge(defaultOptions, options));
  return {
    svg,
    show(selector?: HTMLElement | string) {
      const container =
        typeof selector === "string"
          ? document.querySelector(selector)
          : selector;
      container?.append(svg);
    },
  };
}

export function textOnImage(
  text?: string,
  href?: string,
  options?: { text?: Record<string, any>; image?: Record<string, any> }
) {
  return createSvgFilter(
    extendPreset("textOnImage", {
      options: {
        image: {
          attrs: { ...options?.image, href },
        },
        text: {
          content: text,
          attrs: { ...options?.text },
        },
      },
    })
  );
}

export default createSvgFilter;
