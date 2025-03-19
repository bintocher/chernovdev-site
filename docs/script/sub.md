---
sidebar_position: 100
tags: ['function','функция','sub','процедура']
description: Список изменений
---

# Процедуры, sub, подпрограммы

Функции упрощают работу в скриптах Qlik Sense, но в то же время и усложняют чтение кода

## `LinkTable` Таблица связей (link table)

Известно, что для правильной работы модели данных, таблицы должны быть соединены между собой только 1 полем, а что делать если у нас в 2 или более таблицах от 2 одинаковых полей? Мы же не хотим держать SSyn-таблицы внутри модели? Иначе у нас будут не верные расчёты.

Бывают случаи, когда синтетику делают специально, но это совсем другая история

![image](/img/script/189489304-47246296-1770-4478-ae8d-c67344823c6f.png)

Тут нам на помощь приходит функция создания промежуточной таблицы связей между таблицами.
Помните, что функции должны быть написаны в скрипте ранее, чем они будут вызваны.
Синтаксис:
```
CALL LinkTable ('имя новой или существующей таблицы связей', 'имя таблицы из которой нужно забрать поля', 'поля перечисленные через запятую' );
```
Например, написав 2 строчки в коде, мы сделаем связи между 2 таблицами по 3 полям:
```
CALL LinkTable ('plan-fact_link', 'table_sales', 'period, id_goods, id_shop');
CALL LinkTable ('plan-fact_link', 'table_plan', 'period, id_goods, id_shop');
```
![image](/img/script/189489443-57ebaaad-177d-42f8-8f57-5dc24f10ea3a.png)


Результатом выполнения функций - будет новая таблица, в которой будет ключевое поле и 3 поля из 2 таблиц, в основных таблицах останется только ключевое поле

:::warning[Внимание]
На ключевое поле - используется функция AUTONUMBER() для оптимизации работы Qlik Engine, и уменьшения объемов данных
:::

Результат выполнения функции в модели данных:
![image](/img/script/189489593-383f5b8b-8b30-41a1-b86c-6117adb193c7.png)


### скрипт функции

```qvs
SUB LinkTable (ls_linkTableName, ls_table, ls_fields)

// Генерируем произвольное наименование временной таблицы
LET ls_LinkTableTemp = '$(ls_linkTableName)' & '_temp_' & KEEPCHAR(NOW(),'0123456789');

[$(ls_LinkTableTemp)]:
NOCONCATENATE LOAD DISTINCT
	$(ls_fields),
	AutoNumberHash128('$(ls_fields)',$(ls_fields)) as [%$(ls_linkTableName)_Key]
RESIDENT $(ls_table);

LEFT JOIN ($(ls_table))	// Join key from link table to source table
LOAD [%$(ls_linkTableName)_Key], $(ls_fields) RESIDENT [$(ls_LinkTableTemp)];

DROP FIELDS $(ls_fields) FROM $(ls_table);

IF NOT ISNULL(TableNumber('$(ls_linkTableName)')) THEN
	OUTER JOIN ([$(ls_linkTableName)])
	LOAD * RESIDENT [$(ls_LinkTableTemp)];
	DROP TABLE [$(ls_LinkTableTemp)];
ELSE
	RENAME TABLE [$(ls_LinkTableTemp)] TO [$(ls_linkTableName)];
ENDIF

SET ls_LinkTableTemp=;

// Применяем AUTONUMBER для сокращения объема данных по нашему ключевому полю
AUTONUMBER [%$(ls_linkTableName)_Key] USING '$(ls_linkTableName)';

END SUB;
```

### скрипт генерации тестовых данных

Код должен быть расположен после написания кода функции
```
LET varPeriodStart = NUM(Today() - 60);

table_sales:
LOAD
    DATE(FLOOR($(varPeriodStart) + (rand() * 60))) AS period
    , floor(rand()*150)+1 AS id_goods
    , floor(rand()*10)+1 AS id_shop
    , floor(rand() * 1000) + 10 AS fact_sales
    , floor(rand() * 20) + 1 AS fact_quant
AUTOGENERATE 10000
;

table_plan:
LOAD
    DATE(FLOOR($(varPeriodStart) + (rand() * 60))) AS period
    , floor(rand()*150)+1 AS id_goods
    , floor(rand()*10)+1 AS id_shop
    , floor(rand() * 1000) + 10 AS plan_sales
    , floor(rand() * 20) + 1 AS plan_quant
AUTOGENERATE 10000
;

table_goods:
LOAD
    FIELDVALUE ('id_goods', RowNo()) as id_goods
    , 'good_' & FIELDVALUE ('id_goods', RowNo()) as goods_name
AUTOGENERATE FIELDVALUECOUNT ('id_goods');

table_shops:
LOAD
    FIELDVALUE ('id_shop', RowNo()) as id_shop
    , 'shop_' & FIELDVALUE ('id_shop', RowNo()) as shop_name
AUTOGENERATE FIELDVALUECOUNT ('id_shop');

CALL LinkTable ('plan-fact_link', 'table_sales', 'period, id_goods, id_shop');
CALL LinkTable ('plan-fact_link', 'table_plan', 'period, id_goods, id_shop');

```
## Создание календаря

## `GetUniqueValues` - Получить таблицу с уникальными значениями по одному полю

Создает таблицу с набором уникальных значений поля (допускается преобразование поля и агрегация)

Параметры:
- _fieldName - поле в модели (не в конкретной таблице)
- _tableName - имя таблицы-приемника уникальных значений поля _fieldName
- _destinationFieldName - имя поля-приемника уникальных значений поля _fieldName
- _transformOperator - содержит выражение для преобразования значения поля _fieldName.

### примеры использования

Создай таблицу `Factor` из поля `_factorName`, уникальные значения запиши в поле `ExpressFactor_`, примени функцию `NUM()` к этому полю
```
Call GetUniqueValues('_factorName', 'Factor', 'ExpressFactor_', 'Num');

```

### скрипт функции
```
SUB GetUniqueValues(_fieldName, _tableName, _destinationFieldName, _transformOperator)
    LET lib_vTransformOperator = $(eDefaultIfEmpty(_transformOperator, ''));
    LET lib_vExpression = If(Index(lib_vTransformOperator, '{expression}')
   ,Replace(lib_vTransformOperator, '{expression}', 'FieldValue('&chr(39)&'$(_fieldName)'&chr(39)&', RecNo())')
   ,lib_vTransformOperator & '(FieldValue('&chr(39)&'$(_fieldName)'&chr(39)&', RecNo()))');
    LET lib_vDistinctValuesQty = FieldValueCount(_fieldName);
    NoConcatenate [$(_tableName)]:
    LOAD Distinct
        $(lib_vExpression) AS [$(_destinationFieldName)]
    AutoGenerate $(lib_vDistinctValuesQty);
    SET lib_vDistinctValuesQty;
    SET lib_vTransformOperator;
    SET lib_vExpression;
END SUB
```

## `eNumberMinMaxToVariable`, `eNumberMinToVariable`, `eNumberMaxToVariable` - получить min/max из 1 поля в модели в переменную

Процедура для расчета минимального и максимального значений поля

Удобно использовать через макроподстановку: `eNumberMinMaxToVariable`, `eNumberMinToVariable`, `eNumberMaxToVariable`
Параметры:
- _field_name поле со значениями
- _variable_name_[min, max] -переменная - приемник результата

:::tip[Замечание]
Для работы требует наличие подпрограммы(sub,процедуры) GetUniqueValues
:::

### примеры использования

Возьми все уникальные значения в поле `FileDate` и запиши результаты в переменные `vMinValue` и `vMaxValue`
```
$(eNumberMinMaxToVariable('FileDate', 'vMinValue', 'vMaxValue'));
```
Возьми все уникальные значения в поле `FileDate` и запиши результат минимального значения в переменную `vMinValue`
```
$(eNumberMinToVariable('FileDate', 'vMinValue'));
```
Возьми все уникальные значения в поле `FileDate` и запиши результат максимального значения в переменную `vMaxValue`
```
$(eNumberMaxToVariable('FileDate', 'vMaxValue'));
```

### скрипт функции

```
// Макроподстановка
SET eNumberMinMaxToVariable = 'Call GetMinMaxValue($1, $2, $3)';
SET eNumberMinToVariable = 'Call GetMinValue($1, $2)';
SET eNumberMaxToVariable = 'Call GetMaxValue($1, $2)';

// Процедура
SUB GetMinMaxValue(_field_name, _variable_name_min, _variable_name_max)
    Call GetUniqueValues(_field_name, 'local_space_table_tmp_min_max_value', 'local_space_MaxValue', 'Min({expression}) + 0 AS local_space_MinValue, Max({expression}) + 0');
    LET $(_variable_name_min) = Peek('local_space_MinValue');
    LET $(_variable_name_max) = Peek('local_space_MaxValue');
    DROP TABLE [local_space_table_tmp_min_max_value];
END SUB

SUB GetMinValue(_field_name, _variable_name_min)
    Call GetUniqueValues(_field_name, 'local_space_table_tmp_min_value', 'local_space_MinValue', 'Min({expression}) + 0');
    LET $(_variable_name_min) = Peek('local_space_MinValue');
    DROP TABLE [local_space_table_tmp_min_value];
END SUB

SUB GetMaxValue(_field_name, _variable_name_max)
    Call GetUniqueValues(_field_name, 'local_space_table_tmp_max_value', 'local_space_MaxValue', 'Max({expression}) + 0');
    LET $(_variable_name_max) = Peek('local_space_MaxValue');
    DROP TABLE [local_space_table_tmp_max_value];
END SUB

```
