import { IndexedTree } from "../state/tree";
import { childPartials } from "../state/tree-loader";

describe("Tree tests", () => {
    test("constructor works", () => {
        const tree = new IndexedTree(JSON.parse('{"8":"008","9":"009","10":"010","11":"011","12":"012","13":"013","14":"014","15":"015"}'))
        expect(tree.getFirst(1)).toEqual("008");
        expect(tree.getFirst(4)).toEqual("008");
        expect(tree.getFirst(5)).toEqual("010");
        expect(tree.getRandom(1,0)).toEqual(tree.getFirst(1));
    });
    test("expand branch", () => {
        const tree = new IndexedTree(JSON.parse('{"8":"008","9":"009","10":"010","11":"011","12":"012","13":"013","14":"014","15":"015"}'))
        const newTree = tree.expandBranch(8,JSON.parse('{"16":"016","17":"017"}'));
        expect(newTree.get(8)).toBeFalsy();
        expect(newTree.get(16)).toEqual("016");
        expect(newTree.getFirst(1)).toEqual("016");
        expect(newTree.getFirst(5)).toEqual("010");
    });
    test("load partials", () => {
        expect(childPartials(2)).toEqual([8,9,10,11]);
        expect(childPartials(6)).toEqual([12,13]);
        expect(childPartials(33)).toEqual([66,67]);

    });
    test("expand branch", () => {
        const tree = new IndexedTree(JSON.parse('{"8":"008","9":"009","10":"010","11":"011","12":"012","13":"013","14":"014","15":"015"}'))
        expect(tree.ancestorNodeId(5)).toBeFalsy();
        expect(tree.ancestorNodeId(16)).toBe(8)
        expect(tree.firstChildNodeId(3)).toBe(12);
    });

});
