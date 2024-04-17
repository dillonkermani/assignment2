"use strict";

const app = Vue.createApp({
    data() {
        return {
            values: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 13850, // Default for an individual
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
                { min: 0,     max: 11250, rate: 10 },
                { min: 11251, max: 45925, rate: 12 },
                { min: 45926, max: 94500, rate: 22 },
                { min: 94501, max: 182950, rate: 24 },
                { min: 182951, max: 365800, rate: 32 },
                { min: 365801, max: 555600, rate: 35 },
                { min: 555601, max: Infinity, rate: 37 }
            ]
        };
    },
    methods: {
        updateAll() {
            this.updateRow4();
            this.updateRow5();
            this.updateTaxAndTotals();
        },
        updateRow4() {
            this.values[4] = Number(this.values[1]) + Number(this.values[2]) + Number(this.values[3]);
        },
        updateRow5() {
            this.values[5] = this.values.filingJointly ? 27700 : 13850;
        },
        updateTaxAndTotals() {
            this.values[6] = Math.max(0, this.values[4] - this.values[5]);
            this.values[9] = this.values[7] + this.values[8];
            this.values[10] = this.calculateTax(this.values[6]);
            this.values[12] = this.values[10] + this.values[11];
            this.values[13] = Math.max(0, this.values[9] - this.values[12]);
            this.values[14] = Math.max(0, this.values[12] - this.values[9]);
        },
        calculateTax(income) {
            let tax = 0;
            for (const bracket of this.rates) {
                if (income > bracket.min) {
                    const taxableIncome = Math.min(income - bracket.min, bracket.max - bracket.min);
                    tax += taxableIncome * (bracket.rate / 100);
                    income -= taxableIncome;
                    if (income <= 0) break;
                }
            }
            return tax;
        }
    },
    mounted() {
        this.updateAll();
    }
}).mount("#app");
