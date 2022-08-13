<template>
  <div>
    <title-bar
      v-if="userRole == 'Employee'"
      :title-stack="titleStackEmployee"
    />
    <title-bar
      v-if="userRole == 'Admin'"
      :title-stack="titleStackAdmin"
    />
    <hero-bar>
      Profile
      <router-link
        slot="right"
        to="/dashboard"
        class="button"
      >
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <profile-update-form class="tile is-child" />
        <card-component
          title="Profile"
          icon="account"
          class="tile is-child"
        >
          <user-avatar class="image has-max-width is-aligned-center" />
          <hr>
          <b-field label="Name">
            <b-input
              :value="firstName + ' ' + lastName"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <hr>
          <b-field label="E-mail">
            <b-input
              :value="userEmail"
              custom-class="is-static"
              readonly
            />
          </b-field>
        </card-component>
      </tiles>
      <password-update-form />
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { mapState } from 'vuex'
import CardComponent from '@/components/BaseCardComponent.vue'
import TitleBar from '@/components/BaseTitleBar.vue'
import HeroBar from '@/components/BaseHeroBar.vue'
import ProfileUpdateForm from '@/components/forms/ProfileUpdateForm.vue'
import PasswordUpdateForm from '@/components/forms/PasswordUpdateForm.vue'
import Tiles from '@/components/BaseTiles.vue'
import UserAvatar from '@/components/BaseUserAvatar.vue'

export default defineComponent({
  name: 'Profile',
  components: {
    UserAvatar,
    Tiles,
    PasswordUpdateForm,
    ProfileUpdateForm,
    HeroBar,
    TitleBar,
    CardComponent
  },
  data () {
    return {
      userRole: this.$store.state.authentication.role,
      titleStackEmployee: ['Employee', 'Profile'],
      titleStackAdmin: ['Admin', 'Profile']
    }
  },
  computed: {
    ...mapState({
      firstName: state => state.authentication.firstName,
      lastName: state => state.authentication.lastName,
      userEmail: state => state.authentication.email
    })
  }
})
</script>
