import { slice } from "../components/chef-says/parse";
import { dilemma, food, newAppState } from "../state/constants";
import { UserConsent } from "../state/types";

const shortCaption = "hello world"
const longCaption = "This is a long string with a few more words than the short caption."

describe("parse caption test", () => {
    test("simple strings", () => {
        let sliced=slice(shortCaption,4,6);
        expect(sliced).toBeDefined(); 
        expect(sliced.content).toEqual("");
        sliced=slice(shortCaption);
        expect(sliced).toBeDefined(); 
        expect(sliced.content).toEqual(shortCaption);
        sliced=slice(longCaption,2,4);
        expect(sliced.content).toEqual("a long")
        expect(sliced.end).toEqual(4)
        expect(sliced.start).toEqual(2)
        sliced=slice(longCaption,12,13);
        expect(sliced.content).toEqual("short")
        expect(sliced.start).toEqual(12)
        expect(sliced.end).toEqual(13)
        sliced=slice(longCaption,12,14);
        expect(sliced.content).toEqual("short caption.")
        expect(sliced.start).toEqual(12)
        expect(sliced.end).toEqual(14)
        sliced=slice(longCaption,12,15);
        expect(sliced.content).toEqual("short caption.")
        expect(sliced.start).toEqual(12)
        expect(sliced.end).toEqual(14)
        sliced=slice(longCaption,12);
        expect(sliced.content).toEqual("short caption.")
        expect(sliced.start).toEqual(12)
        expect(sliced.end).toEqual(14)
        sliced=slice(shortCaption,0,0);
        expect(sliced.content).toEqual("")
        expect(sliced.start).toEqual(0)
        expect(sliced.end).toEqual(0)
        expect(sliced.last).toEqual("")

        
        
    });
    test("arrays", () => {
        let sliced=slice([shortCaption,longCaption],4,6);
        expect(sliced).toBeDefined(); 
        expect(sliced.content[0]).toEqual("a long");
        expect(sliced.start).toEqual(4)
        expect(sliced.end).toEqual(6)
        sliced=slice([shortCaption,shortCaption]);
        expect(sliced.content[0]).toEqual(shortCaption)
        expect(sliced.content[1]).toEqual(shortCaption)
        expect(sliced.start).toEqual(0)
        expect(sliced.end).toEqual(4)
        sliced=slice([shortCaption,shortCaption],1,3);
        expect(sliced.content[0]).toEqual("world")
        expect(sliced.content[1]).toEqual("hello")
        expect(sliced.start).toEqual(1)
        expect(sliced.end).toEqual(3)
        expect(sliced.last).toEqual("hello")
        sliced=slice([shortCaption,shortCaption],0,0);
        expect(sliced.content.length).toEqual(0)
        expect(sliced.start).toEqual(0)
        expect(sliced.end).toEqual(0)
        expect(sliced.last).toEqual("")
        
    });


});
