<template>
  <div>
    [...]
    <div id="searchapp">
      <div
        ref="searchEl"
        class="search"
      >
        <input
          id="search__input"
          v-model="searchString"
          type="text"
          name="search"
          placeholder="Type for search (min 3 chars)"
        >

        <transition name="fade">
          <div
            v-if="searchResults.length > 0 && searchResultsVisible === true"
            class="search__results"
          >
            <ul>
              <li
                v-for="(doc, k) in searchResults"
                :key="k"
              >
                {{ doc.text }}
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
    [...]
    <ul class="list">
      <li class="list__item">
        [...]
        <div class="list__item__description">
          Lorem Ipsum...
        </div>
        [...]
      </li>
    </ul>
    [...]
  </div>
</template>

<script>
import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
const searchApp = new Vue({
  el: '#searchapp',

  data: {
    documents: [],
    searchString: '',
    searchResultsVisible: true
  },

  computed: {
    activeSearchString: function () {
      return this.searchString.length >= 3 ? this.searchString : ''
    },

    searchResults: function () {
      if (this.activeSearchString !== '') {
        return this.documents.filter(
          (d) =>
            d.text
              .toLowerCase()
              .includes(this.activeSearchString.toLowerCase()) === true
        )
      } else {
        return []
      }
    }
  },

  mounted: function () {
    const docsEls = document.querySelectorAll('.list__item')
    for (const item of Array.from(docsEls)) {
      this.documents.push({
        text: item.querySelector('.list__item__description').innerHTML
      })
    }

    // Usability improvement: click on body hides search results
    document.documentElement.addEventListener('click', this.handleClickOnBody)

    // Usability improvement: Esc key on keyboard hides search results
    document.addEventListener('keyup', this.handleKeyUp)
  },

  methods: {
    handleClickOnBody: function (e) {
      const target = e.target
      const searchEl = this.$refs.searchEl

      if (target !== searchEl && !searchEl.contains(target)) {
        this.searchResultsVisible = false
      } else {
        this.searchResultsVisible = true
      }
    },

    handleKeyUp: function (e) {
      if (e.key === 'Escape') {
        this.searchResultsVisible = false
      }
    }
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 250ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
