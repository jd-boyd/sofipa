// Data is {data-key: [vals]}
function data_match(el, data) {
    for (const k in data) {
	if (data.hasOwnProperty(k)) {
	    console.log('looking at', k, data[k], el.data(k));
	    if (!_.contains(data[k], el.data(k))) {
		return false;
	    }
	}
    }
    return true;
}

/*
  filter_data - dict of lists for keys and accepted values to filter by.
  sort_key - Key data for sorting
  item_sel - Optional selector for items in list.
             If not set, defaults to tagName of first element under list_sel.
  items_per_page - Optional int value used to determine page count.
  update_page_count - Optional callback for when page count changes.
  get_data - Optional function to get data to filter.
  get_sort - Optional function to get data to sort by.
*/
class SoFiPa {
    constructor(list_sel, options) {
	this.$list = $(list_sel);

	if (options.hasOwnProperty('sort_key')) {
	    this.sort_key = options.sort_key;
	} else {
	    this.sort_key = null;
	}

	if (options.hasOwnProperty('filter_data')) {
	    this.filter_data = options.filter_data;
	} else {
	    this.filter_data = {};
	}

	if (options.hasOwnProperty('item_sel')) {
	    this.item_sel = options.item_sel;
	} else {
	    this.item_sel = this.$list.children().first()[0].tagName;
	}

	if (options.hasOwnProperty('items_per_page')) {
	    this.items_per_page = options.items_per_page;
	} else {
	    this.items_per_page = null;
	}

	//
	if (options.hasOwnProperty('update_page_count')) {
	    this.update_page_count_cb = options.update_page_count;
	} else {
	    this.update_page_count_cb = null;
	}

	if (options.hasOwnProperty('get_data')) {
	    this.get_data = options.get_data;
	} else {
	    this.get_data = null;
	}

	if (options.hasOwnProperty('get_sort')) {
	    this.get_sort = options.get_sort;
	} else {
	    this.get_sort = null;
	}
    }

    set_filter(data) {
	this.filter_data = data;
	this.update();
    }

    set_sort(sort_key) {
	this.sort_key = sort_key;
	this.update();
    }

    get_page_count() {
	return 0;
    }

    update() {
	const page_count = this.get_page_count();
	this.sort();
	this.filter();
	if (this.update_page_count_cb && page_count !== this.get_page_count()) {
	    this.update_page_count_cb(page_count);
	}
    }

    filter() {
	const $items = this.$list.find(this.item_sel);
	if (this.filter_data === void 0) {
	    $items.show();
	    return;
	}
	var t = this;
	$items.each(function (idx, el) {
	    const $el = $(el);
	    console.log($el.data());
	    const ret = data_match($el, this.filter_data);
	    if (ret) {$el.show()} else {
		$el.hide();
		$el.appendTo(t.$list);
	    }
	});
    }

    sort() {
	var that = this;
	if (_.isNull(this.sort_key) || _.isUndefined(this.sort_key)) {
	    return;
	}
	var $items = this.$list.find(this.item_sel);
	console.log('items', $items, this.sort_key);
	$items.sort(
	    function (a, b) {
		const $a = $(a);
		const $b = $(b);
		if (!$a.is(':visible')) {
		    return -1;
		}
		return $a.data(that.sort_key) < $b.data(that.sort_key) ? -1 : 1;
	    }
	).appendTo(this.$list);
    }
}
