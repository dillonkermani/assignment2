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
                [10, 0, 0], // Rate, Min for Single, Min for Joint
                [12, 11000, 22000],
                [22, 44725, 89450],
                [24, 95375, 190750],
                [32, 182100, 364200],
                [35, 231250, 462500],
                [37, 578125, 693750]
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
            const filingJointly = this.values.filingJointly;
        
            for (let i = 0; i < this.rates.length; i++) {
                const rate = this.rates[i][0];
                const min = filingJointly ? this.rates[i][2] : this.rates[i][1];
                const max = (i === this.rates.length - 1) ? Infinity : (filingJointly ? this.rates[i + 1][2] : this.rates[i + 1][1]);
        
                if (income > min) {
                    const taxableIncome = Math.min(income - min, max - min);
                    tax += (taxableIncome * rate) / 100;
        
                    if (income <= max) {
                        break;
                    }
                }
            }
        
            return tax;// Round to the nearest whole number for final tax calculation
        }
        
        
        
        
        
        
    },
    mounted() {
        this.updateAll();
    }
}).mount("#app");
