<template>
  <transition name="modal-transition">
    <div class="TheModal"
      v-if="isModalOpen"
      @click.prevent="handleClickOutside"
    >
      <div 
        ref="modalRef"
        v-if="isModalOpen"
        class="TheModal__modal"
      >
        <div class="modal__header">
          <span class="header-title">
            {{props.message.name}}
          </span>
          <i
            class="fa fa-times TheModal__icon"
            @click.stop="closeModal"
          />
        </div>
        <div
          class="modal__content"
        >
          <div @click.stop v-html="props.message.content"></div>
        </div> 
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { getCurrentInstance } from 'vue';

const { emit } = getCurrentInstance();
const props = defineProps({
  isModalOpen: {
    type: Boolean,
    default: false
  },
  message: {
    type: Object,
    default: () => {}
  }
})
const modalRef = ref(null);

const closeModal = () => {
  emit('closeModal');
}

const handleClickOutside = (event) => {
   if (!modalRef.value.contains(event.target)) {
    closeModal();
  }
}

</script>
<style lang="scss" scoped>
.modal-transition-enter-active,
.modal-transition-leave-active {
  transition: opacity 0.3s;
}

.modal-transition-enter-from,
.modal-transition-leave-to {
  opacity: 0;
}

.TheModal {
  background: rgba(0, 0, 0, 0.7);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 20px;
  transition: all 0.3s ease-in-out;

  &__modal {
    opacity: 1;
    background: #ededed;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: auto;
    max-height: 90%;
    min-width: 800px;
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%,-50%);
    z-index: 10;
    overflow: auto;
  

    .modal__content {
      padding: 30px;
      height: 100%;

      a {
        color: #00AFEC;
      }
    }
    
    .modal__header {
      font-size: 16px;
      letter-spacing: 0;
      text-align: left;
      padding: 8px 12px;
      background: #282b32;
      color: #ededed;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__icon {
    font-size: 14px;
  }

  &__icon:hover {
    color: #00AFEC;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .TheModal__modal {
      min-width: 100%;
      min-height: 100%;
      top: 0;
      left: 0;
      transform: none;
      border-radius: 0;
      justify-content: unset;
    }
  }
}
</style>