import { ref } from 'vue';
import { headers } from '@/constants/messagesList';

const initialMessages = ref([]);
const messages = ref([]);
const messagesHeaders = ref(headers);

export default function useMessages() {

  const getRandomString = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const prepareMessageArray = () => {
    for (let i = 0; i < 1000; i++) {
      if(i%2 === 0) {
        messages.value.push({
          id: i,
          type: 'alert-info',
          date: '2021-01-01 19:04:43',
          name: `Alert message ${getRandomString()}`,
          content: '<h1>Hello</h1><p>Lorem ipsum dolor sit <a href="https://www.google.com" target="_blank">link text</a>, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in <a href="https://google.com" target="_blank">link text</a> velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui <a href="https://google.com" target="_blank">link text</a> deserunt mollit anim id est laborum.</p>',
          sender: 'test@gmail.com'
        });
      } else {
        messages.value.push({
          id: i,
          type: 'info',
          date: '2021-02-01 20:04:43',
          name: `Info message title  ${getRandomString()}`,
          content: '<h1>Alert</h1> content',
          sender: 'alert@gmail.com'
        });
      }
    }
    initialMessages.value = messages.value;
  };

  const removeMessage = (id) => {
    const index = messages.value.findIndex(message => message.id === id);
    messages.value.splice(index, 1);
  };

  const searchMessages = (searchValue) => {
    const searchValueLower = searchValue.toLowerCase();
    messages.value = initialMessages.value.filter(message => {
      return message.name.toLowerCase().includes(searchValueLower) || message.content.toLowerCase().includes(searchValueLower);
    });
  };

  const sortList = (headerName) => {
    const header = messagesHeaders.value.find(header => header.name === headerName);
      header.activeSort = header.activeSort === 'desc' ? 'asc' : 'desc';

      const valueToSort = headerName.toLowerCase();
      if(valueToSort === 'date') {
        messages.value.sort((a, b) => {
          if (header.activeSort === 'desc') {
            return new Date(a[valueToSort]) - new Date(b[valueToSort]);
          } else {
            return new Date(b[valueToSort]) - new Date(a[valueToSort]);
          }
        });
        return;
      } else {
        if (header.activeSort === 'desc') {
        messages.value.sort((a, b) => a[valueToSort].toLowerCase().localeCompare(b[valueToSort].toLowerCase()));
        } else {
          messages.value.sort((a, b) => b[valueToSort].toLowerCase().localeCompare(a[valueToSort].toLowerCase()));
        }
      }
  };

  return {
    messages, 
    messagesHeaders,
    prepareMessageArray,
    searchMessages,
    sortList,
    removeMessage,
  };
}