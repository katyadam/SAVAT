export const CY_COLOR_RED = "#FF0000"
export const CY_COLOR_GREEN = "#00FF00"
export const CY_COLOR_BLUE = "#0000FF"
export const CY_COLOR_NEUTRAL = "#808080"
export const CY_COLOR_HIGHLIGHTED = "#FFD700"

export const getChangedColor = (type: string): string => {
    switch (type) {
        case "ADDED":
            return CY_COLOR_GREEN;
        case "REMOVED":
            return CY_COLOR_RED;
        case "MODIFIED":
            return CY_COLOR_BLUE;
        default:
            return CY_COLOR_NEUTRAL;
    }
};

export function getCommonDateString(): string {
    return new Date(Date.now()).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function formatCommonDateString(timestamp: string): string {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    }).format(new Date(timestamp))
}