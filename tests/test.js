describe("SoFiPa Test suite", function() {
    it("data_match", function() {
        const $el = $("li").data({"year": [1649],
                                "price": [12.94]});
        const el = $el[0];

	const test_data = {
            "year": [1294, 1649],
            "size": ["xl"]
        };

        expect(data_match(el, test_data)).toBe(false);

        $el.data({"year": [1649],
                  "size": ["xl"]});

        expect(data_match(el, {
            "year": [1294, 1649],
            "size": ["xl"]
        })).toBe(false);

    });

    function jPluck($c) {
        const ret = [];

        return ret;
    }

    it("blah", function() {

        const test_data = [
            {val: 0, price: 12.75, size: "xl"},
            {val: 1, price: 1.75, size: "s"},
            {val: 2, price: 12, size: "xs"},
            {val: 3, price: 127, size: "m"},
            {val: 4, price: 12.5, size: "m"},
            {val: 5, price: 2.75, size: "l"},
        ];

        const $par = $("<DIV>");
        const $ul =  $("<UL>");
        $par.append($ul);

        let $li;
        for (let i = 0; i < 6; i += 1) {
            $li = $("<LI>").text(i+1).data(test_data[i]);
            $ul.append($li);
        }

        const sfp = new SoFiPa($ul, {
            sort_key: "price"
        });

        expect(sfp.item_sel).toBe("");

        //sfp.sort();

        //expect(typeof sfp).toBe(true);
    });
});
