// Вибір препроцесора для css - sass, less або scss
const use_preprocessor = "scss";
// Залежно від вибраного препроцесора css використовуємо відповідний модуль
// gulp-sass - для sass та scss
// gulp-less - для less
const css_preprocessor = (use_preprocessor === "less" ? "less" : "sass");

// Підключаємо gulp
const { src, dest, series } = require("gulp");
// Підключаємо browser-sync - локальний сервер для тестування
const browser_sync = require("browser-sync").create();
// Підключаємо gh-pages - публікація сайту на github
const gh_pages = require("gh-pages");
// Підключаємо css препроцесори
const sass = require("gulp-sass");
const less = require("gulp-less");

// Запускаємо локальний сервер 
function browserSync() {
    browser_sync.init({                // Ініціалізація browser_sync
        server: { baseDir: "build/" }, // Встановлюємо базову директорію
        notify: false,                 // Вимикаємо інформаційні сповіщення
        online: true                   // Дозволяємо підключення пристроїв через 
        // локальну мережу (напр. смартфонів, планшетів і т.д.) 
    })
}

// Обробляємо html файли
function html() {
    return src("app/**/*.html")  // Беремо файли з розширенням html із папки app/ та усіх підпапок
        .pipe(dest("build/")); // Переміщуємо у папку build/
}

// Обробляємо css файли
function css() {
    return src("app/css/*.css",  // Беремо файли з розширенням css із папки app/css/
        { base: "app" })  // Задаємо параметр base, щоб зберегти вложеність файлів
        .pipe(dest("build/")); // Переміщуємо у папку build/
}

// Обробляємо sass, less або scss файли
function preprocessCss() {
    return src(`app/${use_preprocessor}/*.${use_preprocessor}`) // Беремо файли заданого препроцесора css
        // із відповідної папки
        .pipe(eval(css_preprocessor)())                       // Компілюємо формат препросесора у css
        .pipe(dest("build/css/"));                            // Переміщуємо у папку build/css/
}

// Обробляємо файли зображень
function img() {
    return src("app/img/*.{png,jpg,jpeg,gif}", // Беремо файли з розширеннями png, jpg, jpeg, gif
        { base: "app" })                // Задаємо параметр base, щоб зберегти вложеність файлів
        .pipe(dest("build/"));               // Переміщуємо у папку build/
}

// Публікуємо зібраний сайт на github
function deployOnGitHub() {
    return gh_pages.publish("build",                                  // Папка, вміст якої заливається на github
        { message: "Auto-generated commit" },      // Текст коміту
        (err) => {                                 // Виведення в консоль можливих помилок
            if (err) { console.log(`Error: ${err}`); }
        });
}

// Завдання за замовчуванням
exports.default = series(html, css, preprocessCss, img, browserSync);

// Збирання проекту
exports.build = series(html, css, preprocessCss, img);

// Збирання проекту та публікація його на github
exports.deploy = series(html, css, preprocessCss, img, deployOnGitHub);