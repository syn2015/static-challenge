

<template lang="html">
    <div >
        <Heador/>
        <Slider/>
        <Welfare/>
        <Service/>
        <Footer/>
        <Navbar/>
    </div>
</template>

<script>
import Heador from "../public/header.vue"
import Footer from "../public/footer.vue"
import Navbar from "../public/navbar.vue"
import Slider from "./islider.vue"
import Welfare from "./welfare.vue"
import Service from "./service.vue"
// import Adb from "./adb.vue"
// import Finance from "./finance.vue"
// import Adc from "./adc.vue"

export default {
    components: {
        Heador,
        Slider,
        Footer,
        Navbar,
        Welfare,
        Service,
    },
}
</script>

<style lang="scss" module>
</style>
