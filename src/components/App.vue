<template>
    <div>
        app的跟组件{{message}}
        <hr>
        {{list}}
        <hr>
        <hello></hello>
    </div>
</template>
<script>
    import hello from './hello.vue';
    import { getFirest, postLogin } from '../request/api';
   export default {
    components: {
        hello
    },
    data () {
        return {
            message: '跟组件的app',
            list: [],
        }
    },
    mounted: function(){
        this.inintDemo()
    },
    methods: {
        inintDemo() {
            console.log(process.env.NODE_ENV, '-e----------');
            getFirest().then((res) => {
                console.log('res----', res);
                this.list = res;
            });
            postLogin({
                name: '333',
                age: 33
            }).then(res => {
                console.log("res_login", res)
            })
        }
    }
   }
</script>
<style>

</style>