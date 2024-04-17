"use strict";

let app = {};

app.data = {    
    values: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        filingJointly: false
    },
    rates: [
        [10, 0, 0],
        [12, 11000, 22000],
        [22, 44725, 89450],
        [24, 95375, 190750],
        [32, 182100, 364200],
        [35, 231250, 462500],
        [37, 578125, 693750]
    ],
    methods: {
        updateTotals() {
            this.values[4] = this.values[1] + this.values[2] + this.values[3];
            this.values[5] = this.values.filingJointly ? 27700 : 13850;
            this.values[6] = Math.max(0, this.values[4] - this.values[5]);
            this.values[9] = this.values[7] + this.values[8];
            this.values[10] = this.calculateTax(this.values[6]);
            this.values[12] = this.values[10] + this.values[11];
            this.values[13] = Math.max(0, this.values[9] - this.values[12]);
            this.values[14] = Math.max(0, this.values[12] - this.values[9]);
        },
        calculateTax(income) {
            let tax = 0;
            for (let i = 0; i < this.rates.length; i++) {
                const rate = this.rates[i];
                if (income > rate[2]) {
                    tax += (rate[2] - (i > 0 ? this.rates[i - 1][2] : 0)) * rate[0] / 100;
                } else {
                    tax += (income - (i > 0 ? this.rates[i - 1][2] : 0)) * rate[0] / 100;
                    break;
                }
            }
            return tax;
        }
    }
};

app.vue = Vue.createApp(app.data).mount("#app");
app.vue.recompute();

