# Trial ключ для Qlik Sense desktop

Где взять ключ для разблокировки Qlik Sense Desktop?

Существует несколько способов - выбирайте для себя более удобный
### Простой вариант в telegram-каналах

Подписываемся на каналы https://t.me/chernovdev и https://t.me/qliknews, и не выключаем оповещения

На канале https://t.me/chernovdev - каждые 15 минут проверяется github - и в случае выхода новых релизов - будет отправно автоматическое сообщение

https://t.me/qliknews - работет по другому алгоритму, и там информация проверяется каждый час

### Официально предлаемый QlikTech вариант

Переходим в раздел скачивания продуктов QlikTech на странице - https://community.qlik.com/t5/Downloads/tkb-p/Downloads

Авторизуемся (под VPN), и скачиваем

### Официальный репозиторий с установочными файлами Qlik Sense Desktop

https://github.com/qlik-download/qlik-sense-desktop/releases

Нам нужно пройти в раздел релизов, и проверить каждый вышедший релиз, в одном из них будет заветный файл - `Qlik_Sense_Desktop.unlock`

![изображение релизов](/img/arch/p8xWeGDD9u.png)


### Куда размещать файл `Qlik_Sense_Desktop.unlock`

По официальной документации:

```Folder
Мои документы\Qlik\Sense\Trial\
```

По-умолчанию, при установке Qlik Sense Desktop - папка Trial не создаётся, её нужно создать вручную
