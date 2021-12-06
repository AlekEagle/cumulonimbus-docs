<template>
  <div></div>
</template>

<script>
  export default {};
</script>

<style>
  :root {
    --main-bg-color: #18222c;
    --navbar-bg-color: #2c3e50;
    --header-color: #cecece;
    --decoration-accent-color: #496785;
    --h1-color: #dfdfdf;
    --h2-color: #d0d0d0;
    --body-color: #c0c0c0;
    --accent-color: #3eaf7c;
  }

  html.dark-theme-transition,
  html.dark-theme-transition * {
    transition: color 0.02s, background-color 0.2s, border-color 0.2s;
  }

  html.dark-theme,
  html.dark-theme body {
    background-color: var(--main-bg-color);
  }

  html.dark-theme header.navbar,
  html.dark-theme header.navbar div.links,
  html.dark-theme aside.sidebar {
    background-color: var(--navbar-bg-color);
    color: var(--header-color);
    border-color: transparent;
  }

  html.dark-theme span.site-name {
    color: var(--header-color) !important;
  }

  html.dark-theme div.search-box input {
    background-color: var(--main-bg-color);
    border-color: transparent;
    color: var(--h1-color);
  }

  html.dark-theme .home .feature h1,
  html.dark-theme h1 {
    color: var(--h1-color);
  }

  html.dark-theme
    .sidebar-group.is-sub-group
    > .sidebar-heading:not(.clickable) {
    opacity: 1;
  }

  html.dark-theme h2,
  html.dark-theme .page-nav .inner,
  html.dark-theme .features,
  html.dark-theme .footer {
    border-color: var(--decoration-accent-color);
  }

  html.dark-theme .router-link-active:not(.site-name),
  html.dark-theme .nav-link:hover:not(.action-button) {
    color: var(--accent-color);
  }

  html.dark-theme .home .feature h2,
  html.dark-theme h2 {
    color: var(--h2-color);
  }

  html.dark-theme p,
  html.dark-theme div,
  html.dark-theme span,
  html.dark-theme .home .description,
  html.dark-theme .home .feature p,
  html.dark-theme .footer,
  html.dark-theme .sidebar-link:not(.active),
  html.dark-theme code {
    color: var(--body-color);
  }

  html.dark-theme .custom-block {
    background-color: var(--navbar-bg-color);
  }

  html.dark-theme .custom-block.danger .custom-block-title {
    color: var(--body-color);
  }
</style>
