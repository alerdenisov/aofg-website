<template>
  <div class="aofg-navigation">
    <nav class="nk-navbar nk-navbar-top nk-navbar-sticky nk-navbar-transparent nk-navbar-autohide">
      <div class="container">
        <div class="nk-nav-table">
          <router-link class="nk-nav-logo" to='/'>
            <img alt="" src="/static/img/header-logotype.png" width="90">
          </router-link>
          <ul class="nk-nav nk-nav-right hidden-md-down" data-nav-mobile="#nk-nav-mobile">
            <nav-element v-for="element in links" :key='element' :data="element" />
            <!-- <li class="active">
              <a href="index-2.html">Home</a>
            </li>
            <li class="nk-drop-item">
              <a href="page-contact.html">Features</a>
              <ul class="dropdown">
                <li class="nk-drop-item">
                  <a href="page-contact.html">Pages</a>
                  <ul class="dropdown">
                    <li class="">
                      <a href="page-contact.html">Contact</a>
                    </li>
                    <li class="">
                      <a href="page-coming-soon.html">Coming Soon</a>
                    </li>
                    <li class="">
                      <a href="page-404.html">404</a>
                    </li>
                    <li class="">
                      <a href="page-age-check.html">Age Check</a>
                    </li>
                  </ul>
                </li>
                <li class="nk-drop-item">
                  <a href="layout-nav-default.html">Navigations</a>
                  <ul class="dropdown">
                    <li class="">
                      <a href="layout-nav-default.html">Default</a>
                    </li>
                    <li class="">
                      <a href="layout-nav-default-transparent.html">Default Transparent</a>
                    </li>
                    <li class="">
                      <a href="layout-nav-main-top.html">Main Top Only</a>
                    </li>
                    <li class="">
                      <a href="layout-nav-main-side.html">Main Side</a>
                    </li>
                    <li class="">
                      <a href="layout-nav-main-top-fullscreen.html">Main Top + Fullscreen</a>
                    </li>
                    <li class="">
                      <a href="layout-nav-fullscreen-side.html">Fullscreen + Side</a>
                    </li>
                  </ul>
                </li>
                <li class="nk-drop-item">
                  <a href="layout-page-header.html">Headers</a>
                  <ul class="dropdown">
                    <li class="">
                      <a href="layout-header.html">Size Default</a>
                    </li>
                    <li class="">
                      <a href="layout-header-sm.html">Size Small</a>
                    </li>
                    <li class="">
                      <a href="layout-header-md.html">Size Mid</a>
                    </li>
                    <li class="">
                      <a href="layout-header-lg.html">Size Large</a>
                    </li>
                    <li class="">
                      <a href="layout-header-full.html">Size Full</a>
                    </li>
                    <li class="">
                      <a href="layout-header-video.html">Video</a>
                    </li>
                    <li class="">
                      <a href="layout-header-video-plain.html">Video Plain</a>
                    </li>
                    <li class="">
                      <a href="layout-header-no.html">NO Header</a>
                    </li>
                  </ul>
                </li>
                <li class="">
                  <a href="widgets.html">Widgets</a>
                </li>
                <li class="">
                  <a href="documentation.html">Documentation</a>
                </li>
              </ul>
            </li>
            <li class="nk-mega-item nk-drop-item">
              <a href="#">Elements</a>
              <div class="dropdown">
                <div class="bg-image" style="background-image: url('assets/images/bg-menu.jpg')"></div>
                <ul>
                  <li>
                    <ul>
                      <li class="">
                        <a href="element-carousels.html">Carousels</a>
                      </li>
                      <li class="">
                        <a href="element-image-boxes.html">Image Boxes</a>
                      </li>
                      <li class="">
                        <a href="element-icon-boxes.html">Icon Boxes</a>
                      </li>
                      <li class="">
                        <a href="element-counters.html">Counters</a>
                      </li>
                      <li class="">
                        <a href="element-blockquotes.html">Block Quotes</a>
                      </li>
                      <li class="">
                        <a href="element-testimonials.html">Testimonials</a>
                      </li>
                      <li class="">
                        <a href="element-team-members.html">Team Members</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li class="">
                        <a href="element-video-blocks.html">Video Blocks</a>
                      </li>
                      <li class="">
                        <a href="element-gif.html">Gif Animations</a>
                      </li>
                      <li class="">
                        <a href="element-forms.html">AJAX Forms</a>
                      </li>
                      <li class="">
                        <a href="element-countdown.html">Countdown</a>
                      </li>
                      <li class="">
                        <a href="element-text-typed.html">Typed Text</a>
                      </li>
                      <li class="">
                        <a href="element-tabs.html">Tabs</a>
                      </li>
                      <li class="">
                        <a href="element-accordions.html">Accordions</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li class="">
                        <a href="element-info-boxes.html">Info Boxes / Alerts</a>
                      </li>
                      <li class="">
                        <a href="element-call-to-action.html">Call to Action Blocks</a>
                      </li>
                      <li class="">
                        <a href="element-progress.html">Progress Bars</a>
                      </li>
                      <li class="">
                        <a href="element-pagination.html">Pagination</a>
                      </li>
                      <li class="">
                        <a href="element-pricing-tables.html">Pricing Tables</a>
                      </li>
                      <li class="">
                        <a href="element-modals.html">Modals</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li class="">
                        <a href="element-typography.html">Typography</a>
                      </li>
                      <li class="">
                        <a href="element-titles.html">Titles [headings]</a>
                      </li>
                      <li class="">
                        <a href="element-dropcaps.html">Dropcaps</a>
                      </li>
                      <li class="">
                        <a href="element-colors.html">Colors</a>
                      </li>
                      <li class="">
                        <a href="element-buttons.html">Buttons</a>
                      </li>
                      <li class="">
                        <a href="element-breadcrumbs.html">Breadcrumbs</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nk-drop-item">
              <a href="news-list.html">News</a>
              <ul class="dropdown">
                <li class="">
                  <a href="news-list.html">List</a>
                </li>
                <li class="">
                  <a href="news-single-image.html">Single Image</a>
                </li>
                <li class="">
                  <a href="news-single-video.html">Single Video</a>
                </li>
                <li class="">
                  <a href="news-single-audio.html">Single Audio</a>
                </li>
                <li class="">
                  <a href="news-single-gallery.html">Single Gallery</a>
                </li>
                <li class="">
                  <a href="news-single-quote.html">Single Block Quote</a>
                </li>
                <li class="">
                  <a href="news-single-standard.html">Single Standard</a>
                </li>
                <li class="">
                  <a href="news-single-big-content.html">Single Big Content Example</a>
                </li>
              </ul>
            </li>
            <li class="nk-drop-item">
              <a href="store.html">Store</a>
              <ul class="dropdown">
                <li class="">
                  <a href="store.html">Store</a>
                </li>
                <li class="">
                  <a href="store-product.html">Single Product</a>
                </li>
                <li class="">
                  <a href="store-cart.html">Cart</a>
                </li>
                <li class="">
                  <a href="store-checkout.html">Checkout</a>
                </li>
                <li class="">
                  <a href="store-account.html">Account</a>
                </li>
              </ul>
            </li>
            <li class="nk-drop-item">
              <a href="gallery.html">Media</a>
              <ul class="dropdown">
                <li class="">
                  <a href="gallery.html">Gallery 1 Column</a>
                </li>
                <li class="">
                  <a href="gallery-2-col.html">Gallery 2 Columns</a>
                </li>
                <li class="">
                  <a href="gallery-3-col.html">Gallery 3 Columns</a>
                </li>
                <li class="">
                  <a href="videos.html">Videos 1 Column</a>
                </li>
                <li class="">
                  <a href="videos-2-col.html">Videos 2 Columns</a>
                </li>
              </ul>
            </li>
            <li class="">
              <a href="forum.html">Forum</a>
            </li> -->
            <li>
              <a href="#"><span class="ic-user"></span> alerdenisov</a>
            </li>
          </ul>
          <ul class="nk-nav nk-nav-right nk-nav-icons">
            <!-- <li class="single-icon hidden-lg-up">
              <a class="no-link-effect" data-nav-toggle="#nk-nav-mobile" href="#"><span class="nk-icon-burger"><span class="nk-t-1"></span> <span class="nk-t-2"></span> <span class="nk-t-3"></span></span></a>
            </li>
            <li class="single-icon">
              <a class="nk-search-toggle no-link-effect" href="#"><span class="nk-icon-search"></span></a>
            </li>
            <li class="single-icon">
              <a class="nk-cart-toggle no-link-effect" href="#"><span class="nk-icon-toggle"><span class="nk-icon-toggle-front"><span class="ion-android-cart"></span> <span class="nk-badge">8</span></span> <span class="nk-icon-toggle-back"><span class="nk-icon-close"></span></span></span></a>
            </li>
            <li class="single-icon">
              <a class="no-link-effect" data-nav-toggle="#nk-side" href="#"><span class="nk-icon-burger"><span class="nk-t-1"></span> <span class="nk-t-2"></span> <span class="nk-t-3"></span></span></a>
            </li> -->
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script type="text/javascript">
  import NavElement from '@/components/parts/NavElement'

  export default {
    name: 'aofg-navigation',

    data() {
      return {
        links: [
          {
            title: 'Home',
            path: '/'
          },
          {
            title: 'Repositories',
            path: '/repositories'
          },
          {
            title: 'Documentation',
            path: '/docs'
          }
        ]
      }
    },

    components: {
      NavElement
    }
  }
</script>