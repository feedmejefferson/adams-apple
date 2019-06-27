import { unwatchFile } from "fs";

export class IndexedTree {
    private nodes: any;
    // private minIndex: number;
    private maxIndex: number;
    public constructor(tree: any) {
        this.nodes=tree;
        this.maxIndex=Object.keys(tree).map(x => parseInt(x)).reduce((x,y) => x>y ? x : y);
        console.log(this.maxIndex);


    }
    public get(nodeIndex: number): string {
        return this.nodes[`${nodeIndex}`];
    }
    public getFirst(nodeIndex: number): string {
        if(nodeIndex>this.maxIndex) {
            return "none"; // TODO: figure out how to best handle missing terminal nodes
        } 
            return this.get(nodeIndex) ? this.get(nodeIndex) : this.getFirst(nodeIndex*2);
        
    }
    public getRandom(nodeIndex: number): string {
        // TODO: implement this for real -- right now just bisecting
        if(nodeIndex>this.maxIndex) {
            return "none"; // TODO: figure out how to best handle missing terminal nodes
        } 
            return this.get(nodeIndex) ? this.get(nodeIndex) : this.getFirst(nodeIndex*2+1);
        
    }


}
