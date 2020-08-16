import { list } from './List';

// eslint-disable-next-line import/prefer-default-export
export class ListItem {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.HTML = this.HTMLforming();
  }

  HTMLforming() {
    const itemElem = document.createElement('tr');
    itemElem.classList.add('item');
    itemElem.setAttribute('item-id', `${String(list.items.length)}`);
    itemElem.innerHTML = `
<td class="item__name">${this.name}</td>
<td class="item__price">${this.price}</td>
<td class="actions">
  <div class="edit icon">
    <span class="visability-hidden">Редактировать</span>
  </div> 
   <div class="delete icon">
        <span class="visability-hidden">Удалить из списка</span>
    </div>
  </td>
 
`;
    return itemElem;
  }

  HTMLEdit(e) {
    const itemElem = document.createElement('tr');
    itemElem.classList.add('item');
    itemElem.setAttribute('item-id', `${list.items.indexOf(this)}`);
    itemElem.innerHTML = `
<td class="item__name">${this.name}</td>
<td class="item__price">${this.price}</td>
<td class="actions">
  <div class="edit icon">
    <span class="visability-hidden">Редактировать</span>
  </div> 
   <div class="delete icon">
        <span class="visability-hidden">Удалить из списка</span>
    </div>
  </td>
 
`;
    return itemElem;
  }

  HTMLforming() {
    const itemElem = document.createElement('tr');
    itemElem.classList.add('item');
    itemElem.setAttribute('item-id', `${String(list.items.length)}`);
    itemElem.innerHTML = `
<td class="item__name">${this.name}</td>
<td class="item__price">${this.price}</td>
<td class="actions">
  <div class="edit icon">
    <span class="visability-hidden">Редактировать</span>
  </div> 
   <div class="delete icon">
        <span class="visability-hidden">Удалить из списка</span>
    </div>
  </td>
 
`;
    return itemElem;
  }
}
