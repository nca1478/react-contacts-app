/**
 * Insertar item en LocalStorage
 * @param  {String} item  Key data a almacenar
 * @param  {String} data  Data a almacenar
 * @return {void}
 */
const setItem = (item, data) => localStorage.setItem(item, data);

/**
 * Consultar item en LocalStorage
 * @param  {String}   item  Key de la data a consultar
 * @return {String}   Data consultada
 */
const getItem = (item) => localStorage.getItem(item);

/**
 * Eliminar item de LocalStorage
 * @param  {String}   item  Key de la data a eliminar
 * @return {void}
 */
const removeItem = (item) => localStorage.removeItem(item);

const keyLocalStorage = 'ContactsApp_dashboard';

export { setItem, getItem, removeItem, keyLocalStorage };
