import { ref } from "vue";

export default function usePagination(listLength, pageSize = 10) {
  
  const currentPage = ref(1)
  const perPage = pageSize
  const pages = Math.ceil(listLength / pageSize)
  

  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }
  
  const nextPage = () => {
    if (currentPage.value < pages) {
      currentPage.value++
    }
  }

  return {
    currentPage,
    pages,
    perPage,
    previousPage,
    nextPage,
  };
}