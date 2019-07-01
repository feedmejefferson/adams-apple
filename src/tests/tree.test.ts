import { IndexedTree } from "../state/tree";

describe("Tree tests", () => {
    test("constructor works", () => {
        const tree = new IndexedTree(JSON.parse('{"8":"008","9":"009","10":"010","11":"011","12":"012","13":"013","14":"014","15":"015"}'))
        expect(tree.getFirst(1)).toEqual("008");
        expect(tree.getFirst(4)).toEqual("008");
        expect(tree.getFirst(5)).toEqual("010");
    });
    test("expand branch", () => {
        const tree = new IndexedTree(JSON.parse('{"8":"008","9":"009","10":"010","11":"011","12":"012","13":"013","14":"014","15":"015"}'))
        const newTree = tree.expandBranch(8,JSON.parse('{"16":"016","17":"017"}'));
        expect(newTree.get(8)).toBeFalsy();
        expect(newTree.get(16)).toEqual("016");
        expect(newTree.getFirst(1)).toEqual("016");
        expect(newTree.getFirst(5)).toEqual("010");
    });
});
