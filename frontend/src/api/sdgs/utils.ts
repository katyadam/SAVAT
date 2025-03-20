import { ChangedLink, Link } from "./types"

export const getLinkSignature = (link: Link | ChangedLink): string => {
    return `${link.source}__${link.target}:${"type" in link ? link.type : "SAME"}`
}