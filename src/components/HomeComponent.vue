<template>
  <div>
    <vl-content-header
        mod-large
        mod-show-mobile
        mod-context
        :background="{
            src: '//www.vlaanderen.be/sites/default/files/ip_acm/page_banner_narrow/header.jpg',
            srcset: '//www.vlaanderen.be/sites/default/files/ip_acm/page_banner_mobile_alt/header.jpg 320w, //www.vlaanderen.be/sites/default/files/ip_acm/page_banner_narrow/header.jpg 1024w, //www.vlaanderen.be/sites/default/files/ip_acm/page_banner_wide_alt/header.jpg 1600w',
            alt: 'OSLO Content Header',
          }">
      <div class="vl-content-header__logo-wrapper">
        <vl-content-header-entity
            prefix="Informatie"
            title="Vlaanderen"
            logo="true"
            href="https://data.vlaanderen.be/doc/organisatie/OVO002949"
            mod-small/>
      </div>
      <vl-content-header-title
          title="Search Engine"
          tag-name="h1"
          href="https://github.com/Informatievlaanderen/OSLO-Search-Engine"
          :context="{
                href: 'https://overheid.vlaanderen.be/producten-diensten/oslo',
                title: 'OSLO',
              }"/>
    </vl-content-header>

    <SearchComponent/>
  </div>
</template>

<script>
import SearchComponent from "@/components/SearchComponent";

export default {
  name: 'HomeComponent',
  components: {
    SearchComponent
  }
}
</script>

<style lang="scss"></style>
