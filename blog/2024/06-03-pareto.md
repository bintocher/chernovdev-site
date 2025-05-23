---
title: Принцип Парето в Qlik Sense
description: "Применение принципа Парето (80/20) в Qlik Sense для анализа продаж. Узнайте, как рассчитать меры и построить график Парето для выявления ключевых продуктов."
authors: molokov
tags: [qlik sense, Парето]
hide_table_of_contents: false
date: 2024-06-03
---

Принцип Парето, или правило 80/20, является инструментом анализа, позволяющим выделить ключевые факторы, оказывающие наибольшее влияние на результаты. В статье рассмотрим:
- как применить принцип Парето в Qlik Sense для анализа продаж
- как с помощью визуализации данных можно легко определить, какие продукты вносят наибольший вклад в общие продажи и как это знание помогает оптимизировать бизнес-процессы.
- как построить графики и таблицы в Qlik Sense, чтобы наглядно увидеть эффект принципа Парето на вашем бизнесе.

![График Парето](/img/blog/2024/06-03/1.png)
<!-- truncate -->

## Применение принципа Парето

Принцип Парето, также известный как правило 80/20, гласит, что примерно 80% результатов (последствий) происходят от 20% причин (усилий). Этот принцип был назван в честь итальянского экономиста и социолога Вильфредо Парето, который в наиболее общем виде формулируется как `20 % усилий дают 80 % результата, а остальные 80 % усилий — лишь 20 % результата`. В бизнес-контексте принцип Парето часто используется для идентификации ключевых факторов, влияющих на результат: например, 80% продаж генерируются 20% продуктов.

Принцип Парето помогает предприятиям сосредоточить свои усилия на наиболее важных аспектах своей деятельности. Это может включать фокусирование на продуктах, которые приносят наибольший доход, или на клиентах, которые вносят наибольший вклад в прибыль. Анализ Парето может помочь оптимизировать ресурсы и улучшить результаты.

## Демонстрация принципа Парето в Qlik Sense

Для демонстрации принципа Парето в Qlik Sense мы используем набор данных о продажах различных продуктов. В таблице приведены данные о продаже продуктов с "A" до "O":
```qvs
// Загружаем данные в Qlik Sense с использованием скрипта Load * Inline []
Load * Inline [
Product, Sum(Sales)
Product A, 94900
Product B, 44500
Product C, 32000
Product D, 23600
Product E, 22700
Product F, 19600
Product G, 19500
Product H, 15800
Product I, 14000
Product J, 10200
Product K, 10100
Product L, 10000
Product M, 8000
Product N, 7600
Product O, 5300
];

// Пример скрипта для Qlik Sense
```
Используя данные продаж по продуктам выше расчитаем в таблице Qlik Sense создадим необходимые меры:
- Накопительные продажи
- Процент накопительных продаж
- Накопительный итог по процентам продаж

![Таблица с данными](/img/blog/2024/06-03/2.png)
1. **Накопительные продажи**: сумма продаж всех предыдущих продуктов, включая текущий, в порядке убывания продаж. Этот столбец показывает кумулятивную сумму продаж по каждому продукту. Для расчета необходимо просуммировать продажи от начала таблицы (первая строка) до текущего значения:
``` qvs
RangeSum(Above(Sum(Sales), 0, RowNo()))
```
2. **Процент накопительных продаж**: доля накопительных продаж в общей сумме продаж. Этот столбец показывает, какую часть от общих продаж составляют продажи каждого продукта. Для расчета необходимо разделить накопительные продажи текущего продукта на общую сумму всех продаж:
``` qvs
RangeSum(Above(Sum(Sales), 0, RowNo())) / Sum(total Sales)
```
3. **Накопительный итог по процентам продаж**: аналогично считает накопительный итог, как и в предыдущем, но только исключает текущую строку с процентом продаж.
``` qvs
RangeSum(Above(Sum(Sales), 1, RowNo())) / Sum(total Sales)
```

## Построения графика в Qlik Sense
Для построения графика Парето используются два типа визуализаций:


1. Гистограмма (Bar Chart)
+ Измерение: _Product_
+ Показатель: _Sum(Sales)_

![Гистограмма](/img/blog/2024/06-03/3.png)
Гистограмма показывает продажи для каждого продукта. Высота столбцов указывает на объем продаж.

2. Линейный график (Line Chart)
+ Измерение: _Product_
+ Показатель: _Sum(Cumulative_Percent_Sales)_

![Линейный график](/img/blog/2024/06-03/4.png)
Линейный график: Показывает накопительный процент продаж. Линия графика начинается с 28.1% для первого продукта (Product A) и достигает 100% для последнего продукта (Product О).

На линейном графике видно, что несколько продуктов (первые 8 из 15) генерируют более 80% продаж, что подтверждает принцип Парето. Линия графика Парето резко поднимается в начале, показывая, что небольшое количество продуктов вносит основной вклад в общие продажи, затем она становится более пологой, что демонстрирует уменьшение вклада оставшихся продуктов.

## Заключение
Принцип Парето является аналитическим инструментом для анализа и возможной оптимизации бизнеса. Визуализация данных в Qlik Sense позволяет легко идентифицировать ключевые продукты, которые генерируют большую часть продаж. Это может помочь бизнесу сосредоточить свои усилия на наиболее значимых аспектах, повышая эффективность и прибыльность.
