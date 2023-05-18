export const MESSAGE_TYPES = {
  INFO: "info",
  ALERT_INFO: "alert-info",
}

export const HEADER_NAMES = {
	TYPE: "Type",
	NAME: "Name",
  DATE: "Date",
  SENDER: "Sender",
  ACTIONS: "Actions",
}


export const headers = [
  {
    id: 1, 
    name: HEADER_NAMES.TYPE,
    sortable: true,
    activeSort: 'desc',
  },
  {
    id: 2,
    name: HEADER_NAMES.NAME,
    sortable: true,
    activeSort: 'desc',
  },
  {
    id: 3,
    name: HEADER_NAMES.DATE,
    sortable: true,
    activeSort: 'desc',
  },
  {
    id: 4,
    name: HEADER_NAMES.SENDER,
    sortable: true,
    activeSort: 'desc',
  },
  {
    id: 5,
    name: '',
    sortable: false,
    activeSort: 'desc',
  },
];




