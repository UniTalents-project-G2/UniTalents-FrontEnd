<script >
import PortfolioListComponent from "@/modules/portfolio/components/portfolio-list.component.vue";
import PortfolioList from "@/modules/portfolio/components/portfolio-list.component.vue";

export default {
  name: 'portfolio-page',
  components: {PortfolioList, PortfolioListComponent},



}


</script>

<template>
<h1>Portafolio</h1>
  <portfolio-list-component>
  </portfolio-list-component>
</template>

<style scoped>

</style>