import { CallGraphMethod } from "@/api/callgraphs/types";

export const getMicroservicesColors = (nodes: CallGraphMethod[]): Map<string, string> => {
    const uniqueMsNames = [...new Set(nodes.map(node => node.microservice))];
    return assignColorsToMicroservices(uniqueMsNames);
}

const assignColorsToMicroservices = (microservices: string[]): Map<string, string> => {
    const colors = generateColors(microservices.length);
    return new Map(microservices.map((ms, i) => [ms, colors[i]]));
};

const generateColors = (amount: number): string[] => {
    const colors: string[] = [];
    for (let i = 0; i < amount; i++) {
        const color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        colors.push(color);
    }
    return colors;
};
