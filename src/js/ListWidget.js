import { list } from './List';
import { ListItem } from './listItem';
import { showTooltip } from './showTooltip';

export class ListWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get markup() {
    return `<div class="liat-widget">
        <div class="widget_header">
            <H1>Товары</H1>
            <div class="plus icon"><span class="visability-hidden">add item</span></div>
        </div>
       
              
</div>`;
  }

  bindToDOM() {
    this.parentEl.innerHTML = this.constructor.markup;
    this.listRender(list);
  }

  popupCancel() {
    const cancel = document.querySelector('.button_cancel');
    cancel.addEventListener('click', () => {
      document.querySelector('.popup').remove();
    });
  }

  static get deletePopoup() {
    return `<div class="popup">
  <p>Вы действительно хотите удалить товар из списка?</p>
  <button class="button_ok">Да</button>
   <button class="button_cancel">Нет</button>

</div>`;
  }

  listeners() {
    const plus = document.querySelector('.plus');
    plus.addEventListener('click', () => {
      this.parentEl.insertAdjacentHTML('beforeend', this.constructor.popup);
      const ok = document.querySelector('.button_ok');
      ok.addEventListener('click', () => {
        if (document.querySelector('.name').value !== '') {
          const price = document.querySelector('.price').value;
          if (String(parseInt(price, 10)) !== price) {
            showTooltip(document.querySelector('.price'),'Значение веденное в поле цена не является числом');
          } else {
            const item = new ListItem(document.querySelector('.name').value, document.querySelector('.price').value);
            list.items.push(item);
            document.querySelector('.popup')
              .remove();
            this.listRender(list);
          }
        } else {
          showTooltip(document.querySelector('.name'),'Вы не ввели название товара');
        }
      });
      this.popupCancel();
    });
    document.querySelector('.items').addEventListener('click', (e) => {
      if (document.querySelector('.popup') !== null) {
        document.querySelector('.popup').remove();
      }
      if (e.target.classList.contains('edit')) {
        this.parentEl.insertAdjacentHTML('beforeend', this.constructor.popup);
        document.querySelector('.name').value = list.items[e.target.closest('.item').getAttribute('item-id')].name;
        document.querySelector('.price').value = list.items[e.target.closest('.item').getAttribute('item-id')].price;
        const ok = document.querySelector('.button_ok');
        ok.addEventListener('click', () => {
          list.items[e.target.closest('.item').getAttribute('item-id')].name = document.querySelector('.name').value;
          list.items[e.target.closest('.item').getAttribute('item-id')].price = document.querySelector('.price').value;
          list.items[e.target.closest('.item').getAttribute('item-id')].HTML = list.items[e.target.closest('.item').getAttribute('item-id')].HTMLEdit(e);
          document.querySelector('.popup').remove();
          this.listRender(list);
        });
        this.popupCancel();
      }
      if (e.target.classList.contains('delete')) {
        this.parentEl.insertAdjacentHTML('beforeend', this.constructor.deletePopoup);
        const ok = document.querySelector('.button_ok');
        ok.addEventListener('click', () => {
          list.items.splice(Number(e.target.closest('.item').getAttribute('item-id')), 1);
          document.querySelector('.popup').remove();
          this.listRender(list);
        });
        this.popupCancel();

      }
    });
  }


  static get popup() {
    return `<div class="popup">
  <form class="edit_specs">
    <label>
    <span class="input-name">Наименование</span>
    <input type="text" class="name">
    </label>
     <label>
    <span class="input-name">Стоимость</span>
    <input type="number" class="price">
    </label>
  </form>
  <button class="button_ok">Сохранить</button>
   <button class="button_cancel">Отмена</button>

</div>`;
  }

  listRender(tasks) {
    if (document.querySelector('table') === null) {
      this.parentEl.insertAdjacentHTML('beforeend', ` <table>
        <thead>
          <tr>
            <td>Назание</td>
            <td>Стоимость</td>
            <td>Действия</td>
          </tr>
        </thead> 
        <tbody class="items">

</tbody>
</table>`);
    }

    const fragment = document.createDocumentFragment();
    tasks.items.forEach((element) => {
      fragment.append(element.HTML);

    });
    document.querySelector('.items').innerHTML = '';
    document.querySelector('.items').append(fragment);
  }
}
