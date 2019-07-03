
export class IndexedTree {
    private nodes: any;
    // private minIndex: number;
    private maxIndex: number;
    public constructor(tree: any) {
        this.nodes=tree;
        this.maxIndex=Object.keys(tree).map(x => parseInt(x)).reduce((x,y) => x>y ? x : y);

    }

    /**
     * Returns the value of the node at this index if it is a terminal node
     * or undefined if it is a branch node or not a node in the tree.
     * 
     * @param {number} nodeIndex - the id of the node to get the value of.
     * @returns {string} - the value of the node if it is a terminal/leaf node.
     */
    public get(nodeIndex: number): string {
        return this.nodes[`${nodeIndex}`];
    }
    
    /**
     * Traverses the branch depth first to find the first (left most) 
     * terminal node.
     * 
     * @param {number} nodeIndex - the node/branch to traverse.
     * @returns {string} - the value of this branches first terminal node.
     */
    public getFirst(nodeIndex: number): string {
        if(nodeIndex>this.maxIndex) {
            return "none"; // TODO: figure out how to best handle missing terminal nodes
        } 
            return this.get(nodeIndex) ? this.get(nodeIndex) : this.getFirst(nodeIndex*2);
        
    }

    /**
     * Bisect the branch to find a terminal node.
     * 
     * @param {number} nodeIndex - the node/branch to bisect.
     * @returns {string} - the value of this branches central most terminal node.
     */
    public getBisect(nodeIndex: number): string {
        if(nodeIndex>this.maxIndex) {
            return "none"; // TODO: figure out how to best handle missing terminal nodes
        } 
            return this.get(nodeIndex) ? this.get(nodeIndex) : this.getFirst(nodeIndex*2+1);
        
    }
    public getRandom(nodeIndex: number): string {
        // TODO: implement this for real -- right now just bisecting
        if(nodeIndex>this.maxIndex) {
            return "none"; // TODO: figure out how to best handle missing terminal nodes
        } 
            return this.get(nodeIndex) ? this.get(nodeIndex) : this.getFirst(nodeIndex*2+1);
        
    }
    public expandBranch(branch: number, tree: any): IndexedTree {
        // TODO: should we add in logic to check for integrity?
        // this is a really a question in general for all new trees
        const nodes = {...this.nodes, ...tree};
        delete nodes[`${branch}`];

        return new IndexedTree(nodes);
    }


    public ancestorNodeId(nodeIndex: number): number {
        // tslint:disable-next-line: no-bitwise
        for(let i = nodeIndex;i>1;i>>=1) {
            if(this.get(i)) { return i; }
        } 
        return 0;
    }
    public firstChildNodeId(nodeIndex: number): number {
        for(let i = nodeIndex;i<=this.maxIndex;i*=2) {
            if(this.get(i)) { return i; }
        } 
        return 0;
    }

}
