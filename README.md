Учебный проект - messenger

Прототип: https://www.figma.com/file/nVtwoB3MtIj3BIqv822xtd/Prototypes?node-id=0%3A1

Netlify https://adoring-morse-4ee1ae.netlify.app/

Запуск: npm run start

Разработка: npm run dev

Билд: npm run build

По неизвестной пока причине билд не работает с ошибкой "require is not defined"

Создано временное навигационное меню.

Попапы готовы частично.

Сделано много заглушек для последующего подключения к API, встречаются много спорных моментов и моков связанных с этим (
страница chat).

Слабо типизированы функции, которые принимают и возвращают любые параметры (Вроде get).

Не решены проблемы типизации в местах использования детьми родительских методов, например, использование
Form.checkFormValid из дочернего класса DefaultInput.

Ссылка на Pr: https://github.com/dmitryVargin/middle.messenger.praktikum.yandex/pull/2
