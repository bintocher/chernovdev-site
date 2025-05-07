---
title: Loop&Reduce Qlik Sense
description: "Как включить Loop&Reduce и App Management Console в Qlik Sense. Пошаговая инструкция по настройке нарезки приложений (аналог QlikView)."
authors: chernov
tags: [qlik sense, loop and reduce]
hide_table_of_contents: false
date: 2024-05-31
---

В этой статье я опишу процесс включения двух, не совсем документированных опций, но тем не менее разработанных в QlikTech специально для Qlik Sense:

- App Management Console
- Loop&Reduce

![внешний вид app management console](/img/blog/2024/05-31/1.png)
<!-- truncate -->

## Официальная документация и необходимые файлы

На сервере, с установленным Qlik Sense Enterprise (On premise) нужно заглянуть в папку `C:\Program Files\Qlik\Sense\Tools` там вы увидите доступные утилиты, нам, для текущей статьи нужно две папки: `AppManagementConsole` и `ExternalProgramTasks`.

![папки с утилитами qlik sense](/img/blog/2024/05-31/2.png)

Настройка `loop&reduce` связана с `App Management Console`, и без неё - просто не получится пользоваться этой особенностью

## Включаем `App Management Console`

Внутри папки нас ждёт самый важный файл `README.md`, в котором подробно написано что нужно сделать
![описание установки app management console](/img/blog/2024/05-31/3.png)

Но я повторюсь:

- нужно открыть QMC -> Content library
- создать новый объект, назвать его `AMC`
- внутри объекта перейти в раздел `Contents` и загрузить все файлы из папки `AppManagementConsole`
- я в том числе загружал файл `data-connections.js` для коннекторов, который находится в папке `C:\Program Files\Qlik\Sense\Tools\AppManagementConsole\amc\extras`

Итоговый вид содержимого AMC:
![описание установки app management console](/img/blog/2024/05-31/4.png)

После описанных действий переходим по ссылке, и пользуемся `App Management Console`

```text
http[s]://<servername>/content/AMC/home.html
```

## Включаем `loop&reduce`

Переходим в папку `C:\Program Files\Qlik\Sense\Tools\ExternalProgramTasks\LoopAndReduce`, в котором нам нужно 2 файла:

- документация `Loop and Reduce Document.docx` - читаем и добавляем `security rules` согласно описания
- js-файл `loop-and-reduce.js` - импортируем в AMC (так же как и разделом выше)

## Пользуемся loop&reduce

Открываем `App Management Console` и создаем новый task, у нас на выбор доступно 2 режима: `reload` и `loop&reduce`

![выбор типа задачи](/img/blog/2024/05-31/5.png)

Настройки, надеюсь интуитивно понятные

![выбор типа задачи](/img/blog/2024/05-31/6.png)

:::warning[Примечание]
Работать с `loop&reduce` можно только через `app management console`!
:::
