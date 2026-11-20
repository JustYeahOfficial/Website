export const STATUS_LABEL = {
  idea: "Idea",
  building: "Building",
  testing: "Testing",
  shipped: "Shipped",
};

export const STATUS_ORDER = ["idea", "building", "testing", "shipped"];

export const STATUS_META = {
  idea: {
    label: STATUS_LABEL.idea,
    text: "text-stone-500",
    dot: "bg-stone-400",
    bar: "bg-stone-400",
  },
  building: {
    label: STATUS_LABEL.building,
    text: "text-amber-600",
    dot: "bg-amber-500",
    bar: "bg-amber-500",
  },
  testing: {
    label: STATUS_LABEL.testing,
    text: "text-blue-600",
    dot: "bg-blue-500",
    bar: "bg-blue-500",
  },
  shipped: {
    label: STATUS_LABEL.shipped,
    text: "text-emerald-600",
    dot: "bg-emerald-500",
    bar: "bg-emerald-500",
  },
};