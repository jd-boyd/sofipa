const PAGE_SIZE=100;
const EL_P_PAGE=4;

// Data is {data-key: [vals]}
function data_match(el, data) {
    for (const k in data) {
	if (data.hasOwnProperty(k)) {
	    console.log('looking at', k, data[k], el.dataset[k]);
	    if (!_.contains(data[k], el.getAttribute("data-"+k))) {
		return false;
	    }
	}
    }
    return true;
}


class SoFiPa {
    constructor(list_sel, item_sel) {
	this.$list = $(list_sel);
	this.item_sel = item_sel;
	//this.sort_key = null;
    }
    filter(data) {
	const $items = this.$list.find(this.item_sel);
	if (data === void 0) {
	    $items.show();
	    return;
	}
	var t = this;
	$items.each(function (idx, el) {
	    const $el = $(el);
	    console.log($el.data());
	    const ret = data_match(el, data);
	    if (ret) {$el.show()} else {
		$el.hide();
		$el.appendTo(t.$list);
	    }
	})

	    //.appendTo($list);

	    }

    sort() {
	var that = this;
	this.$list.find(this.item_sel).sort(
	    function (a, b) {
		const $a = $(a);
		if (!$a.isVisible()) {
		    return -1;
		}
		return $a.data(that.sort_key) < $(b).data(that.sort_key) ? -1 : 1;
	    }
	).appendTo(this.$list);
    }
}

//$("ul li").css({transform: "translateY(-50px)"})


var s = new SoFiPa("ul", "li");
s.sort_key = "price";
s.sort();

$("span").on("click", function (e) {
    console.log($(e.currentTarget).text());
});
