"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PAGE_SIZE = 100;
var EL_P_PAGE = 4;

// Data is {data-key: [vals]}
function data_match(el, data) {
	for (var k in data) {
		if (data.hasOwnProperty(k)) {
			console.log('looking at', k, data[k], el.dataset[k]);
			if (!_.contains(data[k], el.getAttribute("data-" + k))) {
				return false;
			}
		}
	}
	return true;
}

var SoFiPa = function () {
	function SoFiPa(list_sel, item_sel) {
		_classCallCheck(this, SoFiPa);

		this.$list = $(list_sel);
		this.item_sel = item_sel;
		//this.sort_key = null;
	}

	_createClass(SoFiPa, [{
		key: "filter",
		value: function filter(data) {
			var $items = this.$list.find(this.item_sel);
			if (data === void 0) {
				$items.show();
				return;
			}
			var t = this;
			$items.each(function (idx, el) {
				var $el = $(el);
				console.log($el.data());
				var ret = data_match(el, data);
				if (ret) {
					$el.show();
				} else {
					$el.hide();
					$el.appendTo(t.$list);
				}
			});

			//.appendTo($list);
		}
	}, {
		key: "sort",
		value: function sort() {
			var that = this;
			this.$list.find(this.item_sel).sort(function (a, b) {
				var $a = $(a);
				if (!$a.isVisible()) {
					return -1;
				}
				return $a.data(that.sort_key) < $(b).data(that.sort_key) ? -1 : 1;
			}).appendTo(this.$list);
		}
	}]);

	return SoFiPa;
}();

//$("ul li").css({transform: "translateY(-50px)"})


var s = new SoFiPa("ul", "li");
s.sort_key = "price";
s.sort();

$("span").on("click", function (e) {
	console.log($(e.currentTarget).text());
});