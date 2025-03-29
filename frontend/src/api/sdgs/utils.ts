import { ChangedLink, Link } from "./types"

export const getLinkSignature = (link: Link | ChangedLink): string => {
    return `${link.source}__${link.target}:${"type" in link ? link.type : "SAME"}`
}

export const getRequestTypeColor = (type: string) => {
    switch (type) {
        case "GET":
            return "bg-yellow-200"
        case "POST":
            return "bg-green-300"
        case "PUT":
            return "bg-blue-300"
        case "DELETE":
            return "bg-red-300"
        default:
            return "black"
    }
}

export const getRequestTypeHoverColor = (type: string) => {
    switch (type) {
        case "GET":
            return "hover:bg-yellow-100"
        case "POST":
            return "bg-green-200"
        case "PUT":
            return "bg-blue-200"
        case "DELETE":
            return "bg-red-200"
        default:
            return "black"
    }
}