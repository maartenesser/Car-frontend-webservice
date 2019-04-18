new Vue({
    el: '#app',
    data() {
        return {
            products: null
        }
    },
    mounted() {
        axios
            .get('http://35.176.134.17:8081/products/')
            .then(response => (this.products = response.data.items))
    }
});

Vue.component('product', {
    template: '#product-card',
    data() {
        return {
            open: false,
            isDeleted: false,
        }
    },
    methods: {
        dropDown: function () {
            this.open = !this.open
        },
        deleteItem: function () {
            fetch('http://35.176.134.17:8081/products/' + this.productId, {
                method: 'DELETE'
            })
                .then(() => {
                    this.isDeleted = true
                })
        },
        edit: function () {
            if (!this.productBrand || !this.productModel || !this.productPrice) {
            } else {
                data = {
                    brand: this.productBrand,
                    model: this.productModel,
                    price: this.productPrice,
                };
                fetch('http://35.176.134.17:8081/products/' + this.productId, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors",
                    body: JSON.stringify(data)
                })
            }
        }
    },
    props: ['productId', 'productBrand', 'productModel', 'productPrice']

});
new Vue({el: '#product'});

Vue.component('create-product', {
    data() {
        return {
            warning: '',
            created: '',
            brand: null,
            model: null,
            price: null,
        }
    },
    methods: {
        create: function () {
            if (!this.brand || !this.model || !this.price) {
                this.warning = 'Please fill in all the fields'
            } else {
                data = {
                    brand: this.brand,
                    model: this.model,
                    price: this.price,
                };
                fetch('http://35.176.134.17:8081/products/', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors",
                    body: JSON.stringify(data)
                })
                    .then(() => {
                        this.created = 'Car is Added to database';
                        this.warning = '';
                        this.brand = '';
                        this.model = '';
                        this.price = ''
                    })
            }
        }
    },
    template: '#createProduct',
});
new Vue({el: '#create-product'});
