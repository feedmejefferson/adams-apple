import { Component, h } from "preact";
import { Dilemma } from "../dilemma"
import { IndexedTree } from "./tree";


interface State {
    tree: IndexedTree;
}

interface Props {
    branch: number;
    step: number;
    a: string;
    b: string;
}

export class CrystalBowl extends Component<Props, State> {
	public async componentWillMount() {
        const url = new URL('/assets/meta/indexed-tree.json', window.location.href);
        const res = await fetch(url.href);
        const json = await res.json();
        const tree = { tree: new IndexedTree(json) };

		this.setState( tree );
    }

    
    public render({ branch, step, a, b }: Props, { tree }: State) {
        let selection;
        if(this.state.tree) {
            step = step ? step : 1;
            branch = branch ? branch : 1;
            const branchA = branch * 2;
            const branchB = branchA + 1;
            a = a ? a : this.state.tree.getRandom(branchA);
            b = b ? b : this.state.tree.getRandom(branchB);
            selection = <Dilemma step={step} branch={branch} a={a} b={b} tree={this.state.tree} />;
        } else {
            selection = "";
        }
		return (
            selection
        )
    }
}
