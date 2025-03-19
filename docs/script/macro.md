---
sidebar_position: 200
tags: ['macro','function','функция']
---

# Макро подстановка

<!-- ## Использование -->

Обычно используется для того, чтобы выполнить 1 операцию внути опреатора `SET` или вызвать функции с определенными параметрами.

Иногда полезно комбинировать макроподстановки

# Примеры вызова

```qvs
$(eRows('mytable'));
```
```qvs
IF $(eTableExists('mytablename')) THEN
    ...
ELSE
    ...
END IF
```
```qvs
LET preciding_load = IF ($(eTableExists('myTable')), 'OUTER JOIN ([$('myTable')])', 'NOCONCATENATE [$('myTable')]:');

$(preciding_load)
LOAD
    ...
RESIDENT ...;
```

# Полезные функции с макроподстановкой

## `eRows` - вывести в лог скрипта количество строк в таблице

Код для вставки в скрипт:
```qvs
SET eRows = CALL ls_t_rowcount($1);
SUB ls_t_rowcount(ls_tname)
    LET ls_r_qty = NOOFROWS('$(ls_tname)');
    TRACE '$(ls_tname): rows count = $(ls_r_qty)';
    SET ls_r_qty;
    SET ls_tname;
END SUB;
```
Пример использования:
```qvs
$(eRows('mytable'));
```
:::info[Результат выполнения]
в логе выполнения скрипта будет написано количество строк в таблице `mytable`:

mytable: rows count = 555
:::

## `eFileExists` - проверка существования файла

Код для вставки в скрипт:
```qvs
SET eFileExists = 'LEN(FILESIZE($1))>0';
```
Пример использования:
```qvs
IF $(eFileExists('lib://qvd/layer/mydata.qvd')) THEN
    ...
END IF
```
:::info[Результат выполнения]
В случае, если файл существует, то начнётся выполнение скрипта внутри условия IF
:::

## `eDefaultIfEmpty` - поставить значение по умолчанию, если поле пустое

Код для вставки в скрипт:
```qvs
SET eDefaultIfEmpty = 'IF (LEN($1), $1, $2)';
```
Пример использования:
```qvs
LOAD
    ID
    , $(eDefaultIfEmpty([MyValue],'0')) as MyValue
FROM ....
```
:::info[Результат выполнения]
При чтении значений из источника, значение в поле MyValue будет проверятся на заполненность, и если длина строки будет равна нулю, то будет поставлено значение 0.

В принципе, макроподстановка работает аналогично функции `COALESCE`
:::

## `eDropTableIfExists` - удалить таблицу, если она существует


Код для вставки в скрипт:
```qvs
SET eDropTableIfExists =  WHEN LEN(TABLENUMBER('$1')) DROP TABLE [$1];
```
Пример использования:
```qvs
$(eDropTableIfExists('mytable'));
```
:::info[Результат выполнения]
Если таблица с указанным именем существует, то она будет удалена из модели
:::



## `eTableHeader` - подстановка `CONCATENATE` или `NOCONCATENATE`

Код для вставки в скрипт:
```qvs
SET eTableHeader = IF(TABLENUMBER('$1')>=0, 'CONCATENATE([$1])', 'NOCONCATENATE [$1]:');
```
Пример использования:
```qvs
LET vTableName = $(eTableHeader(myTable));
$(vTableName)
LOAD
    ...
FROM/RESIDENT ...
```
:::info[Результат выполнения]
в переменную `vTableName` будет записано значение:
- `CONCATENATE([myTable])` если таблица с таким имененм уже существует
- или `NOCONCATENATE [myTable]` если таблица с таким именем не существует
:::



## `eTableExists` - проверка на существование таблицы

Код для вставки в скрипт:
```qvs
SET eTableExists = 'Len(TableNumber($1))>0';
```
Пример использования:
```qvs
IF $(eTableExists('mytable')) THEN
    ...
END IF;
```
:::info[Результат выполнения]
В случае, если таблица существует, то начнётся выполнение скрипта внутри условия IF
:::


## Генерация GUID

### `eGUID` - генерация GUID, просто ,"почти уникально"

При вызове макроподстановки `$(eGUID)` в переменную `vGUID` будет записано значение


Код для вставки в скрипт:
```qvs
SET eGUID = CALL GetGUID;

SUB GetGUID
    LET vGUID = KEEPCHAR(NOW(1),'0123456789');
END SUB;

```
Пример использования:
```qvs
$(eGUID)
[mytable_$(vGUID)]:
LOAD
    ...
FROM ...
```
:::info[Результат выполнения]
Создается таблица с примерным именем: `mytable_13052024162243`
:::

### GUID посложнее

В переменную `vGUID` записывается хэш

Код для вставки в скрипт:
```qvs
SET eGUID = CALL GetGUID;

SUB GetGUID
    NOCONCATENATE
    __temp_table_guid:
    LOAD KEEPCHAR(LOWER(Hash128(NOW(1))),'0123456789qwertyuiopasdfghjklzxcvbnm') as __guid_field AUTOGENERATE 1;
    LET vGUID = PEEK('__guid_field');
    DROP TABLE __temp_table_guid;
END SUB;
```
Пример использования:
```qvs
$(eGUID)
[mytable_$(vGUID)]:
LOAD
    ...
FROM ...
```
:::info[Результат выполнения]
Создается таблица с примерным именем: `mytable_h9htuk5ib52yie`
:::


<!--
#### бланк для заполнения

Код для вставки в скрипт:
```qvs

```
Пример использования:
```qvs

```
:::info[Результат выполнения]
:::
-->
