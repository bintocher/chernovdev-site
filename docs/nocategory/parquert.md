# Parquet-файлы

Начиная с версии QS August 2023, Qlik доработал поддержку .parquet-файлов ([подробнее](https://parquet.apache.org/))

## Где применять

Меньший размер - очевидно,  ибо в нём только сжатые данные, и в отличие от QVD - нет индексов. Поэтому нет и не может быть Optimized load. Ибо оптимизированное чтение - это чтение с готовыми индексами, без необходимости их перестроения.
Поэтому по скорости чтения QVD всегда будет быстрее, т.к. чтение из любых других источников обязательно требует доп. расходы на построение индексов.

Максимальную скорость чтения из parquet можно получить не просто грузя из этого формата в обычной файловой системе последовательного чтения, а при наличии соответствующей инфраструктуры, за счет использования специализированных файловых систем, работающих в режиме распределенного партиционированного чтения (hadoop).

С точки зрения сценариев:
1. Потенциальная экономия ресурсов на преобразованиях из источников parquet в формат QVD там, где это нецелесообразно

2. Возможность работы с действительно безразмерными источниками, не зависящими от ресурсов серверов Qlik, т.к. файл parquet может создаваться и дополняться в любых объемах не только Qlik-ом, но и любыми сторонними системами, понимающими этот открытый формат. Польза от таких данные может быть получена в сценариях ODAG/Dynamic Views

3. Сценарии ML, в которых данные предподготовленные Qlik-ом могут быть "съедены" сторонними системами, например, тот же Python

## Как включить поддержку Parquet-файлов

To enable parquet files, they will need to be allowed as sources. We will use QlikSenseCLI in our example.  QlikSenseCLI is shipped with Qlik Sense Enterprise on Windows since May 2023.

- Open Powershell ISE as administrator
- Import the QlikSenseCLI module in the current Powershell session:
    - Open the script C:\Program Files\Qlik\Sense\Tools\qlik-installation-tools
    - Run ImportQlikSenseCLIModule.ps1
    - This will print an about API output on successful run:

```
SchemaPath : About
BuildVersion : 31.34.0.0
BuildDate : 6/13/2023 10:08:17 AM
DatabaseProvider : Devart.Data.PostgreSql
NodeType : Central
SharedPersistence : True
RequiresBootstrap : False
SingleNodeOnly : False
ExtensionData :
```

- Run the Parquet Whitelist Script:
AddParquetExtentionWhitelistTable.ps1

You can now use parquet files in existing apps.

## Тесты размера файлов

![размеры parquet файлов](/img/nocategory/WdtYb97P3h.png)

Как минимум, играя с разными вариантами компрессии (на фото слева, после даты - названия алгоритмов сжатия parquet), можно получить на примере моего файла сжатие данных в ~28%, т.е. размер parquet файла на 28% меньше, чем QVD.

## Справка из документации

### Storing in Parquet files

Parquet is a strongly typed file format, where each field contains a single specific type of data (such as in32, double, timestamp, or text). Qlik Sense stores internal data as a loosely typed dual, where data from difference sources can be mixed into the same fields. As only one part of the dual can be stored in each field in Parquet, it is important to know what each field contains. By default, Qlik Sense uses the field type to determine how the field should be stored. When storing data in Parquet files in a specific format, you must specify what type of data your fields are when loading them. If you try to store data into incompatible fields in a Parquet file, such as numbers in a text field or text in a timestamp field, you will end up with null values.

When loading data you intend to store in Parquet, it is possible to change the default behavior. You can either format it to change your data type or tag it to force specific column types in Parquet.

### Formatting data for storage in Parquet

You can use Qlik Sense formatting functions to classify your data. For example, **Text()**, **Num()**, **Interval()**, or **Timestamp()** can enforce data formats when storing data in Parquet. Qlik Sense can store data into almost 20 data types depending on field attributes and automatic field tags. For more information, see [_Interpretation functions_](https://help.qlik.com/en-US/sense/February2024/Subsystems/Hub/Content/Sense_Hub/Scripting/InterpretationFunctions/interpretation-functions.htm)

**Example: Formatting data with Num() and Text()**

The following example demonstrates preparing data for storage in Parquet. **Num()** is applied to the num field. **Text()** is applied to both text and mixed. In the case of mixed, **Text()** prevents it from being treated like a number field in Parquet and having the text values changed to null values.

```
Data:
LOAD * INLINE [
num, text, mixed
123.321, abc, 123
456.654, def, xyz
789.987, ghi, 321
];

Format:
NoConcatenate
LOAD num, text, Text(mixed) as mixed RESIDENT Data;
STORE Format INTO [lib://DataFiles/Tmp.parquet] (parquet);
```

### Tagging data for storage in Parquet

You tag your data with $parquet tags to force specific column types when storing data in Parquet. Each data type can be enforced by adding the corresponding control tag. For example, to store a field as INT32 in Parquet, tag it with *$parquet-int32* in the load script. Depending on the data type, either the string or the numerical representation of the dual data will be stored.

The following Parqeut control tags can be used to tag fields for storing in Parquet files.

Parquet control tags
|Control tag |Dual| Physical type| Logical type| Converted type|
|---|---|---|---|---|
|$parquet-boolean |Number |BOOLEAN |NONE |NONE|
|$parquet-int32 |Number |INT32 |NONE |NONE|
|$parquet-int64 |Number |INT64 |NONE |NONE|
|$parquet-float |Number |FLOAT |NONE |NONE|
|$parquet-double |Number |DOUBLE |NONE |NONE|
|$parquet-bytearray |String |BYTE_ARRAY |NONE |UTF8|
|$parquet-bytearrayfix |Number |FIXED_LEN_BYTE_ARRAY |NONE |DECIMAL|
|$parquet-decimal |Number |INT64 |DECIMAL |DECIMAL|
|$parquet-date |Number |INT32 |DATE |DATE|
|$parquet-time |Number |INT64 |TIME |TIME_MICROS|
|$parquet-timestamp |Number |INT64 |TIMESTAMP |TIMESTAMP_MICROS|
|$parquet-string |String |BYTE_ARRAY |STRING |UTF8|
|$parquet-enum |String |BYTE_ARRAY |ENUM |ENUM|
|$parquet-interval |Number |FIXED_LEN_BYTE_ARRAY |INTERVAL |INTERVAL|
|$parquet-json |String |BYTE_ARRAY |JSON |JSON|
|$parquet-bson |String |BYTE_ARRAY |BSON |BSON|
|$parquet-uuid |String |FIXED_LEN_BYTE_ARRAY |UUID |NONE|

**Example: Tagging data for storage in Parquet**

In this example, two tags are used to define the data for Parquet. The field num is tagged with *$parquet-int32* to define it as a number field that will be set as INT32 in Parquet.

Data:

```
Data:
LOAD * INLINE [
num, text,
123.321, abc
456.654, def
789.987, ghi
];
TAG num WITH '$parquet-int32';
STORE Data INTO [lib://DataFiles/Tmp.parquet] (parquet);
```

## Источники

- https://community.qlik.com/t5/Official-Support-Articles/Enable-parquet-file-support-for-existing-Apps-in-Qlik-Sense/ta-p/2085211
- https://help.qlik.com/en-US/sense/Subsystems/Hub/Content/Sense_Hub/Scripting/ScriptRegularStatements/Store.htm
- https://t.me/qlikbi_chat/104362
- https://t.me/qlikbi_chat/104420?thread=104362
