import { STORE_EXAMPLES } from "../../data/content";

/** Browser-bar text for each customer-flow screen inside the phone frame. */
export function flowUrl(id) {
  const { domain } = STORE_EXAMPLES[0];
  return id === "lacak" ? `${domain}/tracking` : domain;
}
