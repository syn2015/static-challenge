<template lang="html">
    <div >
        <heador/>
        <hslider/>
        <novice/>
        <borrow/>
        <money/>
    </div>
</template>

<script>
import Heador from "../public/header.vue"
import Hslider from "../home/hslider.vue"
import Novice from "./novice.vue"
import Money from "./money.vue"
import Borrow from "./borrow.vue"
export default {
    components: {
        Heador,
        Hslider,
        Novice,
        Money,
        Borrow,
    },
}
</script>

<style lang="scss" module>

</style>
