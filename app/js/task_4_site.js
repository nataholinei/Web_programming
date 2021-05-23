// Необхідні змінні
let index = 0;
let book;

// Обробка бокового меню
function click_on_menu(object) {

    // Видаляємо клас "active" з усіх елементів меню
    $("li.nav-item").removeClass("active");

    // Отримуємо елемент, на який натиснули
    let item = $(object);

    // Задаємо активному елементу клас "active"
    item.addClass("active");

    // Отримуємо id активного елемента
    let id = item.attr('id');

    // Виконуємо необхідну дію
    switch (id) {

       // Перехід на головну сторінку
        case "menu_home":
            setTimeout(() => {
                document.location.href = "../index.html";
            }, 500);
            break;

       // Відобразити список книг
        case "menu_book":
            $("#div_task").attr("hidden", "");
            $("#div_book").removeAttr("hidden");
            break;

       // Відобразити завдання
        case "menu_task":
            $("#div_task").removeAttr("hidden");
            $("#div_book").attr("hidden", "");
            break;
    }
}

// Обробка вибору книги
function click_on_book(object) {

    let element;

    if (object === -1) {
        element = book[Math.floor(Math.random() * book.length)];
    }
    else {
        element = $(object).attr("data");
    }

    $.get(`../data/text/${element}.txt`, (data) => {

        let item_data = data.split("\n");

        let block =
            `<div class="modal-header border-secondary">
            <div class="d-flex flex-column ms-3">
               <h3 class="m-0">${item_data[0]}</h3>
               <span>Назва: ${item_data[1]}</span>
               <span>Автор: ${item_data[2]}</span>
               <span>Рік видання: ${item_data[3]}</span>
               <span>Вартість: ${item_data[4]}</span>
               <span>Кількість: ${item_data[5]}</span>
            </div>
            <button type="button" class="btn-close bg-primary me-3" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         
         <div class="modal-body">
            <img src="../data/img/${item_data[6]}.png" class="w-100" alt="book">
         </div>
         
         <div class="modal-footer border-secondary">
            <h5>${item_data[7]}</h5>
         </div>`;

        $("#modal_content").html(block);
        $('#modal').modal('show');

    });
}

// Підвантаження нових даних
function load_more_book(count) {

    let id = 0;
    while (id < count) {

        if (index >= book.length) {
            disable_load_button();
            return;
        }

        $.get(`../data/text/${book[index]}.txt`, (data) => {

            let item_data = data.split("\n");

            let block =
                `<div class="col-md-6 col-lg-4">
               <div class="p-2 book" onclick="click_on_book(this)" data="${item_data[6]}">
                  <img src="../data/img/${item_data[6]}.png" class="w-100" alt="book">
                  <div class="bg-ligth text-center">${item_data[0]}</div>
               </div>
            </div>`;

            $("#book").append(block);

        });

        id++;
        index++;
    }
}

// Вимкнення кнопки "показати більше книг"
function disable_load_button() {
    $("#load").addClass("disabled");
}

// Реагуємо на закривання модального вікна
$("#modal").on("hidden.bs.modal", () => {
    $("li.nav-item").removeClass("active");
    $("#menu_book").addClass("active");
    $("#div_task").attr("hidden", "");
    $("#div_book").removeAttr("hidden");
});

// Завантаження початкових даних
$(document).ready(() => {
    setTimeout(() => {
        $.get("../data/data.txt", (data) => {
            book = data.split("\n");
            book.splice(book.length - 1, 1);
            load_more_book(6);
        });
    }, 300);
});