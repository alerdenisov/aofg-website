<template>
  <div class="aofg-contacts">
    <div class="nk-contacts-top">
      <div class="container">
        <div class="nk-contacts-left">
          <div class="nk-navbar">
            <ul class="nk-nav">
              <li class="nk-drop-item">
                <a href="#">Russia</a>
                <ul class="dropdown">
                  <li>
                    <a href="#">Russia</a>
                  </li>
                  <li>
                    <a href="#">USA</a>
                  </li>
                  <li>
                    <a href="#">United Kingdom</a>
                  </li>
                  <li>
                    <a href="#">France</a>
                  </li>
                  <li>
                    <a href="#">Spain</a>
                  </li>
                  <li>
                    <a href="#">Germany</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="page-contact.html">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="nk-contacts-right">
          <div class="nk-navbar">
            <ul class="nk-nav">
              <li>
                <a href="https://twitter.com/nkdevv" target="_blank"><span class="ion-social-twitter"></span></a>
              </li>
              <li>
                <a href="https://dribbble.com/_nK" target="_blank"><span class="ion-social-dribbble-outline"></span></a>
              </li>
              <li>
                <a href="#"><span class="ion-social-instagram-outline"></span></a>
              </li>
              <li>
                <a href="#"><span class="ion-social-pinterest"></span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'aofg-contacts',

    props: ['languages', 'links', 'socials'],
    
    data() {
      return {}
      // this.links = this.links || [
      //   { 'title': 'Privacy', 'url': '/ru' },
      //   { 'title': 'Contacts', 'url': '/ru' },
      //   { 'title': 'Legacy', 'url': '/ru' },
      // ];

      // this.languages = this.languages || [
      //   { 'title': 'Русский', 'url': '/ru' },
      //   { 'title': 'English', 'url': '/ru' }
      // ]

      // this.socials = this.socials || [
      //   { 'title': '', 'icon': 'ion-social-instagram-outline', 'url': '/ru' },
      //   { 'title': '', 'icon': 'ion-social-instagram-outline', 'url': '/ru' },
      //   { 'title': '', 'icon': 'ion-social-instagram-outline', 'url': '/ru' },
      //   { 'title': '', 'icon': 'ion-social-instagram-outline', 'url': '/ru' },
      // ];
    }
  }
</script>