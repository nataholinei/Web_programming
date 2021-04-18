// ������ �������
let snow_letter = "*";
// ���������� ����� �������
let snow_min_size = 8;
// ������������ ����� �������
let snow_max_size = 50;
// ����������� ������� �������
let snow_max_count = 35;
// �������� ������ �������
let snow_speed = 0.5;
// ������� �������
let snow_color = ["#33F", "#55F", "#77F", "#99F", "#BBF", "#DDF"];
// ������ �������
let snow_font = ["Dela Gothic One", "Playfair Display", "Train One"];

// ������ �������
let dH;
// ������ �������
let dW;
// ʳ������ ����� �� �������
let FPS = 60;
// ����� �������
let snow = [];

// ������� �������
let wiggle_speed = [];
let wiggle_value = [];
let wiggle = [];

// .......................................................................

// �������� ��������� �����
function random_value(range) {

    return Math.floor(range * Math.random());

}

// .......................................................................

// ���������� �������
function init_snow() {

    dW = document.body.clientWidth;
    dH = document.body.clientHeight;

    let snow_size_range = snow_max_size - snow_min_size;

    for (i = 0; i < snow_max_count; i++) {

        // ������ "��������" �������
        wiggle[i] = 15 + Math.random() * 15;
        // ������ �������� "��������" �������
        wiggle_speed[i] = 0.03 + Math.random() / 10;
        // �������� ������ ���������� "��������" �������
        wiggle_value[i] = 0;

        // �������� �������
        snow[i] = document.getElementById("snowflake_" + i);
        // ������ �����
        snow[i].style.fontFamily = snow_font[random_value(snow_font.length)];
        // ������ �����
        snow[i].size = random_value(snow_size_range) + snow_min_size;
        // ������ ����� � �������
        snow[i].style.fontSize = snow[i].size + "px";
        // ������ ����
        snow[i].style.color = snow_color[random_value(snow_color.length)];
        // ������ ��������
        snow[i].speed = snow_speed * snow[i].size / 5;
        // ������ ������� �� ����������
        snow[i].pos_x = random_value(dW - snow[i].size)
        // ������ ������� �� ��������
        snow[i].pos_y = random_value(2 * dH - dH - 2 * snow[i].size);
        // ������ ������� �� ���������� � �������
        snow[i].style.left = snow[i].pos_x + "px";
        // ������ ������� �� �������� � �������
        snow[i].style.top = snow[i].pos_y + "px";

    }

    move_snow();

}

// .......................................................................

// ������ �������
function move_snow() {

    dW = document.body.clientWidth;
    dH = document.body.clientHeight;

    for (i = 0; i < snow_max_count; i++) {

        snow[i].pos_y += snow[i].speed;
        wiggle_value[i] += wiggle_speed[i];

        snow[i].style.top = snow[i].pos_y + "px";
        snow[i].style.left = snow[i].pos_x + wiggle[i] * Math.sin(wiggle_value[i]) + "px";

        if (snow[i].pos_y >= dH - 1.3 * snow[i].size ||
            parseInt(snow[i].style.left) > (dW - 3 * wiggle[i])) {

            snow[i].pos_x = random_value(dW - snow[i].size)
            snow[i].pos_y = 0;
            snow[i].hidden = !snow_is_running;
        }
    }

    setTimeout(move_snow, 1000 / FPS);

}

// .......................................................................

// ������ ������� �� �������
for (z = 0; z < snow_max_count; z++) {

    document.write(`<span id="snowflake_${z}"
                      style="position:absolute;
                             top:-${snow_max_size}px;">${snow_letter}</span>`);
}

// ������� ��������
let snow_is_started = false;
let snow_is_running = false;

// �������� ����������� �������, ���� ������� ���� ������� �����������
$("#title").bind("click", () => {

    if (!snow_is_started) {
        init_snow();
        snow_is_started = true;
    }

    snow_is_running = !snow_is_running;

});