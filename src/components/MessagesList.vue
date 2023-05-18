<template>
  <div class="MessagesList">
    <SearchBar />
    <div class="MessagesList__container">
      <table v-if="messages.length" class="MessagesList__table">
        <thead>
          <tr> 
            <th
              scope="col"
              v-for="header in messagesHeaders" 
              :key="header.id"
            >
              {{ header.name }}
              <i 
              v-if="header.sortable"
              @click="sortList(header.name)"
              :class="{
                'fa fa-sort-asc': header.activeSort === 'asc',
                'fa fa-sort-asc rotate': header.activeSort === 'desc'
              }"></i>
            </th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td colspan="5">
              <p>Total: {{ messages.length }}</p>
            </td>
          </tr>
        </tfoot>
        <tbody>
          <tr 
            v-for="message in displayedMessages"
            :key="message.id"
            @click="openModal(message)"
          >
            <td class="MessagesList__table-icon">
              <i 
                class="MessagesList__icon--large"
                :class="{
                  'fa fa-envelope-open': message.type === MESSAGE_TYPES.INFO,
                  'fa fa-info-circle': message.type === MESSAGE_TYPES.ALERT_INFO
                }"
                aria-hidden="true"
              ></i>
            </td>
            <td>{{ message.name }}</td>
            <td>{{ message.date }}</td>
            <td>
              <a 
                :href="'mailto:' + message.sender"
                :title="message.sender"
                @click.stop
              >
                {{ message.sender }}
              </a>
            </td>
            <td class="MessagesList__table-action-buttons">
              <i 
                class="fa fa-search MessagesList__icon"
                aria-hidden="true"
                type="button"
                @click.stop="openModal(message)"
              ></i>
              <i 
                class="fa fa-times MessagesList__icon"
                aria-hidden="true"
                type="button"
                @click.stop="removeMessage(message.id)"
              ></i>    
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="messages.length" class="MessagesList__pagination">
      <i 
        class="fa fa-arrow-left MessagesList__icon"
        aria-hidden="true"
        type="button"
        @click="previousPage"
      ></i>
      <span>Page {{ currentPage }} of {{ Math.ceil(messages.length / perPage) }}</span>
      <i 
        class="fa fa-arrow-right MessagesList__icon"
        aria-hidden="true"
        type="button"
        @click="nextPage"
      ></i>
    </div>
    <div class="MessagesList__empty" v-else>
      <p>No messages found</p>
    </div>
    <TheModal 
      :is-modal-open="isModalOpen"
      :message="selectedMessage"
      @close-modal="isModalOpen = !isModalOpen"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { MESSAGE_TYPES } from '@/constants/messagesList.js'
import useMessages from '@/composables/useMessages'
import usePagination from '@/composables/usePagination'
import TheModal from '@/components/TheModal.vue'
import SearchBar from '@/components/SearchBar.vue'

const { messages, messagesHeaders, prepareMessageArray, sortList, removeMessage } = useMessages()
prepareMessageArray();
const { currentPage, perPage, previousPage, nextPage } = usePagination(messages.value.length)
const isModalOpen = ref(false)
const selectedMessage = ref({})

const displayedMessages = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage
  const endIndex = startIndex + perPage
  return messages.value.slice(startIndex, endIndex)
})

const openModal = (message) => {
  selectedMessage.value = message
  isModalOpen.value = !isModalOpen.value
}

</script>

<style scoped lang="scss">
.MessagesList {
  margin: 20px 0;
  padding: 20px 0;
  font-size: 12px;

  &__empty {
    text-align: center;
  }
  
  &__container {
    width: 100%;
    overflow-x: auto;
  }

  &__pagination {
    margin-top: 20px;
    text-align: center;
  }

  &__icon {
    font-size: 14px;
    padding: 0 5px;

    &--large {
      font-size: 20px;
    }
  }

   &__icon:hover {
    color: #00AFEC;
    cursor: pointer;
  }

  &__table-action-buttons, &__table-icon {
    width: 90px;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    user-select: none;
    cursor: pointer;


    th,
    td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ccc;
    }

    th {
      background-color: #282b30;
      color: #fff;
      font-size: 16px;
    }

    tfoot td {
      line-height: 22px;
      background: #ededed;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }

  .rotate {
    transform: rotate(180deg);
  }
}
</style>

