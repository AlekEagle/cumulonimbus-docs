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

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .nav-item,
  .repo-link,
  .nav-link,
  .sidebar-link,
  .sidebar-heading,
  .custom-block-title,
  .custom-block.details summary {
    font-family: 'Montserrat', 'Franklin Gothic Medium', 'Arial Narrow', Arial,
      sans-serif;
  }

  .nav-item,
  .repo-link,
  .nav-item a,
  .nav-link,
  a.sidebar-link,
  .sidebar-group.is-sub-group > .sidebar-heading,
  .custom-block-title,
  .custom-block.details summary {
    font-weight: 600;
  }

  p,
  div {
    font-family: 'Ubuntu', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  div[class*='language-'] pre,
  div[class*='language-'] pre[class*='language-'],
  code {
    font-family: 'Source Code Pro', monospace;
    font-weight: 500;
  }

  body {
    overflow-y: overlay;
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }

  html:not(.dark-theme) ::-webkit-scrollbar-thumb {
    background-color: #18222c;
  }

  html.dark-theme ::-webkit-scrollbar-thumb {
    background-color: #3eaf7c;
  }

  html.dark-theme-transition,
  html.dark-theme-transition * {
    transition: color 0.02s, background-color 0.2s, border-color 0.2s,
      opacity 0.2s;
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
    font-family: Montserrat, 'Franklin Gothic Medium', 'Arial Narrow', Arial,
      sans-serif;
    color: var(--header-color);
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
  html.dark-theme .nav-link:hover:not(.action-button),
  html.dark-theme .page-edit .edit-link a,
  html.dark-theme .page-edit .last-updated .prefix {
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
