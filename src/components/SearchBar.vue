<template>
  <div class="SearchBar">
    <input
      class="SearchBar__input"
      type="text"
      placeholder="Search"
      v-model="searchTerm"
    />
    <i
      class="fa fa-search SearchBar__icon"
      aria-hidden="true"
      type="button"
      @click="search"
    ></i>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useMessages from '@/composables/useMessages'

const searchTerm = ref('');
const { searchMessages } = useMessages();


const search = () => {
  searchMessages(searchTerm.value);
}

</script>

<style lang="scss" scoped>
.SearchBar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  .SearchBar__input {
    width: 50%;
    height: 2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 1rem;
    font-size: 1rem;
    &:focus {
      outline: none;
    }
  }
  .SearchBar__icon {
    margin-left: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
  }
}
</style>