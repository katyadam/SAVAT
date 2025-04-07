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

export const decideTextColorByBgColor = (bgColor: string): string => {
    const colorValue = bgColor.substring(1)
    const R = colorValue.substring(0, 2)
    const G = colorValue.substring(2, 4)
    const B = colorValue.substring(4, 6)

    return parseInt(R, 16) + parseInt(G, 16) + parseInt(B, 16) < 300 ? "#FFFFFF" : "#000000";
}

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