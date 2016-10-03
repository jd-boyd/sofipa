import {data_match, SoFiPa} from "sofipa";

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });

    it("blah", function() {
	const sfp = new SoFiPa();
      expect(typeof sfp).toBe(true);
  });


});
