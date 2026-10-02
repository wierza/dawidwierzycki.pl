/** 1500 → „1 500 zł” (z twardą spacją, także dla liczb czterocyfrowych). */
export const zl = (n: number) => `${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} zł`;
