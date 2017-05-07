new Vue({
	el: "#app",
	data: {
		totalMoney: 0,
		productList: [],
		selectAllFlag: false,
		delFlag: false
	},
	filters: {
		formatMoney: function(value) {
			return "￥" + value.toFixed(2);
		}
	},
	mounted: function() {
		this.$nextTick(function() {
			this.cartView();
		});
	},
	methods: {
		cartView: function() {
			var _this = this;
			this.$http.get("data/cartData.json").then(function(res) {
				_this.productList = res.body.result.list;
			});
		},
		changeMoney: function(product, way) {
			if(way > 0) {
				product.productQuentity ++;
			} else {
				product.productQuentity --;
				if(product.productQuentity < 1) {
					product.productQuentity = 1;
				}
			}
			this.calcTotalPrice();
		},
		selectedProduct: function(item) {
			if(typeof item.checked == "undefined") {
				// 全局
				Vue.set(item, "checked", true);
				// 局部
				//this.$set(item, "checked", true);
			} else {
				item.checked = !item.checked;
			}
			this.calcTotalPrice();
			this.checkSelectAll();
		},
		selectAll: function() {
			this.selectAllFlag = !this.selectAllFlag;
			var _this = this;
			this.productList.forEach(function(item, index) {
				if(typeof item.checked == "undefined") {
					_this.$set(item, "checked", _this.selectAllFlag);
				} else {
					item.checked = _this.selectAllFlag;
				}
			});
			this.calcTotalPrice();
		},
		calcTotalPrice: function() {
			var _this = this;
			_this.totalMoney = 0;
			this.productList.forEach(function(item, index) {
				if(item.checked) {
					_this.totalMoney += item.productPrice * item.productQuentity;
				}
			});
		},
		delConfirm: function(item) {
			this.delFlag = true;
			this.curProduct = item;
		},
		delProduct: function() {
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index, 1);
			this.delFlag = false;
		},
		checkSelectAll: function() {
			var selectedNum = 0;
			var _this = this;
			this.productList.forEach(function(item, index) {
				if(item.checked) {
					selectedNum ++;
				}
			});
			if(selectedNum == _this.productList.length) {
				this.selectAllFlag = true;
			} else {
				this.selectAllFlag = false;
			}
		}
	}
});