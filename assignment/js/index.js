"use strict";

let app = {};


app.data = {    
    data: function() {
        return {
            // Complete.
        };
    },
    methods: {
        // Complete.
        getRow4() {
            return -1;
        }
    }
};

app.vue = Vue.createApp(app.data).mount("#app");
app.vue.recompute();

