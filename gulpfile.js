// ���� ������������ ��� css - sass, less ��� scss
const use_preprocessor = "scss";
// ������� �� ��������� ������������ css ������������� ��������� ������
// gulp-sass - ��� sass �� scss
// gulp-less - ��� less
const css_preprocessor = (use_preprocessor === "less" ? "less" : "sass");

// ϳ�������� gulp
const { src, dest, series } = require("gulp");
// ϳ�������� browser-sync - ��������� ������ ��� ����������
const browser_sync = require("browser-sync").create();
// ϳ�������� gh-pages - ��������� ����� �� github
const gh_pages = require("gh-pages");
// ϳ�������� css ������������
const sass = require("gulp-sass");
const less = require("gulp-less");

// ��������� ��������� ������ 
function browserSync() {
    browser_sync.init({                // ����������� browser_sync
        server: { baseDir: "build/" }, // ������������ ������ ���������
        notify: false,                 // �������� ����������� ���������
        online: true                   // ���������� ���������� �������� ����� 
        // �������� ������ (����. ���������, �������� � �.�.) 
    })
}

// ���������� html �����
function html() {
    return src("app/**/*.html")  // ������ ����� � ����������� html �� ����� app/ �� ��� �������
        .pipe(dest("build/")); // ��������� � ����� build/
}

// ���������� css �����
function css() {
    return src("app/css/*.css",  // ������ ����� � ����������� css �� ����� app/css/
        { base: "app" })  // ������ �������� base, ��� �������� ��������� �����
        .pipe(dest("build/")); // ��������� � ����� build/
}

// ���������� sass, less ��� scss �����
function preprocessCss() {
    return src(`app/${use_preprocessor}/*.${use_preprocessor}`) // ������ ����� �������� ������������ css
        // �� �������� �����
        .pipe(eval(css_preprocessor)())                       // ��������� ������ ������������ � css
        .pipe(dest("build/css/"));                            // ��������� � ����� build/css/
}

// ���������� ����� ���������
function img() {
    return src("app/img/*.{png,jpg,jpeg,gif}", // ������ ����� � ������������ png, jpg, jpeg, gif
        { base: "app" })                // ������ �������� base, ��� �������� ��������� �����
        .pipe(dest("build/"));               // ��������� � ����� build/
}

// �������� ������� ���� �� github
function deployOnGitHub() {
    return gh_pages.publish("build",                                  // �����, ���� ��� ���������� �� github
        { message: "Auto-generated commit" },      // ����� �����
        (err) => {                                 // ��������� � ������� �������� �������
            if (err) { console.log(`Error: ${err}`); }
        });
}

// �������� �� �������������
exports.default = series(html, css, preprocessCss, img, browserSync);

// �������� �������
exports.build = series(html, css, preprocessCss, img);

// �������� ������� �� ��������� ���� �� github
exports.deploy = series(html, css, preprocessCss, img, deployOnGitHub);