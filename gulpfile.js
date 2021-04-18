// ...............................................................................................
// ��������� ���������� ������ ..................................................................

// ³��������� �������� ����������
const log = true;

// ���� ������������ ��� css - sass, less ��� scss
const use_preprocessor = "scss";

// ������� �� ��������� ������������ css ������������� ��������� ������
// gulp-sass - ��� sass �� scss
// gulp-less - ��� less
const css_preprocessor = (use_preprocessor === "less" ? "less" : "sass");

// ...............................................................................................
// ϳ��������� ������ ...........................................................................

// ϳ�������� gulp
const { src, dest, watch, parallel, series } = require("gulp");

// ϳ�������� gulpif - �������� ���� � .pipe()
const gulp_if = require("gulp-if");

// ϳ�������� browser-sync - ��������� ������ ��� ����������
const browser_sync = require("browser-sync").create();

// ϳ�������� gh-pages - ��������� ����� �� github
const gh_pages = require("gh-pages");

// ϳ�������� gulp-htmlmin - ������ �������� html
const html_min = require("gulp-htmlmin");

// ϳ�������� gulp-clean-css - ������ �������� css
const clean_css = require("gulp-clean-css");

// ϳ�������� css ������������
const sass = require("gulp-sass");
const less = require("gulp-less");

// ϳ�������� gulp-terser - ������ �������� js
const terser = require("gulp-terser");

// ϳ�������� gulp-imagemin - ������ ��������� ���������
const image_min = require("gulp-imagemin");

// ϳ�������� gulp-newer - ������ ��� ������������ ������� �����
const newer = require("gulp-newer");

// ϳ�������� gulp-debug - ��������� �������� ����������
const debug = require("gulp-debug");

// ϳ�������� del - ������ ��������� �����
const del = require("del");

// ...............................................................................................
// ������������ ������ ..........................................................................

// ������������ ��� ������ gulp-debug
const opt = { title: "log", showCount: false };

// ������������ ��� ������ gulp-clean-css
const css_opt = { level: { 1: { specialComments: 0 } } };

// ������� ������� ���������� ��������� ����� �� GitHub
const deploy_result = function (err) {
    if (err) { console.log(`Deploy Error: ${err}`); }
};

// ...............................................................................................

// ��������� ��������� ������ 
function browserSync() {
    browser_sync.init({                // ����������� browser_sync
        server: { baseDir: "build/" }, // ������������ ������ ���������
        notify: false,                 // �������� ����������� ���������
        online: true                   /* ���������� ���������� �������� ����� 
                                          �������� ������ (����. ���������, �������� � �.�.) */
    })
}

// ���������� html �����
function html() {
    return src("app/**/*.html")            // ������ ����� � ����������� html �� ����� app/ �� ��� �������
        .pipe(newer("build/"))           // ³������������ ���� ����� �����
        .pipe(html_min                   // �������� ����� html �����
            ({
                collapseWhitespace: true,
                removeComments: true
            }))
        .pipe(gulp_if(log, debug(opt)))  // ³��������� ������ ������������ �����
        .pipe(dest("build/"));           // ��������� � ����� build/ 
}

// ���������� css �����
function css() {
    return src("app/css/*.css",           // ������ ����� � ����������� css �� ����� app/css/
        { base: "app" })           // ������ �������� base, ��� �������� ��������� �����
        .pipe(newer("build/"))          // ³������������ ���� ����� �����
        .pipe(gulp_if(log, debug(opt))) // ³��������� ������ ������������ �����
        .pipe(clean_css(css_opt))       // �������� ����� css �����
        .pipe(dest("build/"))           // ��������� � ����� build/
        .pipe(browser_sync.stream());   // ��������� ���� ��� ���������������� �������
}

// ���������� sass, less ��� scss �����
function preprocessCss() {
    return src(`app/${use_preprocessor}` + // ������ ����� �������� ������������ css �� �������� �����
        `/*.${use_preprocessor}`)
        .pipe(gulp_if(log, debug(opt)))  // ³��������� ������ ������������ �����
        .pipe(eval(css_preprocessor)())  // ��������� ������ ������������ � css
        .pipe(clean_css(css_opt))        // �������� ����� css �����
        .pipe(dest("build/css/"))        // ��������� � ����� build/css/
        .pipe(browser_sync.stream());    // ��������� ���� ��� ���������������� �������
}

// ���������� js �����
function js() {
    return src("app/js/*.js",             // ������ ����� � ����������� js �� ����� app/js/
        { base: "app" })           // ������ �������� base, ��� �������� ��������� �����
        .pipe(newer("build/"))          // ³������������ ���� ����� �����
        .pipe(terser())                 // �������� ����� js �����
        .pipe(gulp_if(log, debug(opt))) // ³��������� ������ ������������ �����
        .pipe(dest("build/"));          // ��������� � ����� build/
}

// ���������� txt �����
function txt() {
    return src("app/data/**/*.txt",       // ������ ����� � ����������� txt �� ����� app/data/
        { base: "app" })           // ������ �������� base, ��� �������� ��������� �����
        .pipe(newer("build/"))          // ³������������ ���� ����� �����
        .pipe(gulp_if(log, debug(opt))) // ³��������� ������ ������������ �����
        .pipe(dest("build/"));          // ��������� � ����� build/
}

// ���������� ����� ���������
function img() {
    return src(["app/img/**/*.{png,jpg,jpeg,gif}",
        "app/data/**/*.{png,jpg,jpeg,gif}"], // ������ ����� � ������������ png, jpg, jpeg, gif
        { base: "app" })                      // ������ �������� base, ��� �������� ��������� �����
        .pipe(newer("build/"))                     // ³������������ ���� ����� �����
        .pipe(image_min({
            verbose: log,
            silent: !log
        }))         // �������� ����������
        .pipe(dest("build/"));                     // ��������� � ����� build/
}

// ������� ����� �������� �������
function cleanBuild() {
    return del("build/**/*", { force: true });    // ������� ����� ����� ��������� �������
}

// ���������� ���� �����
function watchForFiles() {

    // ������� �� ������ html �����
    watch("app/**/*.html")
        .on("all", series(html, browser_sync.reload));

    // ������� �� ������ css �����
    watch("app/css/*.css")
        .on("all", series(css));

    // ������� �� ������ ����� ������������ css - sass, less ��� scss
    watch(`app/${use_preprocessor}/*.${use_preprocessor}`)
        .on("all", series(preprocessCss));

    // ������� �� ������ js �����
    watch("app/js/*.js")
        .on("all", series(js, browser_sync.reload));

    // ������� �� ������ txt �����
    watch("app/data/**/*.txt")
        .on("all", series(txt, browser_sync.reload));

    // ������� �� ������ ����� ���������
    watch("app/img/**/*")
        .on("all", series(img, browser_sync.reload));

}

// �������� ������� ���� �� github
function deployOnGitHub() {
    return gh_pages
        .publish("build",                              // �����, ���� ��� ���������� �� github
            { message: "Auto-generated commit" }, // ����� �����
            deploy_result);                       // ������� �������� �������
}

// ...............................................................................................

// �������� �������
exports.build = series(cleanBuild, html, css, preprocessCss, js, txt, img);

// �������� �� �������������
exports.default = parallel(series(exports.build, browserSync), watchForFiles);

// �������� ������� �� ��������� ���� �� github
exports.deploy = series(exports.build, deployOnGitHub);