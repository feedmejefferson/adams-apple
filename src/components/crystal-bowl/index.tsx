import { Component, h } from "preact";
import { Store } from "unistore";
import { globalState } from "../../state";
import { IndexedTree } from "../../state/tree";
import { loadBranch } from "../../state/tree-loader";
import { dilemma as newDilemma } from "../../state/types"
import { Dilemma } from "../dilemma"


interface Props {
    branch: number;
    a: string;
    b: string;
}

export class CrystalBowl extends Component<Props, {}> {
    
    public render({ branch, a, b }: Props) {
        const state = globalState.getState();
        branch = branch ? branch : state.branch;
        globalState.setState({
            branch,
            dilemma: newDilemma(a ? a : state.dilemma.a.id ,b ? b : state.dilemma.b.id)
        });
        loadBranch(globalState, branch);
        return <Dilemma/>
    }
}
