import { createCn } from "cn/config"

export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "hero",
            "heading",
            "title",
            "price",
            "quote",
            "link",
            "nav",
            "copy",
            "label",
            "badge",
          ],
        },
      ],
    },
  },
})
