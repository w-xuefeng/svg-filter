export default {
  options: {
    image: {
      type: "image",
      attrs: {
        href: "",
        x: 0,
        y: 0,
        width: "100%",
        height: "100%",
        preserveAspectRatio: "none",
      },
    },
    text: {
      type: "text",
      content: "",
      attrs: {
        x: "50%",
        y: "52%",
        "font-size": "3.6em",
        "text-anchor": "middle",
        "alignment-baseline": "middle",
        fill: "#2a6350",
        filter: "url(#conform)",
      },
    },
  },
  schema() {
    return {
      x: 0,
      y: 0,
      width: 800,
      height: 800,
      children: [this.options.image, this.options.text],
      filters: [
        {
          attrs: {
            id: "conform",
          },
          filters: [
            {
              type: "feImage",
              attrs: {
                href: "",
                x: "0",
                y: "0",
                width: "100%",
                height: "100%",
                preserveAspectRatio: "none",
                result: "ORIGIN_IMAGE",
              },
            },
            {
              type: "feColorMatrix",
              attrs: {
                in: "ORIGIN_IMAGE",
                type: "saturate",
                values: "0",
                result: "GRAY_IMAGE",
              },
            },
            {
              type: "feDisplacementMap",
              attrs: {
                in: "SourceGraphic",
                in2: "GRAY_IMAGE",
                scale: "15",
                xChannelSelector: "R",
                yChannelSelector: "R",
                result: "TEXTURED_TEXT",
              },
            },
            {
              type: "feImage",
              attrs: {
                href: "",
                x: "0",
                y: "0",
                width: "100%",
                height: "100%",
                preserveAspectRatio: "none",
                result: "BG",
              },
            },
            {
              type: "feColorMatrix",
              attrs: {
                in: "TEXTURED_TEXT",
                type: "matrix",
                result: "OPACITY_TEXT",
                values: `1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 .9 0`,
              },
            },
            {
              type: "feBlend",
              attrs: {
                in: "BG",
                in2: "OPACITY_TEXT",
                mode: "multiply",
                result: "BLEND_TEXT",
              },
            },
          ],
        },
      ],
    };
  },
};
