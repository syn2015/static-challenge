

<template lang="html">
    <div >
        <Heador/>
        <Rslider/>
        <Dialy/>
        <In/>
        <More/>
        <Footer cname="mfooter"/>
        <Navbar/>
    </div>
</template>

<script>
import Heador from "../public/header.vue"
import Footer from "../public/footer.vue"
import Navbar from "../public/navbar.vue"
import Rslider from "./rslider.vue"


import Dialy from "./dialy.vue"
import In from "./in.vue"
import More from "./more.vue"

export default {
    components: {
        Heador,
        Footer,
        Navbar,
        Rslider,
        Dialy,
        In,
        More,
    },
}
</script>

<style lang="scss" >
.mfooter{
    margin-top: 0!important;
    ul{
        li:first-child{
            display: none;
        }
    }
}
</style>
