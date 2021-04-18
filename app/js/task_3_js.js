// ³���������� �����������
function btn_1_press() {
    alert(`�� ��������� ������ �1`);
}

// ³���������� ���� ������������
function btn_2_press() {
    let res = confirm(`�� ������ ��������?`);
    let like = "";
    if (!res) { like = "�� "; }
    alert(`���������� ���� �������� ������ �2 ${like}������ ��������`);
}

// ³��������� ���� ��������
function btn_3_press() {
    let name = prompt(`�� ��� �����?`);
    if (name) { name = name.trim(); }
    if (!name) { name = "����������"; }
    alert(`�����, ${name}!`);
}

// �������� ���� ��������
function clear_spec_field_1() {
    document.getElementById("spec_field_1").value = "";
}

// �������� ���� ��������
function clear_spec_field_2() {
    document.getElementById("spec_field_2").value = "";
}

// ����������� ��������� ������ � ������ ������
function only_big_letter(element) {
    element.value = element.value.toUpperCase();
}

// ����������� ��������� ������ � ����� ������ 
function only_small_letter(element) {
    element.value = element.value.toLowerCase();
}

// �������� ����������� ���������� ���� �����
function btn_register_press() {
    // ������ ���� ����� �� �� id
    let login = document.getElementById("login");
    let pass_a = document.getElementById("password_a");
    let pass_b = document.getElementById("password_b");
    // �������� �������� ���� �����
    let text_log = login.value;
    let text_pas_a = pass_a.value;
    let text_pas_b = pass_b.value;
    // �������� ���������� ���� #login
    if (!text_log) {
        alert("�� �� ����� ����!");
        return;
    }
    // �������� ����������� ���������� ���� #login
    text_log = text_log.trim();
    if (!text_log) {
        alert("�� ����� ����������� ����!");
        return;
    }
    // �������� ���������� ���� #password_a
    if (!text_pas_a) {
        alert("�� �� ����� ������!");
        return;
    }
    // �������� ������� ������
    if (text_pas_a.length < 6) {
        alert("�� ����� ���������� ������!" + "\n" +
            "̳������� ������� ������ - 6 �������");
        return;
    }
    // �������� ���������� ���� #password_b
    if (!text_pas_b) {
        alert("�� �� ��������� ������!");
        return;
    }
    // �������� ����������� ������
    if (text_pas_a !== text_pas_b) {
        alert("����� �� ���������!");
        return;
    }
    // ����������� ��� ������ ���������
    alert("��������� ����������� ������");
}

// .......................................................................

// �������� ����
let added_elements = 1;

// ��������� ������ �������� �� ������
function add_li() {
    // ����� ������ �� id
    let ul = document.getElementById("editable_list");
    // ��������� ������ �������� <li>
    let li = document.createElement("li");
    // ��������� ������ ��� �������� <li>
    let text = document.createTextNode(`����� ������� ������ �${added_elements}`);
    // �������� �������� �� 1
    added_elements++;
    // ������ ����� �� �������� <li>
    li.appendChild(text);
    // ������ ������� <li> �� ������
    ul.appendChild(li);
}

// ��������� ���������� �������� � ������
function remove_li() {
    // ����� ������ �� id
    let ul = document.getElementById("editable_list");
    // ��������� ���������� ���������� ��������
    let li = ul.lastChild;
    // ��������� ���������� ���������� ��������
    ul.removeChild(ul.lastChild);
}

// .......................................................................

// ��������������� ������ ��������� ������ #flex_block
function add_flex_button_listener() {
    // ������ ������ �� �� id
    let direction = document.getElementById("flex_direction");
    let justify = document.getElementById("justify-content");
    let align = document.getElementById("align-items");
    // ������ ��������������� ��䳿 <onclick>
    direction.onclick = change_flex_direction;
    justify.onclick = change_justify_content;
    align.onclick = change_align_items;
}

// .......................................................................

// �������� ����
let flex_direction_id = 0;
let flex_direction = ["row",
    "row-reverse",
    "column",
    "column-reverse"];

// ���� ���������� <flex-direction>
function change_flex_direction(event) {
    // ������ ���� �� id
    let block = document.getElementById("flex_block");
    // �������� ��������
    flex_direction_id += flex_direction_id < 3 ? 1 : -3;
    // �������� ���� �������� ����������
    let value = flex_direction[flex_direction_id];
    // ������� ���������� <flex-direction> 
    block.style.flexDirection = value;
    // ������� ����� ������
    event.target.innerHTML = `flex_direction: ${value}`;
}

// .......................................................................

// �������� ����
let justify_content_id = 3;
let justify_content = ["center",
    "flex-start",
    "flex-end",
    "space-around",
    "space-between"];

// ���� ���������� <justify-content>
function change_justify_content(event) {
    // ������ ���� �� id
    let block = document.getElementById("flex_block");
    // �������� ��������
    justify_content_id += justify_content_id < 4 ? 1 : -4;
    // �������� ���� �������� ����������
    let value = justify_content[justify_content_id];
    // ������� ���������� <justify-content> 
    block.style.justifyContent = value;
    // ������� ����� ������
    event.target.innerHTML = `justify_content: ${value}`;
}

// .......................................................................

// �������� ����
let align_items_id = 0;
let align_items = ["center",
    "baseline",
    "flex-start",
    "flex-end",
    "stretch"];

// ���� ���������� <align_items>
function change_align_items(event) {
    // ������ ���� �� id
    let block = document.getElementById("flex_block");
    // �������� ��������
    align_items_id += align_items_id < 4 ? 1 : -4;
    // �������� ���� �������� ����������
    let value = align_items[align_items_id];
    // ������� ���������� <align_items> 
    block.style.alignItems = value;
    // ������� ����� ������
    event.target.innerHTML = `align_items: ${value}`;
}

// .......................................................................

// �������� ����
let title_color_id = 1;
let title_colors = ["#F00",
    "#0F0",
    "#00F",
    "#FF0",
    "#F0F",
    "#0FF"];

// ���� ������� ���� ���������
function change_title_background() {
    // �������� ���������
    const colors = title_colors.length - 1;
    // ������ ������� �� id
    let title = document.getElementById("title");
    // ������� ���� �����
    title.style.borderColor = title_colors[title_color_id];
    // �������� �����
    let alpha_color = title_colors[title_color_id] + "5";
    // ������� ���� ����
    title.style.backgroundColor = alpha_color;
    // �������� ��������
    title_color_id += (title_color_id < colors) ? 1 : -colors;
}

// .......................................................................

// ��������� ��������, �� ������������ ����� �1
function check_condition_1() {
    select_elements($("input.test_b"));
}

// ��������� ��������, �� ������������ ����� �2
function check_condition_2() {
    select_elements($("#cb3, #cb7"));
}

// ��������� ��������, �� ������������ ����� �3
function check_condition_3() {
    select_elements($("#div_4 input[type='checkbox']")
        .not(".test_z"));
}

// ��������� ��������, �� ������������ ����� �4
function check_condition_4() {
    // ������ �������� � ��� ��������
    unselect_all_elements();
    // ��������� ������
    let result = $("[custom_atr]");
    // ��������� �����
    let array = [];
    // ���������� ������� ��������
    for (let z = 0; z < result.length; z++) {
        // �������� �������
        let element = result.get(z);
        // �������� �������� ��������
        let atr = Number($(element).attr("custom_atr"));
        // �������� �������� �������� ��������
        if (atr >= 25) { $(element).prop('checked', true); }
    }
}

// .......................................................................

// ��������� �������� ��������
function select_elements(elements) {
    // ������ �������� � ��� ��������
    unselect_all_elements();
    // ��������� �������� ��������  
    for (let z = 0; z < elements.length; z++) {
        let element = elements.get(z);
        $(element).prop('checked', true);
    }
}

// ������ �������� � ��� ��������
function unselect_all_elements() {
    // �������� �� �������� ���� <checkbox>
    let result = $("#div_4 input[type='checkbox']");
    // ������ �������� � ��� ��������
    for (let z = 0; z < result.length; z++) {
        let element = result.get(z);
        $(element).prop('checked', false);
    }
}

// .......................................................................

// ������ �������������� ���� �� ������
function add_animation_button_listener() {
    // ������ "��������� ������"
    $("#btn_timer").bind("click", start_timer);
    // ������ "��������� ��������"
    $("#btn_interval").bind("click", start_interval);
}

// .......................................................................

// ��������� ������
function start_timer() {
    // ������� ����� ������
    $("#btn_timer").attr("value", "������� ����������� ����� 3 ���.");
    // ��������� ������
    setTimeout(() => {
        // ������� ����� ������
        $("#btn_timer").attr("value", "��������� ������");
        // ��������� �������
        start_animation();
    }, 3000);
}

// .......................................................................

let intervar_run = false;

// ��������� ��� ��������� ��������
function start_interval() {
    // ��������� ��������
    if (intervar_run) {
        intervar_run = false;
        $("#btn_interval").attr("value", "��������� ��������");
        return;
    }
    // ��������� ��������
    else {
        intervar_run = true;
        $("#btn_interval").attr("value", "�������� ��������");
    }
    // ������ ��������
    let interval = setInterval(() => {
        // ��������� �������
        start_animation();
        // ���� �������� �������� - ������� ����
        if (!intervar_run) { clearInterval(interval); }
    }, 3000);
}

// .......................................................................

// �������� ����
let animation_id = 0;

// ��������� �������
function start_animation() {
    // �������� ������������ �����������
    console.log(`Start animation �${animation_id}`);
    // ������ ��'���
    switch (animation_id) {
        // ������� �1
        case 0: $("#img").animate({
            opacity: 0.0,
            left: '-39%',
            top: '25%'
        }, 500)
            .animate({
                opacity: 1.0,
                top: '-25%'
            }, 500);
            break;
        // ������� �2
        case 1: $("#img").animate({
            opacity: 0.0,
            left: '0%',
            top: '0%',
            width: '40%'
        }, 500);
            break;
        // ������� �3
        case 2: $("#img").animate({
            opacity: 1.0,
            width: '128px'
        }, 500);
            break;
        // ������� �4
        case 3: $("#img").animate({
            opacity: 0.0,
            left: '40%',
            width: '16px'
        }, 500);
            break;
        // ������� �5
        case 4: $("#img").animate({
            opacity: 0.5,
            left: '-35%',
            width: '128px'
        }, 500)
            .animate({
                opacity: 1.0,
                left: '0%',
                width: '128px'
            }, 500);
            break;
    }
    // �������� ������ �������
    animation_id += animation_id < 4 ? 1 : -4;
}

// .......................................................................

// ������ �������������� ���� �� ������
add_flex_button_listener();
add_animation_button_listener();

// ������� ���� ���� ��������� ���� 2 ���.
setInterval(change_title_background, 3000);