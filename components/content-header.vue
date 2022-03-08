<template>
  <vl-content-header
    class="animate__animated animate__backInDown"
    mod-large
    mod-alt
    mod-show-mobile
    mod-context
    :background="{
      src: 'https://source.unsplash.com/random/660x400',
      srcset:
        'https://source.unsplash.com/random/1850x500 1x, https://source.unsplash.com/random/3100x1050 2x',
      alt: 'Content Header'
    }"
  >
    <div class="vl-content-header__logo-wrapper">
      <vl-content-header-entity
        prefix="Digitaal"
        title="Vlaanderen"
        mod-small
      />
    </div>
    <vl-content-header-title
      title="Search Engine"
      tag-name="h1"
      href="https://data.vlaanderen.be"
      :context="{
        href: 'http://www.data.vlaanderen.be',
        title: 'OSLO'
      }"
    />
  </vl-content-header>
</template>
