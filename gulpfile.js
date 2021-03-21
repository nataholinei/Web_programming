const { src, dest, series } = require("gulp");

// ���������� html �����
function html() {
    return src("app/**/*.html") // ������ ����� � ����������� html �� ����� app/ �� ��� �������
        .pipe(dest("build/")); // ��������� � ����� build/
}

// ���������� ����� ���������
function img() {
    return src("app/img/*.{png,jpg,jpeg,gif}", // ������ ����� � ������������ png, jpg, jpeg, gif
        { base: "app" }) // ������ �������� base, ��� �������� ��������� �����
        .pipe(dest("build/")); // ��������� � ����� build/
}

// �������� �������
exports.build = series(html, img);