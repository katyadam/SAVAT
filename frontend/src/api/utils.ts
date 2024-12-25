export const getChangedColor = (type: string): string => {
    switch (type) {
        case "SAME":
            return "light-grey";
        case "ADDED":
            return "green";
        case "REMOVED":
            return "red";
        case "MODIFIED":
            return "blue";
        default:
            return "white";
    }
};