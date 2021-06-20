import { GraphData } from "./graph-data";

export interface GraphRequest {
    opCode: number;
    graphData: GraphData[];
}
