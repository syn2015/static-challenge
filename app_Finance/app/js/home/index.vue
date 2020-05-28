<template lang="html">
    <div >
        <Heador/>
        <Hslider/>
        <Novice/>
        <Borrow/>
        <Money/>
        <Product/>
        <Life/>
        <Footer/>
        <Navbar/>
    </div>
</template>

<script>
import Heador from "../public/header.vue"
import Hslider from "../home/hslider.vue"
import Footer from "../public/footer.vue"
import Navbar from "../public/navbar.vue"
import Novice from "./novice.vue"
import Money from "./money.vue"
import Borrow from "./borrow.vue"
import Product from "./product.vue"
import Life from "./life.vue"
export default {
    components: {
        Heador,
        Hslider,
        Novice,
        Money,
        Borrow,
        Product,
        Life,
        Footer,
        Navbar,
    },
}
</script>

<style lang="scss" module>

</style>
